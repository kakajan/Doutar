<script setup lang="ts">
import { computed } from 'vue'
import { useAudioStore } from '@/stores/audio'
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
  const shareText = 'shared with love from https://doutar.ir 👇'
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
      await navigator.clipboard.writeText(`${shareText}\n${props.track.file}`)
      alert('Link copied to clipboard. You can paste it anywhere to share.')
      return
    }

    window.location.href = `mailto:?subject=${encodeURIComponent(props.track.title)}&body=${encodeURIComponent(shareText + '\n' + props.track.file)}`
  } catch (err) {
    console.error('Share failed', err)
    try {
      await navigator.clipboard.writeText(props.track.file)
      alert('اشتراک‌گذاری پشتیبانی نمی‌شود؛ لینک در کلیپ‌بورد کپی شد.')
    } catch {
      alert('اشتراک‌گذاری پشتیبانی نمی‌شود. لطفاً لینک را دستی به اشتراک بگذارید: ' + props.track.file)
    }
  }
}
</script>

<template>
  <div
    class="glass-card music-card-dense rounded-2xl flex items-center group music-item relative overflow-hidden select-none"
    :class="{ playing: isCurrent && isPlaying }"
    dir="ltr"
  >
    <!-- Track Number -->
    <div class="w-8 text-center text-neutral-400 text-sm font-mono shrink-0">
      {{ (index + 1).toString().padStart(2, '0') }}
    </div>

    <!-- Play Button -->
    <div
      class="play-btn-wrapper rounded-full flex items-center justify-center shrink-0 cursor-pointer relative z-10 transition-all duration-300"
      @click="handlePlay"
    >
      <!-- Dust Particles -->
      <div class="play-btn-dust-container">
        <div class="play-btn-dust" style="left: 20%; animation-delay: 0s; --tx: -10px;"></div>
        <div class="play-btn-dust" style="left: 50%; animation-delay: 0.5s; --tx: 5px;"></div>
        <div class="play-btn-dust" style="left: 80%; animation-delay: 1s; --tx: -5px;"></div>
      </div>
      
      <i v-if="isLoading" class="fas fa-circle-notch fa-spin text-lg"></i>
      <i v-else-if="isPlaying" class="fas fa-pause text-lg"></i>
      <i v-else class="fas fa-play text-lg ml-0.5"></i>
    </div>

    <!-- Track Info -->
    <div class="flex-1 relative z-10 min-w-0">
      <h4 class="font-bold text-neutral-900 group-hover:text-dark-gold transition-colors truncate">
        {{ track.title }}
      </h4>
      <div class="track-meta mt-1">
        <span class="truncate">
          <i class="fas fa-microphone-lines text-[0.6rem]"></i>
          {{ track.subtitle }}
        </span>
      </div>
    </div>

    <!-- Actions -->
    <div class="flex items-center gap-2 relative z-10">
      <a
        :href="track.file"
        class="action-btn"
        download
        aria-label="Download"
      >
        <i class="fas fa-download text-sm"></i>
      </a>
      <button
        type="button"
        class="action-btn"
        aria-label="Share"
        @click="handleShare"
      >
        <i class="fas fa-share text-sm"></i>
      </button>
    </div>
  </div>
</template>
