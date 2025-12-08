<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { musicGroups } from '@/data/tracks'
import HeroSection from '@/components/HeroSection.vue'
import LyricsSection from '@/components/LyricsSection.vue'
import CTASection from '@/components/CTASection.vue'
import AppFooter from '@/components/AppFooter.vue'

const isVisible = ref(false)

onMounted(() => {
  setTimeout(() => {
    isVisible.value = true
  }, 200)
})
</script>

<template>
  <div>
    <HeroSection />
    
    <!-- Albums Section -->
    <section id="music-hall" class="py-32 relative z-10">
      <div class="container mx-auto px-6 max-w-6xl">
        <!-- Header -->
        <div class="text-center mb-20">
          <h2 class="text-4xl text-black font-body font-bold mb-4">
            دانلود آهنگ ترکمنی جدید ۱۴۰۴
          </h2>
          <p class="text-neutral-500 text-sm font-light">
            <strong>اشعار مختومقلی فراغی</strong> با دوتار و موسیقی الکترونیک | کیفیت ۳۲۰
          </p>
        </div>

        <!-- Album Cards Grid -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-3xl mx-auto">
          <router-link
            v-for="(album, index) in musicGroups"
            :key="album.id"
            :to="`/album/${album.id}`"
            class="group relative overflow-hidden rounded-3xl bg-white shadow-xl hover:shadow-2xl transition-all duration-500 hover:scale-[1.02]"
            :class="isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'"
            :style="{ transitionDelay: `${index * 150}ms` }"
          >
            <!-- Album Cover -->
            <div class="aspect-square relative overflow-hidden">
              <img
                src="/assets/img/music-cover.webp"
                :alt="album.name"
                class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <!-- Overlay -->
              <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
              
              <!-- Play Button -->
              <div class="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div class="w-20 h-20 rounded-full bg-gold/90 backdrop-blur-sm flex items-center justify-center shadow-2xl transform scale-75 group-hover:scale-100 transition-transform duration-300">
                  <i class="fas fa-play text-2xl text-black ml-1"></i>
                </div>
              </div>
              
              <!-- Album Info -->
              <div class="absolute bottom-0 left-0 right-0 p-6 text-white">
                <h3 class="text-3xl font-bold font-body mb-2">{{ album.name }}</h3>
                <div class="flex items-center gap-4 text-sm text-white/70">
                  <span class="flex items-center gap-2">
                    <i class="fas fa-music"></i>
                    {{ album.tracks.length }} قطعه
                  </span>
                  <span class="flex items-center gap-2">
                    <i class="fas fa-microphone-lines"></i>
                    Aytronic
                  </span>
                </div>
              </div>
            </div>
          </router-link>
        </div>
      </div>
    </section>
    
    <LyricsSection />
    <CTASection />
    <AppFooter />
  </div>
</template>
