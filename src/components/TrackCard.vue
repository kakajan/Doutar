<script setup lang="ts">
import { computed } from 'vue'
import { useAudioStore } from '@/stores/audio'
import { useToast } from '@/composables/useToast'
import type { Track } from '@/data/tracks'

const props = withDefaults(defineProps<{
  track: Track
  albumId?: string
  index?: number
}>(), {
  albumId: '',
  index: 0
})

const audioStore = useAudioStore()
const toast = useToast()

const isPlaying = computed(() => 
  audioStore.currentTrackId === props.track.id && audioStore.isPlaying
)

const isLoading = computed(() =>
  audioStore.currentTrackId === props.track.id && audioStore.isLoading
)

const isCurrent = computed(() =>
  audioStore.currentTrackId === props.track.id
)

function handlePlay() {
  // If this track is from a different album, switch to that album first
  if (props.albumId && props.albumId !== audioStore.activeGroupId) {
    audioStore.switchGroupWithoutStop(props.albumId)
  }
  audioStore.playTrack(props.track.id)
}

async function handleShare() {
  const shareText = '«' + props.track.title + '» — از آلبوم میراث صحرا 🎵\n' +
    'دانلود رایگان آهنگ ترکمنی با اشعار مختومقلی فراغی\nhttps://doutar.ir'
  try {
    if (navigator.share) {
      await navigator.share({
        title: props.track.title,
        text: shareText,
        url: props.track.file,
      })
      return
    }

    if (navigator.clipboard?.writeText) {
      await navigator.clipboard.writeText(shareText + '\n' + props.track.file)
      toast.success('لینک در کلیپ‌بورد کپی شد ✅')
      return
    }

    window.location.href = 'mailto:?subject=' + encodeURIComponent(props.track.title) + '&body=' + encodeURIComponent(shareText + '\n' + props.track.file)
  } catch (err) {
    console.error('Share failed', err)
    try {
      await navigator.clipboard.writeText(props.track.file)
      toast.info('اشتراک‌گذاری پشتیبانی نمی‌شود؛ لینک کپی شد.')
    } catch {
      toast.error('اشتراک‌گذاری پشتیبانی نمی‌شود.')
    }
  }
}

function handleDownload() {
  toast.success('دانلود «' + props.track.title + '» شروع شد')
}
</script>

<template>
  <div
    class="glass-card music-card-dense rounded-2xl flex items-center group music-item relative overflow-hidden select-none"
    :class="{ playing: isCurrent && isPlaying }"
    dir="ltr"
  >
    <!-- Track Number -->
    <div class="w-8 text-center text-neutral-500 text-sm font-mono shrink-0">
      {{ (index + 1).toString().padStart(2, '0') }}
    </div>

    <!-- Play Button -->
    <div
      class="play-btn-wrapper rounded-full flex items-center justify-center shrink-0 cursor-pointer relative z-10 transition-all duration-300 active:scale-95"
      role="button"
      :aria-label="isPlaying ? 'توقف' : 'پخش'"
      :aria-pressed="isPlaying"
      tabindex="0"
      @click="handlePlay"
      @keydown.enter="handlePlay"
      @keydown.space.prevent="handlePlay"
    >
      <i v-if="isLoading" class="fas fa-circle-notch fa-spin text-lg"></i>
      <i v-else-if="isPlaying" class="fas fa-pause text-lg"></i>
      <i v-else class="fas fa-play text-lg ml-0.5"></i>
    </div>

    <!-- Track Info -->
    <div class="flex-1 relative z-10 min-w-0">
      <div class="flex items-center gap-2 min-w-0">
        <!-- Equalizer animation while playing -->
        <div v-if="isPlaying" class="eq-bars shrink-0" aria-hidden="true">
          <span></span><span></span><span></span><span></span>
        </div>
        <h3
          itemprop="name"
          class="font-bold text-neutral-900 group-hover:text-dark-gold transition-colors truncate text-sm sm:text-base"
        >
          {{ track.title }}
        </h3>
      </div>
      <div class="track-meta mt-1 text-neutral-600 flex items-center gap-2">
        <span class="truncate text-xs" itemprop="byArtist">
          <i class="fas fa-microphone-lines text-xs text-neutral-500"></i>
          {{ track.subtitle }}
        </span>
        <span class="px-1.5 py-0.5 rounded bg-black/5 text-[10px] font-mono text-neutral-500 tracking-wider">320K</span>
        <span class="shrink-0 font-mono text-xs text-neutral-500" dir="ltr">
          <i class="far fa-clock text-xs"></i>
          {{ audioStore.formatTime(track.duration) }}
        </span>
      </div>
    </div>

    <!-- Actions -->
    <div class="flex items-center gap-1 sm:gap-2 relative z-10">
      <a
        :href="track.file"
        class="action-btn min-w-[36px] min-h-[36px] flex items-center justify-center rounded-full hover:bg-black/5 text-neutral-700 hover:text-black transition-colors"
        download
        :aria-label="'دانلود ' + track.title"
        title="دانلود"
        @click="handleDownload"
      >
        <i class="fas fa-download text-sm"></i>
      </a>
      <button
        type="button"
        class="action-btn min-w-[36px] min-h-[36px] flex items-center justify-center rounded-full hover:bg-black/5 text-neutral-700 hover:text-black transition-colors cursor-pointer"
        :aria-label="'اشتراک‌گذاری ' + track.title"
        title="اشتراک‌گذاری"
        @click="handleShare"
      >
        <i class="fas fa-share text-sm"></i>
      </button>
    </div>
  </div>
</template>
