<script setup lang="ts">
import { computed } from 'vue'
import { useAudioStore } from '@/stores/audio'

const audioStore = useAudioStore()

const isVisible = computed(() => audioStore.currentTrackId !== null)

const displayTitle = computed(() => {
  if (!audioStore.currentTrack || !audioStore.currentTrackGroup) return 'Select a Track'
  const index = audioStore.currentTrackIndex
  return `${audioStore.currentTrackGroup.name} #${(index + 1).toString().padStart(2, '0')}`
})

function handleSeekInput(event: Event) {
  const target = event.target as HTMLInputElement
  audioStore.seek(parseFloat(target.value))
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
        :style="{ width: `${audioStore.progress}%` }"
      ></div>
      <div
        class="absolute top-1/2 -translate-y-1/2 w-3 h-3 bg-black rounded-full shadow-md opacity-0 group-hover:opacity-100 transition-opacity -translate-x-1/2"
        :style="{ left: `${audioStore.progress}%` }"
      ></div>
      <input
        type="range"
        min="0"
        max="100"
        :value="audioStore.progress"
        class="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
        @input="handleSeekInput"
      />
    </div>

    <div class="bg-white/80 backdrop-blur-xl border-t border-white/20 shadow-[0_-4px_30px_rgba(0,0,0,0.1)] px-4 py-3">
      <div class="container mx-auto max-w-5xl flex items-center justify-between gap-4">
        <!-- Track Info (Left) -->
        <div class="flex items-center gap-3 min-w-0 flex-1">
          <div class="hidden sm:block w-12 h-12 rounded-lg bg-neutral-200 overflow-hidden shrink-0 relative group cursor-pointer" @click="audioStore.openFullscreen">
            <img
              src="/assets/img/music-cover.webp"
              alt="Cover"
              width="48"
              height="48"
              loading="lazy"
              decoding="async"
              class="w-full h-full object-cover"
            />
            <div class="absolute inset-0 bg-black/30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
              <i class="fas fa-expand text-white text-sm"></i>
            </div>
          </div>
          <div class="min-w-0 flex flex-col justify-center">
            <h4 class="font-bold text-sm truncate text-neutral-800">
              {{ displayTitle }}
            </h4>
            <p class="text-xs text-neutral-500 truncate">
              {{ audioStore.currentTrack?.subtitle || 'Magtymguly Pyragy' }}
            </p>
          </div>
        </div>

        <!-- Controls (Center) - Bigger Buttons -->
        <div class="flex items-center gap-6">
          <button
            class="text-neutral-400 hover:text-gold transition-colors cursor-pointer disabled:opacity-30 w-10 h-10 flex items-center justify-center"
            :disabled="!audioStore.hasPrev"
            aria-label="Previous Track"
            @click="audioStore.prevTrack"
          >
            <i class="fas fa-backward-step text-xl"></i>
          </button>

          <button
            class="w-14 h-14 rounded-full bg-black text-white flex items-center justify-center hover:bg-gold hover:text-black transition-all shadow-lg hover:scale-105 cursor-pointer"
            aria-label="Play"
            @click="audioStore.togglePlay"
          >
            <i v-if="audioStore.isPlaying" class="fas fa-pause text-xl"></i>
            <i v-else class="fas fa-play text-xl ml-1"></i>
          </button>

          <button
            class="text-neutral-400 hover:text-gold transition-colors cursor-pointer disabled:opacity-30 w-10 h-10 flex items-center justify-center"
            :disabled="!audioStore.hasNext"
            aria-label="Next Track"
            @click="audioStore.nextTrack"
          >
            <i class="fas fa-forward-step text-xl"></i>
          </button>
        </div>

        <!-- Time & Expand (Right) -->
        <div class="flex items-center gap-4 flex-1 justify-end">
          <div class="text-xs font-mono text-neutral-500 hidden sm:block">
            {{ audioStore.formatTime(audioStore.currentTime) }} / {{ audioStore.formatTime(audioStore.duration) }}
          </div>
          <button
            class="text-neutral-400 hover:text-black transition-colors cursor-pointer w-10 h-10 flex items-center justify-center"
            aria-label="Maximize Player"
            @click="audioStore.openFullscreen"
          >
            <i class="fas fa-chevron-up text-lg"></i>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
