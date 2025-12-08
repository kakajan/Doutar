<script setup lang="ts">
import { computed, ref, watch, onMounted, nextTick } from 'vue'
import { useRoute } from 'vue-router'
import { useAudioStore } from '@/stores/audio'
import { musicGroups } from '@/data/tracks'
import TrackCard from '@/components/TrackCard.vue'

const route = useRoute()
const audioStore = useAudioStore()

const album = computed(() => {
  const id = route.params.id as string
  return musicGroups.find(g => g.id === id) || musicGroups[0]
})

const isVisible = ref(false)

// Track refs for scrolling
const trackRefs = ref<Map<string, HTMLElement>>(new Map())

function setTrackRef(trackId: string, el: HTMLElement | null) {
  if (el) {
    trackRefs.value.set(trackId, el)
  }
}

// Watch for track changes and scroll to current track if on same album
watch(() => audioStore.currentTrackId, async (newTrackId) => {
  if (!newTrackId) return
  
  // Check if current track belongs to this album
  if (audioStore.currentTrackGroupId !== album.value.id) return
  
  await nextTick()
  
  const trackEl = trackRefs.value.get(newTrackId)
  if (trackEl) {
    trackEl.scrollIntoView({
      behavior: 'smooth',
      block: 'center'
    })
  }
})

onMounted(() => {
  setTimeout(() => {
    isVisible.value = true
  }, 100)
})

function playAll() {
  if (album.value.tracks.length > 0) {
    audioStore.switchGroup(album.value.id)
    audioStore.playTrack(album.value.tracks[0].id)
  }
}
</script>

<template>
  <div class="min-h-screen relative overflow-hidden bg-[#f9f7f2]">
    
    <!-- 1. Immersive Atmospheric Background (Fixed) -->
    <div class="fixed inset-0 z-0 pointer-events-none">
      <!-- Huge blurred cover art mesh -->
      <div 
        class="absolute -top-[20%] -left-[20%] w-[140%] h-[140%] opacity-30 blur-[120px] transition-transform duration-[10s] ease-in-out alternate"
        style="
          background-image: url('/assets/img/music-cover.webp'); 
          background-size: cover; 
          background-position: center;
          animation: breathe 15s infinite alternate;
        "
      ></div>
      
      <!-- Overlay gradient to ensure text readability -->
      <div class="absolute inset-0 bg-gradient-to-b from-[#f9f7f2]/20 via-[#f9f7f2]/80 to-[#f9f7f2]"></div>
      
      <!-- Noise texture for premium feel -->
      <div class="absolute inset-0 opacity-[0.4] bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0IiBoZWlnaHQ9IjQiPgo8cmVjdCB3aWR0aD0iNCIgaGVpZ2h0PSI0IiBmaWxsPSIjZmZmIiBmaWxsLW9wYWNpdHk9IjAuMDUiLz4KPHJlY3QgeD0iMCIgeT0iMCIgd2lkdGg9IjIiIGhlaWdodD0iMiIgZmlsbD0iIzAwMCIgZmlsbC1vcGFjaXR5PSIwLjA1Ii8+Cjwvc3ZnPg==')] mix-blend-overlay"></div>
    </div>

    <!-- Main Content -->
    <div class="relative z-10 container mx-auto px-6 pt-32 pb-40 max-w-5xl">
      
      <!-- Album Hero Header -->
      <div class="flex flex-col md:flex-row gap-10 md:gap-16 mb-20 items-center md:items-start text-center md:text-right">
        
        <!-- Album Art (Floating Card) -->
        <div 
          class="w-64 h-64 md:w-80 md:h-80 shrink-0 relative group perspective-1000"
          :class="isVisible ? 'opacity-100 scale-100 rotate-0' : 'opacity-0 scale-90 rotate-6'"
          style="transition: all 1s cubic-bezier(0.2, 0.8, 0.2, 1);"
        >
          <div class="absolute inset-0 bg-gold/30 blur-2xl rounded-full scale-90 opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
          <img
            src="/assets/img/music-cover.webp"
            :alt="album.name"
            class="w-full h-full object-cover rounded-[2rem] shadow-2xl relative z-10 transform transition-transform duration-500 group-hover:scale-[1.02] group-hover:-rotate-1"
          />
          <!-- Play All button overlay on cover for desktop -->
          <button 
            @click="playAll"
            class="absolute inset-0 z-20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 bg-black/20 backdrop-blur-[2px] rounded-[2rem] cursor-pointer"
          >
            <div class="w-16 h-16 bg-white/90 rounded-full flex items-center justify-center shadow-lg transform scale-50 group-hover:scale-100 transition-transform duration-300">
               <i class="fas fa-play text-black text-xl ml-1"></i>
            </div>
          </button>
        </div>

        <!-- Album Details -->
        <div 
          class="flex flex-col justify-center pt-4 md:pt-8 flex-1 transition-all duration-1000 delay-200"
          :class="isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'"
        >
          <div class="inline-flex items-center justify-center md:justify-start gap-2 mb-4">
             <span class="px-3 py-1 bg-black/5 rounded-full text-[10px] font-bold tracking-widest uppercase text-neutral-500 backdrop-blur-sm border border-black/5">
                Album
             </span>
             <span class="px-3 py-1 bg-gold/10 rounded-full text-[10px] font-bold tracking-widest uppercase text-dark-gold backdrop-blur-sm border border-gold/10">
                Poetry
             </span>
          </div>

          <h1 class="text-5xl md:text-7xl font-black font-body text-black mb-6 leading-tight tracking-tight">
            {{ album.name }}
          </h1>

          <div class="flex flex-col md:flex-row items-center md:items-start gap-6 text-neutral-500 font-medium text-sm md:text-base mb-10">
            <div class="flex items-center gap-2">
              <div class="w-6 h-6 rounded-full bg-neutral-200 flex items-center justify-center overflow-hidden">
                 <i class="fas fa-music text-[10px] text-neutral-400"></i>
              </div>
              <span class="text-black font-bold">Aytronic</span>
            </div>
            <span class="hidden md:block w-1 h-1 bg-neutral-300 rounded-full mt-2"></span>
            <span>44 Tracks</span>
            <span class="hidden md:block w-1 h-1 bg-neutral-300 rounded-full mt-2"></span>
            <span>Turkmen Folk Fusion</span>
            <span class="hidden md:block w-1 h-1 bg-neutral-300 rounded-full mt-2"></span>
            <span>2025</span>
          </div>

          <div class="flex flex-wrap items-center justify-center md:justify-start gap-4">
            <button
              @click="playAll"
              class="relative px-8 py-4 bg-black text-white rounded-full font-bold text-sm tracking-widest uppercase hover:bg-gold hover:text-black hover:shadow-xl hover:shadow-gold/20 hover:-translate-y-1 transition-all duration-300 group overflow-hidden cursor-pointer"
            >
              <span class="relative z-10 flex items-center gap-3">
                <i class="fas fa-play"></i>
                <span class="mr-1">Play All</span>
              </span>
            </button>
            
            <a 
               href="#download"
               class="px-8 py-4 bg-white border border-black/5 text-black rounded-full font-bold text-sm tracking-widest uppercase hover:bg-neutral-50 hover:border-black/20 transition-all duration-300 flex items-center gap-3 cursor-pointer"
            >
               <i class="fas fa-download text-neutral-400"></i>
               <span>Download</span>
            </a>
          </div>
        </div>
      </div>

      <!-- Divider -->
      <div 
        class="w-full h-px bg-gradient-to-r from-transparent via-black/10 to-transparent mb-12 transition-all duration-1000 delay-300"
        :class="isVisible ? 'opacity-100 scale-x-100' : 'opacity-0 scale-x-0'"
      ></div>

      <!-- Tracks Heading -->
      <div 
         class="flex items-center justify-between mb-8 transition-all duration-500 delay-300"
         :class="isVisible ? 'opacity-100' : 'opacity-0'"
      >
         <h2 class="text-2xl font-bold font-body">Tracks</h2>
         <span class="text-xs font-mono text-neutral-400">{{ album.tracks.length }} songs</span>
      </div>

      <!-- Track List -->
      <div class="grid grid-cols-1 gap-4">
        <TrackCard
          v-for="(track, index) in album.tracks"
          :key="track.id"
          :ref="(el: any) => setTrackRef(track.id, el?.$el)"
          :track="track"
          :album-id="album.id"
          :index="index"
          class="transition-all duration-500"
          :class="isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'"
          :style="{ transitionDelay: `${400 + Math.min(index * 30, 600)}ms` }"
        />
      </div>

      <!-- Download Section (Bottom) -->
      <div id="download" class="mt-32 p-8 md:p-12 bg-white/50 backdrop-blur-xl border border-white/40 rounded-3xl shadow-xl text-center relative overflow-hidden group">
         <div class="absolute inset-0 bg-gradient-to-br from-gold/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
         <div class="relative z-10">
            <div class="w-16 h-16 mx-auto bg-black text-white rounded-2xl flex items-center justify-center mb-6 shadow-lg rotate-3 group-hover:rotate-0 transition-transform duration-500">
               <i class="fas fa-compact-disc text-3xl"></i>
            </div>
            <h3 class="text-2xl md:text-3xl font-bold font-body mb-3">دانلود کامل</h3>
            <p class="text-neutral-500 mb-8 max-w-lg mx-auto">دانلود تمامی قطعات شعر {{ album.name }} با بالاترین کیفیت برای شنیدن به صورت آفلاین.</p>
            
            <a
              :href="album.id === 'unity' ? '/assets/Unity-Aytronic.zip' : '/assets/CHAP-Aytronic.zip'"
              download
              class="inline-flex items-center gap-3 px-10 py-4 text-sm font-bold text-white bg-black rounded-full hover:scale-105 hover:shadow-2xl hover:shadow-black/20 transition-all duration-300 cursor-pointer"
            >
              <i class="fas fa-cloud-download-alt"></i>
              <span class="tracking-widest uppercase">دانلود فایل زیپ</span>
            </a>
            
            <p class="mt-4 text-[10px] text-neutral-400 font-mono" dir="ltr">ZIP FORMAT • 320 KBPS • FREE</p>
         </div>
      </div>

    </div>
  </div>
  
</template>

<style>
@keyframes breathe {
  0% { transform: scale(1); opacity: 0.3; }
  50% { transform: scale(1.1); opacity: 0.4; }
  100% { transform: scale(1); opacity: 0.3; }
}
</style>
