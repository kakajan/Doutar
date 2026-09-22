<script setup lang="ts">
</script>

<template>
  <section class="relative py-28 md:py-36 overflow-hidden bg-neutral-950 text-white border-t border-neutral-900">
    <div class="container mx-auto px-6 max-w-6xl relative z-10">
      <div class="flex flex-col md:flex-row items-center justify-between gap-12 md:gap-16">
        <!-- Text Content -->
        <div class="flex-1 text-center md:text-right space-y-6">
          <div class="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10">
            <i class="fas fa-users text-xs text-gold"></i>
            <span class="text-xs font-body font-semibold tracking-wider text-neutral-300">
              جامعه شنوندگان میراث صحرا
            </span>
          </div>

          <h2 class="text-3xl sm:text-5xl md:text-6xl font-black font-body leading-tight text-white">
            <span>همسفر شوید</span>
            <span class="block text-gold mt-2">در دنیای نواهای اصیل</span>
          </h2>

          <p class="text-base md:text-lg text-neutral-300 font-normal leading-relaxed max-w-xl mx-auto md:mx-0">
            به جمع ما بپیوندید تا به قطعات جدید، روایت اشعار مختومقلی فراغی و آثار در حال تولید دسترسی داشته باشید.
          </p>
        </div>

        <!-- Actions -->
        <div class="shrink-0 w-full md:w-auto flex flex-col gap-4 max-w-sm mx-auto md:mx-0">
          <!-- Instagram Button -->
          <a
            href="https://www.instagram.com/usher_vocal"
            target="_blank"
            rel="noopener noreferrer"
            dir="ltr"
            class="group flex items-center justify-between gap-6 px-6 py-4 bg-neutral-900/90 border border-neutral-800 rounded-2xl transition-all duration-300 hover:border-gold/50 hover:bg-neutral-900 active:scale-[0.98]"
          >
            <div class="flex items-center gap-4">
              <div class="w-11 h-11 bg-white/5 rounded-xl flex items-center justify-center border border-white/10 group-hover:border-gold/30 transition-colors">
                <i class="fab fa-instagram text-xl text-gold"></i>
              </div>
              <div class="text-left">
                <span class="block text-xs font-medium text-neutral-300">صفحه رسمی</span>
                <span class="text-base font-bold text-white font-epic tracking-wide">Instagram</span>
              </div>
            </div>

            <div class="w-9 h-9 flex items-center justify-center rounded-full bg-white/5 border border-white/10 group-hover:bg-gold group-hover:text-neutral-950 transition-all duration-300 text-neutral-300">
              <svg class="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H6" />
              </svg>
            </div>
          </a>

          <!-- Telegram Button -->
          <a
            href="https://t.me/usherArt"
            target="_blank"
            rel="noopener noreferrer"
            dir="ltr"
            class="group flex items-center justify-between gap-6 px-6 py-4 bg-neutral-900/90 border border-neutral-800 rounded-2xl transition-all duration-300 hover:border-gold/50 hover:bg-neutral-900 active:scale-[0.98]"
          >
            <div class="flex items-center gap-4">
              <div class="w-11 h-11 bg-white/5 rounded-xl flex items-center justify-center border border-white/10 group-hover:border-gold/30 transition-colors">
                <i class="fab fa-telegram text-xl text-gold"></i>
              </div>
              <div class="text-left">
                <span class="block text-xs font-medium text-neutral-300">کانال شنوندگان</span>
                <span class="text-base font-bold text-white font-epic tracking-wide">Telegram</span>
              </div>
            </div>

            <div class="w-9 h-9 flex items-center justify-center rounded-full bg-white/5 border border-white/10 group-hover:bg-gold group-hover:text-neutral-950 transition-all duration-300 text-neutral-300">
              <svg class="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H6" />
              </svg>
            </div>
          </a>
        </div>
      </div>
    </div>
  </section>
</template>
