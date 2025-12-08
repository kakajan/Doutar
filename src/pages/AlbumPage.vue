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
    // Switch to this album's tracks in the store
    audioStore.switchGroup(album.value.id)
    // Play first track
    audioStore.playTrack(album.value.tracks[0].id)
  }
}
</script>

<template>
  <div class="min-h-screen pt-24 pb-32">
    <!-- Album Header -->
    <section class="relative py-16 overflow-hidden">
      <!-- Artistic Background Layers -->
      <!-- 1. Base Color -->
      <div class="absolute inset-0 bg-[#f9f7f2]"></div>

      <!-- 2. The "Aura" - Blown up cover art acting as atmospheric lighting with radial mask -->
      <div 
        class="absolute top-[-50%] left-[-50%] w-[200%] h-[200%] z-0 opacity-25 blur-[100px] animate-pulse"
        style="
          background-image: url('/assets/img/music-cover.webp'); 
          background-size: cover; 
          background-position: center;
          mask-image: radial-gradient(circle at center, black 30%, transparent 70%);
          -webkit-mask-image: radial-gradient(circle at center, black 30%, transparent 70%);
          animation-duration: 8s;
        "
      ></div>

      <!-- 3. Noise Texture for "Tactile" Premium Feel -->
      <div 
        class="absolute inset-0 z-0 opacity-[0.4] pointer-events-none mix-blend-overlay" 
        style="background-image: url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0IiBoZWlnaHQ9IjQiPgo8cmVjdCB3aWR0aD0iNCIgaGVpZ2h0PSI0IiBmaWxsPSIjZmZmIiBmaWxsLW9wYWNpdHk9IjAuMDUiLz4KPHJlY3QgeD0iMCIgeT0iMCIgd2lkdGg9IjIiIGhlaWdodD0iMiIgZmlsbD0iIzAwMCIgZmlsbC1vcGFjaXR5PSIwLjA1Ii8+Cjwvc3ZnPg==');"
      ></div>

      <!-- 4. Soft Edge blending - Full Screen Coverage -->
      <div class="absolute left-0 right-0 top-[-6rem] bottom-[-6rem] z-0 bg-gradient-to-b from-[#f9f7f2] via-transparent to-[#f9f7f2] pointer-events-none"></div>
      
      <div class="container mx-auto px-6 max-w-4xl relative z-10">
        <div class="flex flex-col md:flex-row items-center gap-8 md:gap-12">
          <!-- Album Cover -->
          <div 
            class="w-64 h-64 md:w-72 md:h-72 rounded-2xl shadow-2xl overflow-hidden shrink-0 transition-all duration-700"
            :class="isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'"
          >
            <img
              src="/assets/img/music-cover.webp"
              :alt="album.name"
              class="w-full h-full object-cover"
            />
          </div>
          
          <!-- Album Info -->
          <div 
            class="text-center md:text-right flex-1 transition-all duration-700 delay-150"
            :class="isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'"
          >
            <div class="text-red-600 text-sm font-bold tracking-widest uppercase mb-2">شعر</div>
            <h1 class="text-5xl md:text-6xl font-black font-body mb-4">{{ album.name }}</h1>
            <p class="text-neutral-500 mb-6">
              <span class="font-bold">{{ album.tracks.length }}</span> قطعه موسیقی
              <span class="mx-2">•</span>
              Aytronic
            </p>
            
            <!-- Play All Button -->
            <button
              @click="playAll"
              class="dust-btn cursor-pointer group relative inline-flex items-center justify-center gap-3 px-8 py-4 text-sm font-bold text-white transition-all duration-300 bg-black rounded-full hover:bg-gold hover:text-black hover:shadow-xl hover:shadow-gold/30"
            >
              <div class="play-btn-dust-container">
                <div class="play-btn-dust" style="left: 20%; animation-delay: 0s; --tx: -10px"></div>
                <div class="play-btn-dust" style="left: 50%; animation-delay: 0.5s; --tx: 5px"></div>
                <div class="play-btn-dust" style="left: 80%; animation-delay: 1s; --tx: -5px"></div>
              </div>
              <i class="fas fa-play ml-1"></i>
              <span class="tracking-widest uppercase">پخش همه</span>
            </button>
            
            <!-- Back Link -->
            <router-link 
              to="/"
              class="block mt-6 text-neutral-400 hover:text-gold transition-colors text-sm"
            >
              <i class="fas fa-arrow-right ml-2"></i>
              بازگشت به آلبوم‌ها
            </router-link>
          </div>
        </div>
      </div>
    </section>
    
    <!-- Track List -->
    <section class="py-12">
      <div class="container mx-auto px-6 max-w-4xl">
        <div class="flex items-center justify-between mb-8 border-b border-black/5 pb-4">
          <h2 class="text-2xl font-bold font-body">لیست قطعات</h2>
          <div class="text-gold font-mono text-xs">
            /// {{ album.tracks.length.toString().padStart(2, '0') }} TRACKS
          </div>
        </div>
        
        <div class="space-y-3">
          <TrackCard
            v-for="(track, index) in album.tracks"
            :key="track.id"
            :ref="(el: any) => setTrackRef(track.id, el?.$el)"
            :track="track"
            :album-id="album.id"
            :index="index"
            class="transition-all duration-500"
            :class="isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-5'"
            :style="{ transitionDelay: `${Math.min(index * 50, 500)}ms` }"
          />
        </div>
      </div>
    </section>
    
    <!-- Download Section -->
    <section id="download" class="py-16 bg-gradient-to-t from-black/5 to-transparent">
      <div class="container mx-auto px-6 max-w-4xl text-center">
        <h3 class="text-2xl font-bold font-body mb-6">
          دانلود کامل آلبوم {{ album.name }}
        </h3>
        <p class="text-neutral-500 text-sm mb-8">
          تمامی {{ album.tracks.length }} قطعه با کیفیت ۳۲۰ kbps
        </p>
        <a
          :href="album.id === 'unity' ? '/assets/Unity-Aytronic.zip' : '/assets/CHAP-Aytronic.zip'"
          download
          class="inline-flex items-center gap-3 px-10 py-4 text-sm font-bold text-white bg-black rounded-full hover:bg-gold hover:text-black hover:shadow-xl hover:shadow-gold/30 transition-all duration-300"
        >
          <i class="fas fa-download"></i>
          <span class="tracking-widest uppercase">دانلود ZIP</span>
        </a>
      </div>
    </section>
  </div>
</template>
