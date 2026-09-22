<script setup lang="ts">
import { musicGroups } from '@/data/tracks'
import HeroSection from '@/components/HeroSection.vue'
import MusicSection from '@/components/MusicSection.vue'
import LyricsSection from '@/components/LyricsSection.vue'
import CTASection from '@/components/CTASection.vue'
import AppFooter from '@/components/AppFooter.vue'
import FaqSection from '@/components/FaqSection.vue'
</script>

<template>
  <div>
    <HeroSection />
    
    <!-- Albums Section -->
    <section id="albums" class="py-32 relative z-10">
      <div class="container mx-auto px-6 max-w-6xl">
        <!-- Header -->
        <div class="text-center mb-20">
          <h2 class="text-2xl md:text-4xl text-neutral-900 font-body font-bold mb-4">
            آلبوم‌های میراث صحرا
          </h2>
          <p class="text-neutral-600 text-sm font-normal">
            <strong>اشعار مختومقلی فراغی</strong> با دوتار و تنظیم الکترونیک | کیفیت ۳۲۰
          </p>
        </div>

        <!-- Album Cards Grid -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          <router-link
            v-for="(album) in musicGroups"
            :key="album.id"
            :to="`/album/${album.id}`"
            class="group relative overflow-hidden rounded-3xl bg-white shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 border border-neutral-200/60 opacity-100 translate-y-0"
          >
            <!-- Album Cover -->
            <div class="aspect-square relative overflow-hidden">
              <img
                :src="album.cover || '/assets/img/music-cover.webp'"
                :alt="'کاور آلبوم ' + album.name + ' — آهنگ ترکمنی میراث صحرا'"
                width="600"
                height="600"
                loading="lazy"
                decoding="async"
                class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <!-- Overlay -->
              <div class="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent"></div>
              
              <!-- Play Button -->
              <div class="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div class="w-20 h-20 rounded-full bg-gold/90 backdrop-blur-sm flex items-center justify-center shadow-2xl transform scale-75 group-hover:scale-100 transition-transform duration-300">
                  <i class="fas fa-play text-2xl text-black ml-1"></i>
                </div>
              </div>
              
              <!-- Album Info -->
              <div class="absolute bottom-0 left-0 right-0 p-6 text-white">
                <div class="flex items-center gap-2 mb-2">
                  <span class="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-300 text-xs font-semibold backdrop-blur-md border border-amber-500/30">
                    <i class="fas fa-star text-[10px]" aria-hidden="true"></i>
                    <span>{{ album.id === 'unity' ? '۴.۹' : album.id === 'joda' ? '۵.۰' : '۴.۸' }}</span>
                  </span>
                  <span v-if="album.id === 'joda'" class="inline-flex items-center px-2 py-0.5 rounded-full bg-rose-500/30 text-rose-200 text-xs font-semibold backdrop-blur-md border border-rose-500/40">
                    اثر ویژه
                  </span>
                  <span class="text-xs text-white/80 font-mono">320 KBPS</span>
                </div>
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
                  <span class="text-xs text-gold/90 font-medium">دانلود رایگان</span>
                </div>
              </div>
            </div>
          </router-link>
        </div>
      </div>
    </section>

    <!-- Inline Player (Quick Listen) -->
    <MusicSection />
    
    <LyricsSection />
    <CTASection />
    <FaqSection />
    <AppFooter />
  </div>
</template>
