<script setup lang="ts">
import { ref, watch, nextTick, onMounted } from 'vue'
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
    // Use bounding rects (not offsetLeft) so the glider works correctly in RTL
    // where offsetLeft can be negative or measured from the wrong edge.
    const tabsRect = tabsRef.value.getBoundingClientRect()
    const tabRect = activeTab.getBoundingClientRect()
    gliderStyle.value = {
      width: `${tabRect.width}px`,
      transform: `translateX(${tabRect.left - tabsRect.left}px)`
    }
  }
}

// Initialize glider on mount and when the active group changes
onMounted(updateGlider)
watch(() => audioStore.activeGroupId, updateGlider)

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
  <section id="quick-listen" class="py-32 relative z-10">
    <div class="container mx-auto px-6 max-w-6xl">
      <!-- Header -->
      <div
        id="music-header"
        class="flex flex-col md:flex-row md:items-end text-center md:text-right justify-between mb-12 md:mb-20 border-b border-black/5 pb-4 gap-3"
      >
        <div>
          <h2 class="text-2xl md:text-4xl text-neutral-900 font-body font-bold">
            پخش آنلاین آهنگ ترکمنی
          </h2>
          <p class="text-neutral-600 mt-2 text-sm font-normal">
            <strong>اشعار مختومقلی فراغی</strong> با دوتار و تنظیم الکترونیک | کیفیت ۳۲۰
          </p>
        </div>
        <div id="track-counter" class="text-neutral-700 font-body text-sm font-medium hidden md:flex items-center gap-2">
          <span class="text-dark-gold font-bold">{{ audioStore.activeGroup.name }}</span>
          <span>({{ audioStore.tracks.length }} قطعه)</span>
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
          v-for="(track, index) in audioStore.tracks"
          :key="track.id"
          :track="track"
          :index="index"
        />
      </div>
    </div>
  </section>
</template>
