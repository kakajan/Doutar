<script setup lang="ts">
import { computed, ref, watch, nextTick } from 'vue'
import { useRoute } from 'vue-router'
import { useAudioStore } from '@/stores/audio'
import { musicGroups } from '@/data/tracks'
import { ALBUM_RATINGS } from '@/data/seo'
import TrackCard from '@/components/TrackCard.vue'

const route = useRoute()
const audioStore = useAudioStore()

const album = computed(() => {
  const id = route.params.id as string
  return musicGroups.find(g => g.id === id) || musicGroups[0]
})

const rating = computed(() => {
  return (ALBUM_RATINGS as Record<string, any>)[album.value.id] || ALBUM_RATINGS.unity
})

const isVisible = ref(true)

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

function playAll() {
  if (album.value.tracks.length > 0) {
    audioStore.switchGroup(album.value.id)
    audioStore.playTrack(album.value.tracks[0].id)
  }
}
</script>

<template>
  <div class="min-h-screen relative overflow-x-hidden bg-sand-light">
    
    <!-- 1. Immersive Atmospheric Background (Fixed) -->
    <div class="fixed inset-0 z-0 pointer-events-none">
      <!-- Huge blurred cover art mesh -->
      <div 
        class="absolute -top-[20%] -left-[20%] w-[140%] h-[140%] opacity-30 blur-[120px] transition-transform duration-[10s] ease-in-out alternate"
        :style="{
          backgroundImage: `url(${album.cover || '/assets/img/music-cover.webp'})`, 
          backgroundSize: 'cover', 
          backgroundPosition: 'center',
          animation: 'breathe 15s infinite alternate'
        }"
      ></div>
      
      <!-- Overlay gradient to ensure text readability -->
      <div class="absolute inset-0 bg-gradient-to-b from-[#f9f7f2]/20 via-[#f9f7f2]/80 to-[#f9f7f2]"></div>
      
      <!-- Subtle grain texture -->
      <div class="absolute inset-0 opacity-[0.2] bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0IiBoZWlnaHQ9IjQiPgo8cmVjdCB3aWR0aD0iNCIgaGVpZ2h0PSI0IiBmaWxsPSIjZmZmIiBmaWxsLW9wYWNpdHk9IjAuMDUiLz4KPHJlY3QgeD0iMCIgeT0iMCIgd2lkdGg9IjIiIGhlaWdodD0iMiIgZmlsbD0iIzAwMCIgZmlsbC1vcGFjaXR5PSIwLjA1Ii8+Cjwvc3ZnPg==')] mix-blend-overlay"></div>
    </div>

    <!-- Main Content -->
    <div class="relative z-10 container mx-auto px-6 pt-32 pb-40 max-w-5xl">

      <!-- Breadcrumb / Back -->
      <router-link
        to="/"
        class="inline-flex items-center gap-2 mb-8 text-sm font-bold text-neutral-600 hover:text-dark-gold transition-colors group cursor-pointer"
      >
        <i class="fas fa-arrow-right group-hover:-translate-x-1 transition-transform duration-300"></i>
        <span>بازگشت به خانه</span>
      </router-link>
      
      <!-- Album Hero Header -->
      <div class="flex flex-col md:flex-row gap-10 md:gap-16 mb-20 items-center md:items-start text-center md:text-right">
        
        <!-- Album Art (Floating Card) -->
        <div 
          class="w-64 h-64 md:w-80 md:h-80 shrink-0 relative group perspective-1000"
          :class="isVisible ? 'opacity-100 scale-100 rotate-0' : 'opacity-0 scale-90 rotate-6'"
          style="transition: all 1s cubic-bezier(0.2, 0.8, 0.2, 1);"
        >
          <div class="absolute inset-0 bg-gold/20 blur-2xl rounded-full scale-90 opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
          <img
            :src="album.cover || '/assets/img/music-cover.webp'"
            :alt="'کاور آلبوم ' + album.name + ' از مجموعه میراث صحرا'"
            width="320"
            height="320"
            fetchpriority="high"
            decoding="async"
            class="w-full h-full object-cover rounded-[2rem] shadow-2xl relative z-10"
          />
          <!-- Play All button overlay on cover for desktop -->
          <button 
            @click="playAll"
            class="absolute inset-0 z-20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 bg-black/25 backdrop-blur-[2px] rounded-[2rem] cursor-pointer"
            aria-label="پخش همه آهنگ‌ها"
          >
            <div class="w-16 h-16 bg-white/95 rounded-full flex items-center justify-center shadow-lg transform scale-90 group-hover:scale-100 transition-transform duration-300">
               <i class="fas fa-play text-black text-xl ml-1"></i>
            </div>
          </button>
        </div>

        <!-- Album Details -->
        <div 
          class="flex flex-col justify-center pt-4 md:pt-8 flex-1 transition-all duration-1000 delay-200"
          :class="isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'"
        >
          <div class="inline-flex flex-wrap items-center justify-center md:justify-start gap-2 mb-4">
             <span class="px-3 py-1 bg-black/5 rounded-full text-xs font-bold tracking-wider uppercase text-neutral-600 backdrop-blur-sm border border-black/5">
                آلبوم رسمی
             </span>
             <span class="px-3 py-1 bg-gold/10 rounded-full text-xs font-bold tracking-wider uppercase text-dark-gold backdrop-blur-sm border border-gold/10">
                اشعار مختومقلی فراغی
             </span>
             <!-- Rating Badge (Google AggregateRating compliant) -->
             <div class="inline-flex items-center gap-1.5 px-3 py-1 bg-amber-500/10 text-amber-900 rounded-full text-xs font-semibold border border-amber-500/20 backdrop-blur-sm">
                <div class="flex items-center text-amber-500 text-[11px]" aria-hidden="true">
                   <i class="fas fa-star"></i>
                   <i class="fas fa-star"></i>
                   <i class="fas fa-star"></i>
                   <i class="fas fa-star"></i>
                   <i class="fas fa-star-half-alt"></i>
                </div>
                <span class="font-bold font-mono">{{ rating.ratingValue }}</span>
                <span class="text-neutral-400">/</span>
                <span class="text-neutral-600">۵</span>
                <span class="text-neutral-500 font-normal mr-1">({{ rating.ratingCount }} نظر شنوندگان)</span>
             </div>
             <span class="px-2.5 py-1 bg-neutral-900/5 text-neutral-700 rounded-full text-xs font-mono font-medium border border-neutral-300/40">
                320 KBPS MP3
             </span>
          </div>

          <h1 class="text-4xl sm:text-5xl md:text-7xl font-black font-body text-neutral-950 mb-6 leading-tight tracking-tight">
            {{ album.name }}
          </h1>

          <div class="flex flex-wrap items-center justify-center md:justify-start gap-3 md:gap-5 text-neutral-600 font-medium text-sm md:text-base mb-8">
            <div class="flex items-center gap-2">
              <div class="w-6 h-6 rounded-full bg-neutral-200 flex items-center justify-center overflow-hidden">
                 <i class="fas fa-microphone-lines text-xs text-neutral-700"></i>
              </div>
              <span class="text-neutral-900 font-bold">Aytronic</span>
            </div>
            <span class="w-1 h-1 bg-neutral-300 rounded-full"></span>
            <span>{{ album.tracks.length }} قطعه</span>
            <span class="w-1 h-1 bg-neutral-300 rounded-full"></span>
            <span>دوتار و قیجیق • تنظیم الکترونیک</span>
            <span class="w-1 h-1 bg-neutral-300 rounded-full"></span>
            <span class="text-emerald-700 font-bold">دانلود رایگان کیفیت ۳۲۰</span>
          </div>

          <div class="flex flex-wrap items-center justify-center md:justify-start gap-4">
            <button
              @click="playAll"
              class="relative px-8 py-4 bg-black text-white rounded-full font-bold text-sm tracking-wider uppercase hover:bg-gold hover:text-black hover:shadow-xl hover:shadow-gold/20 hover:-translate-y-0.5 active:scale-95 transition-all duration-300 group overflow-hidden cursor-pointer"
            >
              <span class="relative z-10 flex items-center gap-3">
                <i class="fas fa-play"></i>
                <span class="mr-1">پخش همه قطعات</span>
              </span>
            </button>
            
            <a 
               href="#download"
               class="px-8 py-4 bg-white/90 border border-neutral-300 text-neutral-800 rounded-full font-bold text-sm tracking-wider uppercase hover:bg-white hover:border-gold hover:text-black hover:-translate-y-0.5 active:scale-95 transition-all duration-300 flex items-center gap-3 cursor-pointer"
            >
               <i class="fas fa-download text-neutral-600"></i>
               <span>دانلود آلبوم</span>
            </a>
          </div>
        </div>
      </div>

      <!-- Album Story / Cultural Context -->
      <div 
        v-if="album.story"
        class="mb-12 p-6 md:p-8 bg-white/70 backdrop-blur-md rounded-3xl border border-gold/20 shadow-sm relative overflow-hidden transition-all duration-700 delay-300"
        :class="isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'"
      >
        <div class="flex flex-col sm:flex-row items-start gap-4">
          <div class="w-12 h-12 rounded-2xl bg-gold/15 text-dark-gold flex items-center justify-center shrink-0">
            <i class="fas fa-feather-pointed text-xl"></i>
          </div>
          <div class="space-y-2">
            <h3 class="text-xl font-bold font-body text-neutral-900">روایت دلتنگی و پیشینه اثر</h3>
            <p class="text-neutral-700 leading-relaxed text-sm md:text-base font-normal text-justify">
              {{ album.story }}
            </p>
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
         <h2 class="text-2xl font-bold font-body">قطعه‌ها</h2>
         <span class="text-xs font-mono text-neutral-400">{{ album.tracks.length }} آهنگ</span>
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
            <h3 class="text-2xl md:text-3xl font-bold font-body text-neutral-900 mb-3">دانلود کامل {{ album.name }}</h3>
            <p class="text-neutral-600 mb-8 max-w-lg mx-auto text-sm font-normal">دانلود تمامی قطعات با بالاترین کیفیت برای شنیدن به صورت آفلاین.</p>
            
            <a
              :href="album.id === 'unity' ? '/assets/Unity-Aytronic.zip' : album.id === 'chap' ? '/assets/CHAP-Aytronic.zip' : '/assets/Ayrildim-Aytronic.zip'"
              download
              class="inline-flex items-center gap-3 px-10 py-4 text-sm font-bold text-white bg-black rounded-full hover:bg-gold hover:text-black hover:shadow-xl hover:shadow-gold/20 hover:-translate-y-0.5 active:scale-95 transition-all duration-300 cursor-pointer"
            >
              <i class="fas fa-cloud-download-alt"></i>
              <span class="tracking-wider uppercase">دانلود فایل زیپ</span>
            </a>
            
            <p class="mt-4 text-xs text-neutral-500 font-mono" dir="ltr">MP3 • 320 KBPS • FREE</p>
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
