<script setup lang="ts">
import { ref, computed, watch, nextTick } from 'vue'
import { useAudioStore } from '@/stores/audio'
import { musicGroups } from '@/data/tracks'
import TrackCard from './TrackCard.vue'

const audioStore = useAudioStore()

const tabsRef = ref<HTMLElement | null>(null)
const gliderStyle = ref({ width: '0px', transform: 'translateX(0px)' })

const updateGlider = async () => {
  await nextTick()
  if (!tabsRef.value) return
  
  const activeTab = tabsRef.value.querySelector('.music-tab.active') as HTMLElement
  if (activeTab) {
    gliderStyle.value = {
      width: `${activeTab.offsetWidth}px`,
      transform: `translateX(${activeTab.offsetLeft}px)`
    }
  }
}

watch(() => audioStore.activeGroupId, updateGlider)

// Initialize glider on mount
setTimeout(updateGlider, 100)

const isTransitioning = ref(false)
const transitionDirection = ref(0)

function switchGroup(groupId: string) {
  if (groupId === audioStore.activeGroupId) return
  
  const currentIndex = musicGroups.findIndex(g => g.id === audioStore.activeGroupId)
  const nextIndex = musicGroups.findIndex(g => g.id === groupId)
  transitionDirection.value = nextIndex > currentIndex ? 1 : -1
  
  isTransitioning.value = true
  
  setTimeout(() => {
    audioStore.switchGroup(groupId)
    
    setTimeout(() => {
      isTransitioning.value = false
    }, 50)
  }, 200)
}
</script>

<template>
  <section id="music-hall" class="py-32 relative z-10">
    <div class="container mx-auto px-6 max-w-6xl">
      <!-- Header -->
      <div
        id="music-header"
        class="flex items-end text-center justify-between mb-20 border-b border-black/5 pb-4"
      >
        <div>
          <h2 class="text-4xl text-black font-body font-bold">
            دانلود آهنگ ترکمنی جدید ۱۴۰۴
          </h2>
          <p class="text-neutral-500 mt-2 text-sm font-light">
            <strong>اشعار مختومقلی فراغی</strong> با دوتار و موسیقی الکترونیک | کیفیت ۳۲۰
          </p>
        </div>
        <div id="track-counter" class="text-gold font-mono text-xs hidden md:block">
          /// {{ audioStore.activeGroup.name }} • {{ audioStore.tracks.length.toString().padStart(2, '0') }} TRACKS
        </div>
      </div>

      <!-- Tabs -->
      <div class="music-tabs-container">
        <div ref="tabsRef" class="music-tabs" id="music-tabs">
          <div
            class="tab-glider"
            :style="gliderStyle"
          ></div>
          
          <button
            v-for="group in musicGroups"
            :key="group.id"
            class="music-tab"
            :class="{ active: group.id === audioStore.activeGroupId }"
            @click="switchGroup(group.id)"
          >
            <div class="music-tab-content">
              <span class="music-tab-title">{{ group.name }}</span>
              <span class="music-tab-hint">{{ group.hint }}</span>
            </div>
          </button>
        </div>
      </div>

      <!-- Track Grid -->
      <div
        id="music-grid"
        class="music-grid-dense"
        :class="{
          'opacity-0': isTransitioning,
        }"
        :style="{
          transform: isTransitioning 
            ? `translateX(${transitionDirection * -30}px)` 
            : 'translateX(0)'
        }"
      >
        <TrackCard
          v-for="track in audioStore.tracks"
          :key="track.id"
          :track="track"
        />
      </div>
    </div>
  </section>
</template>
