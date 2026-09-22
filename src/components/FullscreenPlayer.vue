<script setup lang="ts">
import { computed, ref, watch, nextTick, onMounted, onUnmounted } from 'vue'
import { useAudioStore } from '@/stores/audio'
import { useToast } from '@/composables/useToast'
import { lockBody, unlockBody } from '@/composables/useBodyScrollLock'


const audioStore = useAudioStore()
const toast = useToast()
const visualizerContainer = ref<HTMLElement | null>(null)
const pulseScale = ref(1.1)
const pulseOpacity = ref(0.3)
let animationFrameId: number | null = null

const playlistOpen = ref(false)
const closeBtnRef = ref<HTMLElement | null>(null)
let previousFocus: HTMLElement | null = null


const isOpen = computed(() => audioStore.isFullscreen)

watch(isOpen, async (open) => {
  if (open) {
    lockBody()
    startAnimation()
    previousFocus = document.activeElement as HTMLElement | null
    await nextTick()
    closeBtnRef.value?.focus()
  } else {
    playlistOpen.value = false
    unlockBody()
    stopAnimation()
    previousFocus?.focus?.()
    previousFocus = null
  }
}, { immediate: true })

// Swipe detection & dismiss
const touchStartX = ref(0)
const touchStartY = ref(0)
const touchCurrentY = ref(0)
const isDragging = ref(false)
const isClosing = ref(false)
const dragOffset = ref(0)
const SWIPE_THRESHOLD = 90 // pixels to trigger close

// Scrubbing state
const isSeeking = ref(false)
const seekValue = ref(0)

const displayProgress = computed(() => isSeeking.value ? seekValue.value : audioStore.progress)
const displayTime = computed(() => {
  if (isSeeking.value && audioStore.duration > 0) {
    return (seekValue.value / 100) * audioStore.duration
  }
  return audioStore.currentTime
})

function isInteractiveTarget(target: EventTarget | null) {
  return Boolean(
    (target as HTMLElement | null)?.closest?.(
      'button, a, input, .fs-playlist, .fs-playlist-backdrop',
    ),
  )
}

function handleTouchStart(e: TouchEvent) {
  if (playlistOpen.value || isInteractiveTarget(e.target)) return
  touchStartX.value = e.touches[0].clientX
  touchStartY.value = e.touches[0].clientY
  touchCurrentY.value = e.touches[0].clientY
  isDragging.value = false
  dragOffset.value = 0
}

function handleTouchMove(e: TouchEvent) {
  if (playlistOpen.value) return

  const currentY = e.touches[0].clientY
  const currentX = e.touches[0].clientX
  const diffY = currentY - touchStartY.value
  const diffX = Math.abs(currentX - touchStartX.value)

  if (!isDragging.value) {
    // Only engage drag if movement is clearly vertical downward
    if (diffY > 8 && diffY > diffX) {
      isDragging.value = true
    } else {
      return
    }
  }

  touchCurrentY.value = currentY
  dragOffset.value = Math.max(0, diffY)

  if (dragOffset.value > 0) {
    e.preventDefault()
  }
}

function handleTouchEnd() {
  if (!isDragging.value) return

  if (dragOffset.value > SWIPE_THRESHOLD) {
    isClosing.value = true
    handleClose()
    window.setTimeout(() => {
      isClosing.value = false
      dragOffset.value = 0
      isDragging.value = false
    }, 350)
  } else {
    // Spring back smoothly
    isDragging.value = false
    dragOffset.value = 0
  }
}

function handleClose() {
  playlistOpen.value = false
  audioStore.closeFullscreen()
}

function handleSeekInput(event: Event) {
  isSeeking.value = true
  const target = event.target as HTMLInputElement
  seekValue.value = parseFloat(target.value)
}

function handleSeekChange(event: Event) {
  const target = event.target as HTMLInputElement
  audioStore.seek(parseFloat(target.value))
  isSeeking.value = false
}

function handleVolumeInput(event: Event) {
  const target = event.target as HTMLInputElement
  audioStore.setVolume(parseFloat(target.value))
}

function handleKeydown(e: KeyboardEvent) {
  if (!isOpen.value) return
  if (e.key === 'Backspace' || e.key === 'Escape') {
    if (['INPUT', 'TEXTAREA'].includes((document.activeElement as HTMLElement)?.tagName)) return
    e.preventDefault()
    if (playlistOpen.value) {
      playlistOpen.value = false
      return
    }
    handleClose()
  }
}

// Mouse drag for desktop
const mouseStartY = ref(0)
const isMouseDragging = ref(false)

function handleMouseDown(e: MouseEvent) {
  if (playlistOpen.value || isInteractiveTarget(e.target)) return
  mouseStartY.value = e.clientY
  isMouseDragging.value = true
  dragOffset.value = 0
}

function handleMouseMove(e: MouseEvent) {
  if (!isMouseDragging.value) return
  const diff = e.clientY - mouseStartY.value
  if (diff > 10) {
    dragOffset.value = diff
  }
}

function handleMouseUp() {
  if (!isMouseDragging.value) return

  if (dragOffset.value > SWIPE_THRESHOLD) {
    isClosing.value = true
    handleClose()
    window.setTimeout(() => {
      isClosing.value = false
      dragOffset.value = 0
      isMouseDragging.value = false
    }, 350)
  } else {
    isMouseDragging.value = false
    dragOffset.value = 0
  }
}

onMounted(async () => {
  document.addEventListener('keydown', handleKeydown)
  document.addEventListener('mousemove', handleMouseMove)
  document.addEventListener('mouseup', handleMouseUp)
  document.addEventListener('visibilitychange', handleVisibility)

  // Initialize Audio Visualizer
  if (visualizerContainer.value) {
    await audioStore.initAudioMotion(visualizerContainer.value)
    // Ensure we are connected if already playing
    if (audioStore.audioElement) {
       await audioStore.connectToVisualizer()
    }
  }
  
  // Only run the animation loop while the player is open
  if (isOpen.value) {
    startAnimation()
  }
})

onUnmounted(() => {
  document.removeEventListener('keydown', handleKeydown)
  document.removeEventListener('mousemove', handleMouseMove)
  document.removeEventListener('mouseup', handleMouseUp)
  document.removeEventListener('visibilitychange', handleVisibility)

  if (isOpen.value) unlockBody()
  stopAnimation()
})

// Start/stop the pulse loop only while the player is open and the tab is visible
function startAnimation() {
  if (animationFrameId !== null) return

  const animate = () => {
    if (!isOpen.value) {
      animationFrameId = null
      return
    }

    if (audioStore.isPlaying) {
      const energy = audioStore.getEnergy() // 0 to ~1
      // Map energy to scale and opacity
      // Base scale 1.1, max 1.25
      pulseScale.value = 1.1 + (energy * 0.15)
      // Base opacity 0.3, max 0.8
      pulseOpacity.value = 0.3 + (energy * 0.5)
    } else {
      // Smooth return to base if paused
      pulseScale.value = 1.1
      pulseOpacity.value = 0.3
    }
    animationFrameId = requestAnimationFrame(animate)
  }
  animate()
}

function stopAnimation() {
  if (animationFrameId !== null) {
    cancelAnimationFrame(animationFrameId)
    animationFrameId = null
  }
}

function handleVisibility() {
  if (document.hidden) {
    stopAnimation()
  } else if (isOpen.value) {
    startAnimation()
  }
}

const dragStyle = computed(() => {
  if (isClosing.value) {
    return {
      transform: 'translateY(100%)',
      opacity: '0',
      transition: 'transform 0.35s cubic-bezier(0.32, 0.72, 0, 1), opacity 0.25s ease'
    }
  }
  if (dragOffset.value > 0) {
    const maxDrag = typeof window !== 'undefined' ? (window.innerHeight || 800) : 800
    const progress = Math.min(1, dragOffset.value / maxDrag)
    const opacity = Math.max(0.35, 1 - progress * 0.8)
    const scale = Math.max(0.92, 1 - progress * 0.08)
    return {
      transform: `translateY(${dragOffset.value}px) scale(${scale})`,
      opacity: `${opacity}`,
      transition: isDragging.value || isMouseDragging.value ? 'none' : 'transform 0.3s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.3s ease, scale 0.3s ease'
    }
  }
  return {}
})

// Playlist
const playlistTracks = computed(() => {
  if (audioStore.currentPlayingTracks.length > 0) return audioStore.currentPlayingTracks
  return audioStore.tracks
})

function playFromPlaylist(trackId: string) {
  audioStore.playTrack(trackId)
}

function handleShare() {
  const track = audioStore.currentTrack
  if (!track) return
  const shareText = '«' + track.title + '» — از آلبوم میراث صحرا 🎵\n' +
    'دانلود رایگان آهنگ ترکمنی با اشعار مختومقلی فراغی\nhttps://doutar.ir'
  if (navigator.share) {
    navigator.share({ title: track.title, text: shareText, url: track.file }).catch(() => {})
    return
  }
  if (navigator.clipboard?.writeText) {
    navigator.clipboard.writeText(shareText + '\n' + track.file)
      .then(() => toast.success('لینک در کلیپ‌بورد کپی شد ✅'))
      .catch(() => toast.error('کپی لینک ناموفق بود'))
    return
  }
  toast.info('اشتراک‌گذاری پشتیبانی نمی‌شود')
}

function handleDownload() {
  const track = audioStore.currentTrack
  if (!track) return
  toast.success('دانلود «' + track.title + '» شروع شد')
}
</script>

<template>
  <div
    id="fs-player"
    class="fixed inset-0 bg-neutral-900/95 backdrop-blur-3xl flex flex-col items-center justify-between overflow-y-auto overscroll-none transition-all duration-500 pt-[calc(1rem+env(safe-area-inset-top,0px))] pb-[calc(1.5rem+env(safe-area-inset-bottom,0px))] select-none"
    :class="isOpen ? 'translate-y-0 opacity-100 visible' : 'translate-y-full opacity-0 invisible'"
    :style="isOpen ? dragStyle : { willChange: 'transform' }"
    style="z-index: 99999; will-change: transform; touch-action: pan-y;"
    dir="ltr"
    @touchstart="handleTouchStart"
    @touchmove="handleTouchMove"
    @touchend="handleTouchEnd"
    @mousedown="handleMouseDown"
  >
    <!-- Top drag handle / swipe indicator -->
    <div 
      class="absolute top-2 md:top-3 left-1/2 -translate-x-1/2 w-20 h-7 flex items-center justify-center z-40 cursor-grab active:cursor-grabbing touch-none select-none"
      aria-label="بستن پلیر با کشیدن به پایین"
      @click="handleClose"
    >
      <div 
        class="w-12 h-1.5 bg-white/30 rounded-full transition-all duration-200"
        :class="{ 'bg-gold w-16': dragOffset > SWIPE_THRESHOLD / 2 }"
      ></div>
    </div>

    <!-- Background Image (Blurred) -->
    <div
      class="absolute inset-0 z-0 opacity-20 bg-cover bg-center blur-3xl scale-110 pointer-events-none"
      :style="{ backgroundImage: `url(${audioStore.currentTrackCover})` }"
    ></div>

    <!-- Dynamic Pulse Background -->
    <div
      id="fs-pulse-bg"
      class="absolute inset-0 z-0 pointer-events-none mix-blend-screen transition-opacity duration-75 scale-110"
      :style="{
        backgroundImage: `url(${audioStore.currentTrackCover})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        filter: 'blur(60px)',
        transform: 'scale(' + pulseScale + ')',
        opacity: pulseOpacity
      }"
    ></div>
    
    <!-- Hidden container for AudioMotion analyzer -->
    <div ref="visualizerContainer" class="hidden"></div>

    <!-- Close Button -->
    <button
      ref="closeBtnRef"
      id="fs-close-btn"
      class="absolute top-[calc(0.75rem+env(safe-area-inset-top,0px))] right-5 md:right-8 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 active:scale-95 text-white/80 hover:text-white z-40 transition-all flex items-center justify-center cursor-pointer shadow-lg backdrop-blur-md"
      aria-label="بستن پلیر تمام‌صفحه"
      @click.stop="handleClose"
    >
      <i class="fas fa-chevron-down text-xl"></i>
    </button>

    <!-- Playlist Toggle Button -->
    <button
      class="absolute top-[calc(0.75rem+env(safe-area-inset-top,0px))] left-5 md:left-8 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 active:scale-95 text-white/80 hover:text-gold z-40 transition-all flex items-center justify-center cursor-pointer shadow-lg backdrop-blur-md"
      :aria-label="playlistOpen ? 'بستن پلی‌لیست' : 'باز کردن پلی‌لیست'"
      :aria-expanded="playlistOpen"
      @click.stop="playlistOpen = !playlistOpen"
    >
      <i class="fas fa-list-ul text-lg"></i>
    </button>

    <Transition
      enter-active-class="transition-opacity duration-300"
      enter-from-class="opacity-0"
      enter-to-class="opacity-100"
      leave-active-class="transition-opacity duration-200"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0"
    >
      <div
        v-if="playlistOpen"
        class="fs-playlist-backdrop absolute inset-0 z-20 bg-black/45 backdrop-blur-md"
        aria-hidden="true"
        @click="playlistOpen = false"
      ></div>
    </Transition>

    <!-- Playlist Panel -->
    <Transition
      enter-active-class="transition-all duration-300 ease-out"
      enter-from-class="-translate-x-full opacity-0"
      enter-to-class="translate-x-0 opacity-100"
      leave-active-class="transition-all duration-200 ease-in"
      leave-from-class="translate-x-0 opacity-100"
      leave-to-class="-translate-x-full opacity-0"
    >
      <div
        v-if="playlistOpen"
        class="fs-playlist absolute inset-y-0 left-0 w-80 max-w-[85vw] bg-black/85 backdrop-blur-2xl border-r border-white/10 z-30 flex flex-col shadow-2xl pt-[calc(1rem+env(safe-area-inset-top,0px))] pb-[calc(1rem+env(safe-area-inset-bottom,0px))]"
        dir="rtl"
        role="dialog"
        aria-modal="true"
        aria-label="پلی‌لیست آهنگ‌ها"
        @click.stop
      >
        <div class="flex items-center justify-between px-6 py-5 border-b border-white/10">
          <h3 class="text-white font-bold text-lg font-body">پلی‌لیست آلبوم</h3>
          <div class="flex items-center gap-3">
            <span class="text-white/40 text-xs font-mono">{{ playlistTracks.length }} قطعه</span>
            <button
              type="button"
              class="w-8 h-8 rounded-full text-white/50 hover:text-white hover:bg-white/10 flex items-center justify-center cursor-pointer transition-colors"
              aria-label="بستن پلی‌لیست"
              @click="playlistOpen = false"
            >
              <i class="fas fa-xmark"></i>
            </button>
          </div>
        </div>
        <div class="flex-1 overflow-y-auto py-2">
          <button
            v-for="(track, index) in playlistTracks"
            :key="track.id"
            class="w-full flex items-center gap-4 px-6 py-3.5 text-right transition-colors cursor-pointer group"
            :class="audioStore.currentTrackId === track.id ? 'bg-gold/15 text-gold' : 'text-white/70 hover:bg-white/5 hover:text-white'"
            @click="playFromPlaylist(track.id)"
          >
            <span class="w-6 text-xs font-mono text-white/30 shrink-0">
              {{ (index + 1).toString().padStart(2, '0') }}
            </span>
            <div class="flex-1 min-w-0">
              <div class="flex items-center gap-2">
                <div v-if="audioStore.currentTrackId === track.id && audioStore.isPlaying" class="eq-bars eq-bars-sm shrink-0" aria-hidden="true">
                  <span></span><span></span><span></span>
                </div>
                <span class="truncate text-sm font-bold font-body">{{ track.title }}</span>
              </div>
              <span class="block text-xs text-white/40 truncate mt-0.5">{{ track.subtitle }}</span>
            </div>
            <i
              v-if="audioStore.currentTrackId === track.id"
              class="fas text-sm shrink-0"
              :class="audioStore.isPlaying ? 'fa-pause' : 'fa-play'"
            ></i>
          </button>
        </div>
      </div>
    </Transition>

    <!-- Content -->
    <div 
      class="relative z-10 w-full max-w-md px-6 md:px-8 flex flex-col items-center text-center my-auto py-8"
    >
      <!-- Album Art (spinning disc while playing) -->
      <div class="w-52 h-52 sm:w-64 sm:h-64 md:w-72 md:h-72 rounded-full shadow-2xl shadow-black/60 overflow-hidden mb-6 md:mb-8 relative group ring-4 ring-white/10 select-none">
        <img
          :src="audioStore.currentTrackCover"
          :alt="audioStore.currentTrack?.title || 'Cover'"
          width="288"
          height="288"
          loading="lazy"
          decoding="async"
          class="vinyl-disc w-full h-full object-cover select-none pointer-events-none"
          :class="{ 'vinyl-spinning': audioStore.isPlaying }"
        />
        <!-- Vinyl grooves overlay simulation -->
        <div class="absolute inset-0 rounded-full bg-radial from-transparent via-black/20 to-black/40 pointer-events-none ring-1 ring-inset ring-white/10"></div>
        <!-- Center hole with metallic spindle rim -->
        <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-neutral-950 ring-4 ring-gold/40 shadow-inner z-10 flex items-center justify-center">
          <div class="w-2.5 h-2.5 rounded-full bg-neutral-800 ring-1 ring-white/40"></div>
        </div>
      </div>

      <!-- Info -->
      <div class="mb-6 md:mb-8 space-y-1 text-center max-w-full px-2" dir="auto">
        <h2
          id="fs-title"
          class="text-xl sm:text-2xl md:text-3xl font-bold text-white font-body tracking-normal truncate"
        >
          {{ audioStore.currentTrack?.title || 'قطعه‌ای انتخاب نشده' }}
        </h2>
        <p
          id="fs-artist"
          class="text-xs sm:text-sm md:text-base text-gold/80 font-epic tracking-widest uppercase truncate"
        >
          {{ audioStore.currentTrack?.subtitle || 'Magtymguly Pyragy' }}
        </p>
      </div>

      <!-- Progress -->
      <div class="w-full mb-6 md:mb-8 group">
        <div class="relative h-2 bg-white/15 rounded-full cursor-pointer flex items-center">
          <div
            id="fs-progress-fill"
            class="absolute left-0 top-0 h-full bg-gold rounded-full transition-[width] duration-75 shadow-[0_0_12px_rgba(212,175,55,0.6)]"
            :style="{ width: displayProgress + '%' }"
          ></div>
          <div
            id="fs-progress-handle"
            class="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-4 h-4 bg-white rounded-full shadow-lg transition-transform duration-100 ring-2 ring-gold"
            :class="isSeeking ? 'scale-125 opacity-100' : 'opacity-90 group-hover:scale-125 group-hover:opacity-100'"
            :style="{ left: displayProgress + '%' }"
          ></div>
          <input
            type="range"
            id="fs-seek"
            min="0"
            max="100"
            step="0.1"
            :value="displayProgress"
            class="absolute -top-3.5 bottom-0 inset-x-0 w-full h-9 opacity-0 cursor-pointer z-20"
            aria-label="نوار پیشرفت پخش"
            @input="handleSeekInput"
            @change="handleSeekChange"
            @touchstart.stop
          />
        </div>
        <div class="flex justify-between text-xs text-white/50 font-mono mt-2.5 tracking-wider">
          <span id="fs-current-time">{{ audioStore.formatTime(displayTime) }}</span>
          <span id="fs-duration">{{ audioStore.formatTime(audioStore.duration) }}</span>
        </div>
      </div>

      <!-- Controls -->
      <div class="flex items-center justify-center gap-6 sm:gap-8 md:gap-10">
        <button
          id="fs-repeat"
          class="relative text-white/60 transition-all text-xl hover:scale-110 duration-200 cursor-pointer p-2 flex flex-col items-center"
          :class="audioStore.isRepeat ? 'text-gold' : 'hover:text-gold'"
          :aria-label="audioStore.isRepeat ? 'تکرار فعال است' : 'فعال‌سازی تکرار'"
          :aria-pressed="audioStore.isRepeat"
          @click="audioStore.toggleRepeat"
        >
          <i class="fas fa-repeat"></i>
          <span v-if="audioStore.isRepeat" class="absolute -bottom-1 w-1.5 h-1.5 rounded-full bg-gold shadow-[0_0_6px_#d4af37]"></span>
        </button>

        <button
          id="fs-prev"
          class="text-white/70 hover:text-gold transition-colors text-2xl sm:text-3xl hover:scale-110 active:scale-95 duration-200 cursor-pointer disabled:opacity-30 disabled:hover:text-white/70 disabled:cursor-not-allowed p-2"
          :disabled="!audioStore.hasPrev"
          aria-label="ترک قبلی"
          @click="audioStore.prevTrack"
        >
          <i class="fas fa-backward-step"></i>
        </button>

        <button
          id="fs-play-btn"
          class="w-18 h-18 sm:w-20 sm:h-20 rounded-full bg-white text-black flex items-center justify-center hover:scale-105 active:scale-95 transition-all duration-300 shadow-[0_0_35px_rgba(212,175,55,0.3)] hover:shadow-[0_0_45px_rgba(212,175,55,0.5)] group relative cursor-pointer"
          :class="{ playing: audioStore.isPlaying }"
          aria-label="پخش یا توقف"
          @click="audioStore.togglePlay"
        >
          <div id="fs-play-icon-wrapper" class="relative z-10 flex items-center justify-center">
            <i
              v-if="audioStore.isLoading"
              class="fas fa-circle-notch fa-spin text-3xl"
            ></i>
            <i
              v-else-if="audioStore.isPlaying"
              class="fas fa-pause text-2xl sm:text-3xl group-hover:text-dark-gold transition-colors"
            ></i>
            <i
              v-else
              class="fas fa-play text-2xl sm:text-3xl ml-1 group-hover:text-dark-gold transition-colors"
            ></i>
          </div>
        </button>

        <button
          id="fs-next"
          class="text-white/70 hover:text-gold transition-colors text-2xl sm:text-3xl hover:scale-110 active:scale-95 duration-200 cursor-pointer disabled:opacity-30 disabled:hover:text-white/70 disabled:cursor-not-allowed p-2"
          :disabled="!audioStore.hasNext"
          aria-label="ترک بعدی"
          @click="audioStore.nextTrack"
        >
          <i class="fas fa-forward-step"></i>
        </button>

        <a
          v-if="audioStore.currentTrack"
          id="fs-download"
          :href="audioStore.currentTrack.file"
          download
          class="text-white/60 transition-colors text-xl hover:scale-110 duration-200 hover:text-gold cursor-pointer p-2"
          aria-label="دانلود ترک فعلی"
          title="دانلود آهنگ"
          @click="handleDownload"
        >
          <i class="fas fa-download"></i>
        </a>
      </div>

      <!-- Volume + Share Row -->
      <div class="flex items-center justify-center gap-4 sm:gap-6 mt-6 md:mt-8 text-white/60">
        <button
          class="w-8 h-8 flex items-center justify-center transition-colors cursor-pointer hover:text-gold"
          :aria-label="audioStore.muted ? 'بازگرداندن صدا' : 'بی‌صدا کردن'"
          @click="audioStore.toggleMute"
        >
          <i
            class="fas text-base sm:text-lg"
            :class="audioStore.muted || audioStore.volume === 0 ? 'fa-volume-xmark text-gold' : audioStore.volume < 0.5 ? 'fa-volume-low' : 'fa-volume-high'"
          ></i>
        </button>
        <input
          type="range"
          min="0"
          max="1"
          step="0.01"
          :value="audioStore.muted ? 0 : audioStore.volume"
          :style="{ '--vol': (audioStore.muted ? 0 : audioStore.volume * 100) + '%' }"
          class="fs-volume-slider w-28 sm:w-36 cursor-pointer"
          aria-label="کنترل صدا"
          @input="handleVolumeInput"
          @touchstart.stop
        />
        <button
          class="w-8 h-8 flex items-center justify-center transition-colors cursor-pointer hover:text-gold"
          aria-label="اشتراک‌گذاری ترک فعلی"
          title="اشتراک‌گذاری"
          @click="handleShare"
        >
          <i class="fas fa-share-nodes text-base sm:text-lg"></i>
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.fs-volume-slider {
  -webkit-appearance: none;
  appearance: none;
  height: 4px;
  border-radius: 9999px;
  background: linear-gradient(to right, #d4af37 var(--vol, 90%), rgba(255, 255, 255, 0.2) var(--vol, 90%));
  outline: none;
}

.fs-volume-slider::-webkit-slider-thumb {
  -webkit-appearance: none;
  appearance: none;
  width: 14px;
  height: 14px;
  border-radius: 50%;
  background: #ffffff;
  border: 2px solid #d4af37;
  cursor: pointer;
  transition: transform 0.15s ease;
}

.fs-volume-slider::-webkit-slider-thumb:hover {
  transform: scale(1.2);
}

.fs-volume-slider::-moz-range-thumb {
  width: 14px;
  height: 14px;
  border-radius: 50%;
  background: #ffffff;
  border: 2px solid #d4af37;
  cursor: pointer;
}
</style>
