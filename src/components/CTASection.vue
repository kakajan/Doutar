<script setup lang="ts">
</script>

<template>
  <section class="relative py-32 overflow-hidden bg-neutral-950 text-white isolate">
    <!-- Background Ambient Glow -->
    <div class="absolute inset-0 pointer-events-none hidden md:block">
      <div class="absolute top-0 left-1/4 w-[400px] h-[400px] bg-gold/5 rounded-full blur-3xl"></div>
      <div class="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-purple-900/10 rounded-full blur-3xl"></div>
    </div>

    <!-- Grid Pattern Overlay -->
    <div
      class="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMSIgY3k9IjEiIHI9IjEiIGZpbGw9InJnYmEoMjU1LDI1NSwyNTUsMC4wNSkiLz48L3N2Zz4=')] opacity-20"
    ></div>

    <div class="container mx-auto px-6 relative z-10">
      <div class="flex flex-col md:flex-row items-center justify-between gap-12 md:gap-24">
        <!-- Text Content -->
        <div class="flex-1 text-center md:text-right space-y-8">
          <div class="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-white/10 border border-white/10 shadow-lg shadow-black/20">
            <span class="relative flex h-2 w-2">
              <span class="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
            </span>
            <span class="text-xs font-body font-bold tracking-widest uppercase text-neutral-300">
              جامعه شنوندگان
            </span>
          </div>

          <h2 class="text-5xl md:text-7xl font-black font-epic leading-tight drop-shadow-2xl">
            <span class="block font-body text-white">همسفر شوید</span>
            <span class="block font-body text-transparent bg-clip-text bg-linear-to-l from-gold via-yellow-200 to-gold mt-2">
              در دنیای نواها
            </span>
          </h2>

          <p class="text-lg md:text-xl text-neutral-400 font-light leading-relaxed max-w-2xl mx-auto md:mx-0">
            به جمع ما بپیوندید تا زودتر از همه به آثار جدید، پشت‌صحنه‌ها و محتوای اختصاصی دسترسی یابید.
          </p>
        </div>

        <!-- Actions -->
        <div class="shrink-0 w-full md:w-auto flex flex-col gap-5">
          <!-- Instagram Button -->
          <a
            href="https://www.instagram.com/usher_vocal"
            target="_blank"
            rel="noopener noreferrer"
            dir="ltr"
            class="group relative flex items-center justify-between gap-6 px-8 py-5 bg-linear-to-r from-purple-600 via-pink-600 to-orange-500 rounded-2xl overflow-hidden transition-all duration-500 hover:scale-[1.02] hover:shadow-2xl hover:shadow-pink-500/20"
          >
            <!-- Hover Shine Effect -->
            <div class="absolute inset-0 bg-linear-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out"></div>

            <div class="flex items-center gap-5 relative z-10">
              <div class="w-12 h-12 bg-black/30 rounded-xl flex items-center justify-center group-hover:bg-black/40 transition-colors border border-white/10">
                <i class="fab fa-instagram text-2xl text-white"></i>
              </div>
              <div class="text-left">
                <div class="text-[10px] font-bold text-white/80 uppercase tracking-wider mb-0.5">Follow on</div>
                <div class="text-xl font-black text-white font-epic tracking-wide">Instagram</div>
              </div>
            </div>

            <div class="relative z-10 w-10 h-10 flex items-center justify-center rounded-full bg-white/10 border border-white/20 group-hover:bg-white group-hover:text-pink-600 transition-all duration-300">
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
            class="group relative flex items-center justify-between gap-6 px-8 py-5 bg-neutral-900 border border-neutral-800 rounded-2xl overflow-hidden transition-all duration-500 hover:border-blue-500/50 hover:shadow-lg hover:shadow-blue-500/10"
          >
            <div class="flex items-center gap-5 relative z-10">
              <div class="w-12 h-12 bg-blue-500/20 rounded-xl flex items-center justify-center group-hover:bg-blue-500 group-hover:text-white transition-all duration-300 border border-blue-500/20">
                <i class="fab fa-telegram text-2xl text-blue-500 group-hover:text-white transition-colors"></i>
              </div>
              <div class="text-left">
                <div class="text-[10px] font-bold text-neutral-500 uppercase tracking-wider mb-0.5 group-hover:text-blue-400 transition-colors">Join Channel</div>
                <div class="text-xl font-black text-white font-epic tracking-wide">Telegram</div>
              </div>
            </div>

            <div class="relative z-10 w-10 h-10 flex items-center justify-center rounded-full border border-neutral-800 group-hover:border-blue-500/50 group-hover:text-blue-400 transition-all duration-300">
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
