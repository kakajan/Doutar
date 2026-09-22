<script setup lang="ts">
import { computed } from 'vue'
import { useAudioStore } from '@/stores/audio'

const audioStore = useAudioStore()

const isVisible = computed(() => audioStore.currentTrackId !== null)

const displayTitle = computed(() => {
  if (!audioStore.currentTrack || !audioStore.currentTrackGroup) return 'قطعه‌ای انتخاب نشده'
  const index = audioStore.currentTrackIndex
  return audioStore.currentTrackGroup.name + ' #' + (index + 1).toString().padStart(2, '0')
})

function handleSeekInput(event: Event) {
  const target = event.target as HTMLInputElement
  audioStore.seek(parseFloat(target.value))
}

function handleVolumeInput(event: Event) {
  const target = event.target as HTMLInputElement
  audioStore.setVolume(parseFloat(target.value))
}
</script>

<template>
  <div
    id="sticky-player"
    class="fixed bottom-0 left-0 w-full z-50 transition-transform duration-500 ease-out"
    :class="isVisible ? 'translate-y-0' : 'translate-y-full'"
    dir="ltr"
  >
    <!-- Full Width Progress Bar on Top -->
    <div class="relative w-full h-1 bg-neutral-200/50 cursor-pointer group">
      <div
        class="absolute left-0 top-0 h-full bg-gold transition-all duration-100"
        :style="{ width: audioStore.progress + '%' }"
      ></div>
      <div
        class="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-3.5 h-3.5 bg-black rounded-full shadow-md opacity-0 group-hover:opacity-100 transition-opacity ring-2 ring-gold"
        :style="{ left: audioStore.progress + '%' }"
      ></div>
      <input
        type="range"
        min="0"
        max="100"
        step="0.1"
        :value="audioStore.progress"
        class="absolute -top-3 inset-x-0 w-full h-7 opacity-0 cursor-pointer z-10"
        aria-label="نوار پیشرفت پخش"
        @input="handleSeekInput"
      />
    </div>

    <div class="bg-white/85 backdrop-blur-xl border-t border-white/20 shadow-[0_-4px_30px_rgba(0,0,0,0.1)] px-3 sm:px-4 py-2.5 sm:py-3">
      <div class="container mx-auto max-w-5xl flex items-center justify-between gap-2.5 sm:gap-4">
        <!-- Track Info (Click to Expand) -->
        <div class="flex items-center gap-2.5 sm:gap-3 min-w-0 flex-1">
          <div
            class="w-10 h-10 sm:w-12 sm:h-12 rounded-lg bg-neutral-200 overflow-hidden shrink-0 relative group/cover cursor-pointer shadow-sm"
            title="نمایش پلیر تمام‌صفحه"
            @click="audioStore.openFullscreen"
          >
            <img
              :src="audioStore.currentTrackCover"
              :alt="displayTitle || 'Cover'"
              width="48"
              height="48"
              loading="lazy"
              decoding="async"
              class="w-full h-full object-cover group-hover/cover:scale-105 transition-transform duration-300"
            />
            <div class="absolute inset-0 bg-black/30 flex items-center justify-center opacity-0 group-hover/cover:opacity-100 transition-opacity">
              <i class="fas fa-expand text-white text-xs sm:text-sm"></i>
            </div>
          </div>
          <div
            class="min-w-0 flex flex-col justify-center cursor-pointer group/info select-none"
            title="نمایش پلیر تمام‌صفحه"
            @click="audioStore.openFullscreen"
          >
            <div class="flex items-center gap-2 min-w-0">
              <!-- Equalizer while playing -->
              <div v-if="audioStore.isPlaying" class="eq-bars eq-bars-sm shrink-0" aria-hidden="true">
                <span></span><span></span><span></span>
              </div>
              <h4 class="font-bold text-xs sm:text-sm truncate text-neutral-800 group-hover/info:text-gold transition-colors font-body" dir="auto">
                {{ displayTitle }}
              </h4>
            </div>
            <p class="text-[11px] sm:text-xs text-neutral-500 truncate mt-0.5 font-light">
              {{ audioStore.currentTrack?.subtitle || 'Magtymguly Pyragy' }}
            </p>
          </div>
        </div>

        <!-- Controls -->
        <div class="flex items-center gap-1.5 sm:gap-3 md:gap-4 shrink-0">
          <button
            class="text-neutral-400 hover:text-gold transition-colors cursor-pointer disabled:opacity-30 w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 flex items-center justify-center active:scale-95"
            :disabled="!audioStore.hasPrev"
            aria-label="ترک قبلی"
            @click="audioStore.prevTrack"
          >
            <i class="fas fa-backward-step text-base sm:text-lg md:text-xl"></i>
          </button>

          <button
            class="w-11 h-11 sm:w-12 sm:h-12 md:w-14 md:h-14 rounded-full bg-black text-white flex items-center justify-center hover:bg-gold hover:text-black transition-all shadow-lg hover:scale-105 active:scale-95 cursor-pointer"
            aria-label="پخش یا توقف"
            @click="audioStore.togglePlay"
          >
            <i v-if="audioStore.isLoading" class="fas fa-circle-notch fa-spin text-base sm:text-lg md:text-xl"></i>
            <i v-else-if="audioStore.isPlaying" class="fas fa-pause text-base sm:text-lg md:text-xl"></i>
            <i v-else class="fas fa-play text-base sm:text-lg md:text-xl ml-0.5"></i>
          </button>

          <button
            class="text-neutral-400 hover:text-gold transition-colors cursor-pointer disabled:opacity-30 w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 flex items-center justify-center active:scale-95"
            :disabled="!audioStore.hasNext"
            aria-label="ترک بعدی"
            @click="audioStore.nextTrack"
          >
            <i class="fas fa-forward-step text-base sm:text-lg md:text-xl"></i>
          </button>
        </div>

        <!-- Time, Repeat, Volume, Expand -->
        <div class="flex items-center gap-1 sm:gap-2.5 md:gap-4 flex-1 justify-end min-w-0">
          <!-- Repeat -->
          <button
            class="hidden sm:flex transition-colors cursor-pointer w-8 h-8 md:w-9 md:h-9 items-center justify-center active:scale-95"
            :class="audioStore.isRepeat ? 'text-gold' : 'text-neutral-400 hover:text-black'"
            :aria-label="audioStore.isRepeat ? 'تکرار فعال است' : 'فعال‌سازی تکرار'"
            :aria-pressed="audioStore.isRepeat"
            title="تکرار آلبوم"
            @click="audioStore.toggleRepeat"
          >
            <i class="fas fa-repeat text-sm md:text-base"></i>
          </button>

          <!-- Volume -->
          <div class="hidden sm:flex items-center gap-1.5 group/vol">
            <button
              class="transition-colors cursor-pointer w-8 h-8 md:w-9 md:h-9 flex items-center justify-center active:scale-95"
              :class="audioStore.muted || audioStore.volume === 0 ? 'text-gold' : 'text-neutral-400 hover:text-black'"
              :aria-label="audioStore.muted ? 'بازگرداندن صدا' : 'بی‌صدا کردن'"
              @click="audioStore.toggleMute"
            >
              <i
                class="fas text-sm md:text-base"
                :class="audioStore.muted || audioStore.volume === 0 ? 'fa-volume-xmark' : audioStore.volume < 0.5 ? 'fa-volume-low' : 'fa-volume-high'"
              ></i>
            </button>
            <input
              type="range"
              min="0"
              max="1"
              step="0.01"
              :value="audioStore.muted ? 0 : audioStore.volume"
              :style="{ '--vol': (audioStore.muted ? 0 : audioStore.volume * 100) + '%' }"
              class="volume-slider w-0 md:w-20 opacity-0 md:opacity-100 transition-all duration-300 group-hover/vol:w-20 group-hover/vol:opacity-100 group-focus-within/vol:w-20 group-focus-within/vol:opacity-100 cursor-pointer"
              aria-label="کنترل صدا"
              @input="handleVolumeInput"
            />
          </div>

          <!-- Time (always visible) -->
          <div class="text-[11px] sm:text-xs font-mono text-neutral-600 whitespace-nowrap">
            {{ audioStore.formatTime(audioStore.currentTime) }} / {{ audioStore.formatTime(audioStore.duration) }}
          </div>

          <!-- Expand button -->
          <button
            class="text-neutral-500 hover:text-black transition-colors cursor-pointer w-7 h-7 sm:w-8 sm:h-8 md:w-9 md:h-9 flex items-center justify-center rounded-full hover:bg-black/5 active:scale-95"
            aria-label="بزرگ‌نمایی پلیر"
            title="بزرگ‌نمایی پلیر"
            @click="audioStore.openFullscreen"
          >
            <i class="fas fa-chevron-up text-xs sm:text-sm md:text-base"></i>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
