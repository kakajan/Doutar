<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { musicGroups } from '@/data/tracks'

const isVisible = ref(false)

// Calculate total tracks across all albums
const totalTracks = computed(() => 
  musicGroups.reduce((sum, group) => sum + group.tracks.length, 0)
)

// Convert number to Persian digits
const toPersianDigits = (num: number) => 
  num.toString().replace(/\d/g, d => '۰۱۲۳۴۵۶۷۸۹'[parseInt(d)])

onMounted(() => {
  setTimeout(() => {
    isVisible.value = true
  }, 200)
})
</script>

<template>
  <header
    id="hero-section"
    class="relative h-screen flex flex-col justify-center items-center text-center px-4 overflow-hidden z-10"
  >
    <!-- Artistic Background Image -->
    <div class="absolute inset-0 z-0 pointer-events-none select-none">
      <img
        src="/assets/img/magtymguly.webp"
        alt="مختومقلی فراغی - شاعر بزرگ ترکمن و الهام‌بخش آهنگ‌های ترکمنی آلبوم میراث صحرا"
        width="1200"
        height="1600"
        loading="lazy"
        decoding="async"
        class="w-full h-full object-cover object-top opacity-20 mix-blend-multiply grayscale contrast-125 animate-slow-zoom rounded-b-full md:rounded-none md:w-[40vw] md:h-[80vh] md:absolute md:top-12 md:left-12"
        style="
          -webkit-mask-image: radial-gradient(circle at 50% 25%, black 0%, transparent 70%);
          mask-image: radial-gradient(circle at 50% 25%, black 0%, transparent 70%);
        "
      />
    </div>

    <div class="space-y-6 relative z-20">
      <h2
        id="hero-subtitle"
        class="text-dark-gold tracking-[0.5em] text-xs md:text-sm font-epic uppercase font-bold transition-all duration-1000"
        :class="isVisible ? 'opacity-100' : 'opacity-0'"
      >
        Magtymguly Pyragy
      </h2>
      
      <h1
        id="hero-title"
        class="text-7xl md:text-9xl font-black leading-tight font-epic text-neutral-900 drop-shadow-sm transition-all duration-1000 delay-300"
        :class="isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'"
      >
        <span class="block text-gradient-gold">MIRAS</span>
        <span class="block text-black/5 text-6xl md:text-8xl mt-[-0.3em]">SAHRASY</span>
        <span class="sr-only">دانلود آهنگ ترکمنی - اشعار مختومقلی فراغی با دوتار و موسیقی الکترونیک</span>
      </h1>

      <p
        id="hero-desc"
        class="max-w-2xl mx-auto text-neutral-600 text-base md:text-lg leading-loose font-light pt-6 px-4 text-justify md:text-center transition-all duration-1000 delay-500"
        :class="isVisible ? 'opacity-100' : 'opacity-0'"
      >
        <strong>دانلود رایگان آهنگ ترکمنی</strong> با بهترین کیفیت صوتی!
        <br class="hidden md:block" />
        آلبوم <strong>«میراث صحرا»</strong> شامل {{ toPersianDigits(totalTracks) }} قطعه موسیقی ترکمن با
        <a
          href="https://fa.wikipedia.org/wiki/%D9%85%D8%AE%D8%AA%D9%88%D9%85%E2%80%8C%D9%82%D9%84%DB%8C_%D9%81%D8%B1%D8%A7%D8%BA%DB%8C"
          target="_blank"
          rel="noopener noreferrer"
          class="font-bold text-black"
        ><strong>اشعار مختومقلی فراغی</strong>،
        شاعر بزرگ ترکمن</a>؛ جایی که نوای سوزناک <strong>دوتار و قیجیق</strong> توسط هوش مصنوعی با تنظیم‌های
        <strong>الکترونیک و سینماتیک</strong> در می‌آمیزد.
      </p>

      <div
        id="hero-btn"
        class="pt-10 transition-all duration-1000 delay-700"
        :class="isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'"
      >
        <a
          href="#music-hall"
          class="dust-btn group relative inline-flex items-center justify-center px-10 py-4 text-sm font-bold text-white transition-all duration-300 bg-black rounded-full hover:bg-gold hover:shadow-xl hover:shadow-gold/30"
        >
          <!-- Dust Particles -->
          <div class="play-btn-dust-container">
            <div class="play-btn-dust" style="left: 20%; animation-delay: 0s; --tx: -10px"></div>
            <div class="play-btn-dust" style="left: 50%; animation-delay: 0.5s; --tx: 5px"></div>
            <div class="play-btn-dust" style="left: 80%; animation-delay: 1s; --tx: -5px"></div>
            <div class="play-btn-dust" style="left: 35%; animation-delay: 0.2s; --tx: 10px"></div>
            <div class="play-btn-dust" style="left: 65%; animation-delay: 0.7s; --tx: -8px"></div>
          </div>
          <span class="relative flex items-center gap-3 tracking-widest uppercase">
            شروع شنیدن
            <svg
              class="w-4 h-4 transition-transform group-hover:translate-y-1"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M19 14l-7 7m0 0l-7-7m7 7V3"
              />
            </svg>
          </span>
        </a>
      </div>
    </div>
  </header>
</template>
