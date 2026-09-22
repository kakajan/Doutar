<script setup lang="ts">
import { computed } from 'vue'
import { musicGroups } from '@/data/tracks'

// Calculate total tracks across all albums
const totalTracks = computed(() => 
  musicGroups.reduce((sum, group) => sum + group.tracks.length, 0)
)

// Convert number to Persian digits
const toPersianDigits = (num: number) => 
  num.toString().replace(/\d/g, d => '۰۱۲۳۴۵۶۷۸۹'[parseInt(d)])
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
        height="1200"
        fetchpriority="high"
        decoding="async"
        class="w-full h-full object-cover object-top opacity-20 mix-blend-multiply grayscale contrast-125 rounded-b-full md:rounded-none md:w-[40vw] md:h-[80vh] md:absolute md:top-12 md:left-12"
        style="
          -webkit-mask-image: radial-gradient(circle at 50% 25%, black 0%, transparent 70%);
          mask-image: radial-gradient(circle at 50% 25%, black 0%, transparent 70%);
        "
      />
    </div>

    <div class="space-y-6 relative z-20 max-w-4xl mx-auto w-full px-2">
      <h1
        id="hero-title"
        class="flex flex-col items-center justify-center opacity-100 scale-100"
      >
        <!-- Miras Sahrasy Typographic Lockup (Matching Official Artwork) -->
        <div
          class="hero-title-lockup select-none font-epic"
          dir="ltr"
          aria-label="Magtymguly Pyragy — Miras Sahrasy"
        >
          <span class="hero-kicker uppercase font-bold block">
            MAGTYMGULY PYRAGY
          </span>
          <span class="hero-miras uppercase font-bold block relative z-10">
            MIRAS
          </span>
          <span class="hero-sahrasy uppercase font-bold block relative z-0">
            SAHRASY
          </span>
        </div>

        <span class="block text-neutral-800 text-lg sm:text-2xl md:text-3xl font-body font-bold mt-4 sm:mt-5 tracking-normal">
          میراث صحرا — نوای دوتار و اشعار مختومقلی فراغی
        </span>
        <span class="sr-only">دانلود آهنگ ترکمنی - اشعار مختومقلی فراغی با دوتار و موسیقی الکترونیک</span>
      </h1>

      <p
        id="hero-desc"
        class="max-w-2xl mx-auto text-neutral-700 text-base md:text-lg leading-relaxed font-normal pt-4 px-4 text-justify md:text-center opacity-100"
      >
        <strong>دانلود رایگان آهنگ ترکمنی</strong> با کیفیت ۳۲۰!
        <br class="hidden md:block" />
        مجموعه <strong>«میراث صحرا»</strong> شامل {{ toPersianDigits(totalTracks) }} قطعه فاخر با
        <a
          href="https://fa.wikipedia.org/wiki/%D9%85%D8%AE%D8%AA%D9%88%D9%85%E2%80%8C%D9%82%D9%84%DB%8C_%D9%81%D8%B1%D8%A7%D8%BA%DB%8C"
          target="_blank"
          rel="noopener noreferrer"
          class="font-bold text-neutral-900 underline underline-offset-4 decoration-gold hover:text-dark-gold transition-colors"
        >اشعار حکیمانه مختومقلی فراغی</a>؛
        جایی که نوای اصیل <strong>دوتار و قیجیق</strong> در تنظیمی <strong>مدرن و الکترونیک</strong> طنین‌انداز می‌شود.
      </p>

      <div
        id="hero-btn"
        class="pt-8 flex flex-col sm:flex-row justify-center items-center gap-3 sm:gap-4 w-full max-w-md sm:max-w-none mx-auto opacity-100 translate-y-0"
      >
        <a
          href="#quick-listen"
          class="group relative inline-flex items-center justify-center w-full sm:w-auto px-8 sm:px-10 py-4 text-sm font-bold text-white transition-all duration-300 bg-neutral-900 rounded-full hover:bg-gold hover:text-neutral-950 hover:shadow-xl hover:shadow-gold/20 active:scale-95 cursor-pointer"
        >
          <span class="relative flex items-center gap-3 tracking-wider">
            شروع شنیدن
            <svg
              class="w-4 h-4 transition-transform duration-300 group-hover:translate-y-1"
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

        <!-- Secondary CTA: Download -->
        <a
          href="#download"
          class="inline-flex items-center justify-center w-full sm:w-auto px-8 sm:px-10 py-4 text-sm font-bold text-neutral-800 transition-all duration-300 border border-neutral-300 bg-white/80 backdrop-blur-sm rounded-full hover:border-gold hover:text-black hover:bg-white active:scale-95 cursor-pointer"
        >
          <span class="relative flex items-center gap-3 tracking-wider">
            دانلود آلبوم
            <i class="fas fa-download text-sm text-neutral-600"></i>
          </span>
        </a>
      </div>
    </div>

    <div
      class="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-neutral-500 z-20 opacity-100"
      aria-hidden="true"
    >
      <span class="text-xs font-bold tracking-widest uppercase">Scroll</span>
      <div class="scroll-hint w-6 h-10 rounded-full border-2 border-neutral-400 flex justify-center pt-2">
        <div class="scroll-hint-dot w-1.5 h-2.5 rounded-full bg-gold"></div>
      </div>
    </div>
  </header>
</template>

<style scoped>
.hero-title-lockup {
  --title-size: clamp(2.6rem, 12vw, 8.5rem);
  display: inline-flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  font-family: var(--font-epic, Cinzel, serif);
  user-select: none;
  direction: ltr; /* Keeps Latin font kerning/tracking clean and centered */
  max-width: 100%;
}

.hero-kicker {
  font-size: clamp(0.625rem, 1.8vw, 1.15rem);
  font-weight: 700;
  color: #b8922c;
  letter-spacing: 0.32em;
  text-indent: 0.32em;
  text-transform: uppercase;
  margin-bottom: clamp(0.45rem, 1.8vw, 1.6rem);
}

.hero-miras {
  position: relative;
  z-index: 10;
  font-size: var(--title-size);
  font-weight: 700;
  line-height: 0.88;
  letter-spacing: 0.02em;
  text-indent: 0.02em;
  text-transform: uppercase;
  background: linear-gradient(180deg, #caa337 0%, #b8912f 42%, #9b7c25 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  color: #b8912f;
  filter: drop-shadow(0 2px 6px rgba(160, 130, 40, 0.16)) drop-shadow(0 1px 2px rgba(40, 30, 10, 0.12));
}

.hero-sahrasy {
  position: relative;
  z-index: 0;
  font-size: calc(var(--title-size) * 0.72);
  font-weight: 700;
  line-height: 0.85;
  letter-spacing: 0.055em;
  text-indent: 0.055em;
  text-transform: uppercase;
  color: #b8ad9c;
  margin-top: calc(var(--title-size) * -0.07);
}
</style>
