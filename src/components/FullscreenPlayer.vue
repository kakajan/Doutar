<script setup lang="ts">
import { computed, ref, watch, onMounted, onUnmounted } from 'vue'
import { useAudioStore } from '@/stores/audio'
import DustCanvas from './DustCanvas.vue'

const audioStore = useAudioStore()

const isOpen = computed(() => audioStore.isFullscreen)

// Disable body scroll when fullscreen is open
watch(isOpen, (open) => {
  if (open) {
    document.body.style.overflow = 'hidden'
    document.body.style.touchAction = 'none'
  } else {
    document.body.style.overflow = ''
    document.body.style.touchAction = ''
  }
}, { immediate: true })

// Swipe detection
const touchStartY = ref(0)
const touchCurrentY = ref(0)
const isDragging = ref(false)
const dragOffset = ref(0)
const SWIPE_THRESHOLD = 100 // pixels to trigger close

function handleTouchStart(e: TouchEvent) {
  touchStartY.value = e.touches[0].clientY
  touchCurrentY.value = e.touches[0].clientY
  isDragging.value = true
  dragOffset.value = 0
}

function handleTouchMove(e: TouchEvent) {
  if (!isDragging.value) return
  
  touchCurrentY.value = e.touches[0].clientY
  const diff = touchCurrentY.value - touchStartY.value
  
  // Only allow dragging down
  if (diff > 0) {
    dragOffset.value = diff
    // Prevent scroll on body when dragging
    e.preventDefault()
  }
}

function handleTouchEnd() {
  if (!isDragging.value) return
  
  if (dragOffset.value > SWIPE_THRESHOLD) {
    handleClose()
  }
  
  isDragging.value = false
  dragOffset.value = 0
}

function handleClose() {
  if (history.state?.playerOpen) {
    history.back()
  } else {
    audioStore.closeFullscreen()
  }
}

function handleSeekInput(event: Event) {
  const target = event.target as HTMLInputElement
  audioStore.seek(parseFloat(target.value))
}

function handleKeydown(e: KeyboardEvent) {
  if (e.key === 'Backspace' && isOpen.value) {
    if (['INPUT', 'TEXTAREA'].includes((document.activeElement as HTMLElement)?.tagName)) return
    e.preventDefault()
    handleClose()
  }
}

// Mouse drag for desktop
const mouseStartY = ref(0)
const isMouseDragging = ref(false)

function handleMouseDown(e: MouseEvent) {
  mouseStartY.value = e.clientY
  isMouseDragging.value = true
  dragOffset.value = 0
}

function handleMouseMove(e: MouseEvent) {
  if (!isMouseDragging.value) return
  
  const diff = e.clientY - mouseStartY.value
  if (diff > 0) {
    dragOffset.value = diff
  }
}

function handleMouseUp() {
  if (!isMouseDragging.value) return
  
  if (dragOffset.value > SWIPE_THRESHOLD) {
    handleClose()
  }
  
  isMouseDragging.value = false
  dragOffset.value = 0
}

onMounted(() => {
  document.addEventListener('keydown', handleKeydown)
  document.addEventListener('mousemove', handleMouseMove)
  document.addEventListener('mouseup', handleMouseUp)
})

onUnmounted(() => {
  document.removeEventListener('keydown', handleKeydown)
  document.removeEventListener('mousemove', handleMouseMove)
  document.removeEventListener('mouseup', handleMouseUp)
})

const dragStyle = computed(() => {
  if (dragOffset.value > 0) {
    return {
      transform: `translateY(${dragOffset.value}px)`,
      opacity: 1 - (dragOffset.value / 300),
      transition: isDragging.value || isMouseDragging.value ? 'none' : 'all 0.3s ease'
    }
  }
  return {}
})
</script>

<template>
  <div
    id="fs-player"
    class="fixed inset-0 bg-neutral-900/95 backdrop-blur-3xl flex flex-col items-center justify-center transition-all duration-500"
    :class="isOpen ? 'translate-y-0 opacity-100 visible' : 'translate-y-full opacity-0 invisible'"
    :style="isOpen ? dragStyle : {}"
    style="z-index: 99999"
    dir="ltr"
    @touchstart="handleTouchStart"
    @touchmove.passive="handleTouchMove"
    @touchend="handleTouchEnd"
    @mousedown="handleMouseDown"
  >
    <!-- Swipe indicator -->
    <div 
      class="absolute top-4 left-1/2 -translate-x-1/2 w-12 h-1 bg-white/30 rounded-full z-30"
      :class="{ 'bg-gold': dragOffset > SWIPE_THRESHOLD / 2 }"
    ></div>

    <!-- Background Image (Blurred) -->
    <div
      class="absolute inset-0 z-0 opacity-20 bg-cover bg-center blur-3xl scale-110"
      style="background-image: url('/assets/img/music-cover.webp')"
    ></div>

    <!-- Dynamic Pulse Background -->
    <div
      id="fs-pulse-bg"
      class="absolute inset-0 z-0 pointer-events-none mix-blend-screen opacity-50 transition-opacity duration-300"
    ></div>

    <!-- Full Screen Dust Canvas -->
    <DustCanvas id="fs-dust-canvas" :particle-count="50" />

    <!-- Close Button -->
    <button
      id="fs-close-btn"
      class="absolute top-8 right-8 text-white/50 hover:text-white z-20 transition-colors p-2 cursor-pointer"
      aria-label="Close Fullscreen Player"
      @click.stop="handleClose"
    >
      <i class="fas fa-chevron-down text-3xl"></i>
    </button>

    <!-- Content -->
    <div 
      class="relative z-10 w-full max-w-md px-8 flex flex-col items-center text-center"
      @mousedown.stop
      @touchstart.stop
    >
      <!-- Album Art -->
      <div class="w-64 h-64 md:w-80 md:h-80 rounded-3xl shadow-2xl shadow-black/50 overflow-hidden mb-10 relative group ring-1 ring-white/10">
        <img
          src="/assets/img/music-cover.webp"
          alt="Cover"
          width="320"
          height="320"
          loading="lazy"
          decoding="async"
          class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
      </div>

      <!-- Info -->
      <div class="mb-10 space-y-2">
        <h2
          id="fs-title"
          class="text-2xl md:text-4xl font-bold text-white font-epic tracking-wide"
        >
          {{ audioStore.currentTrack?.title || 'Select a Track' }}
        </h2>
        <p
          id="fs-artist"
          class="text-lg text-white/60 font-light tracking-widest uppercase"
        >
          {{ audioStore.currentTrack?.subtitle || 'Magtymguly Pyragy' }}
        </p>
      </div>

      <!-- Progress -->
      <div class="w-full mb-10 group">
        <div class="relative h-1.5 bg-white/10 rounded-full cursor-pointer">
          <div
            id="fs-progress-fill"
            class="absolute left-0 top-0 h-full bg-gold rounded-full transition-all duration-100 shadow-[0_0_10px_rgba(212,175,55,0.5)]"
            :style="{ width: `${audioStore.progress}%` }"
          ></div>
          <div
            id="fs-progress-handle"
            class="absolute top-1/2 -translate-y-1/2 w-4 h-4 bg-white rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-opacity scale-0 group-hover:scale-100 duration-200"
            :style="{ left: `${audioStore.progress}%` }"
          ></div>
          <input
            type="range"
            id="fs-seek"
            min="0"
            max="100"
            :value="audioStore.progress"
            class="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-20"
            @input="handleSeekInput"
          />
        </div>
        <div class="flex justify-between text-xs text-white/40 font-mono mt-3 tracking-wider">
          <span id="fs-current-time">{{ audioStore.formatTime(audioStore.currentTime) }}</span>
          <span id="fs-duration">{{ audioStore.formatTime(audioStore.duration) }}</span>
        </div>
      </div>

      <!-- Controls -->
      <div class="flex items-center gap-12">
        <button
          id="fs-prev"
          class="text-white/60 hover:text-gold transition-colors text-3xl hover:scale-110 duration-200 cursor-pointer disabled:opacity-30"
          :disabled="!audioStore.hasPrev"
          aria-label="Previous Track"
          @click="audioStore.prevTrack"
        >
          <i class="fas fa-backward-step"></i>
        </button>

        <button
          id="fs-play-btn"
          class="w-20 h-20 rounded-full bg-white text-black flex items-center justify-center hover:scale-105 transition-all duration-300 shadow-[0_0_30px_rgba(255,255,255,0.2)] hover:shadow-[0_0_40px_rgba(212,175,55,0.4)] group relative cursor-pointer"
          :class="{ playing: audioStore.isPlaying }"
          aria-label="Play"
          @click="audioStore.togglePlay"
        >
          <!-- Dust Particles -->
          <div class="play-btn-dust-container">
            <div class="play-btn-dust" style="left: 20%; animation-delay: 0s; --tx: -10px"></div>
            <div class="play-btn-dust" style="left: 50%; animation-delay: 0.5s; --tx: 5px"></div>
            <div class="play-btn-dust" style="left: 80%; animation-delay: 1s; --tx: -5px"></div>
            <div class="play-btn-dust" style="left: 35%; animation-delay: 0.2s; --tx: 10px"></div>
            <div class="play-btn-dust" style="left: 65%; animation-delay: 0.7s; --tx: -8px"></div>
          </div>
          <div id="fs-play-icon-wrapper" class="relative z-10 flex items-center justify-center">
            <i
              v-if="audioStore.isPlaying"
              class="fas fa-pause text-3xl group-hover:text-dark-gold transition-colors"
            ></i>
            <i
              v-else
              class="fas fa-play text-3xl ml-1 group-hover:text-dark-gold transition-colors"
            ></i>
          </div>
        </button>

        <button
          id="fs-next"
          class="text-white/60 hover:text-gold transition-colors text-3xl hover:scale-110 duration-200 cursor-pointer disabled:opacity-30"
          :disabled="!audioStore.hasNext"
          aria-label="Next Track"
          @click="audioStore.nextTrack"
        >
          <i class="fas fa-forward-step"></i>
        </button>
      </div>
    </div>
  </div>
</template>
