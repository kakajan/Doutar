<script setup lang="ts">
import { ref, onMounted, onUnmounted, watch, defineAsyncComponent } from 'vue'
import { useAudioStore } from './stores/audio'
import { useKeyboardShortcuts } from './composables/useKeyboardShortcuts'
import { useSeo } from './composables/useSeo'
import AppHeader from './components/AppHeader.vue'
import StickyPlayer from './components/StickyPlayer.vue'
import DustCanvas from './components/DustCanvas.vue'
import ToastContainer from './components/ToastContainer.vue'
import BackToTop from './components/BackToTop.vue'

const FullscreenPlayer = defineAsyncComponent(() => import('./components/FullscreenPlayer.vue'))

const audioStore = useAudioStore()
const hasOpenedPlayer = ref(false)

watch(
  () => audioStore.isFullscreen,
  (open) => {
    if (open) hasOpenedPlayer.value = true
  },
)

useKeyboardShortcuts()
useSeo()

watch(
  () => audioStore.currentTrackId,
  (id) => {
    document.body.classList.toggle('has-sticky-player', id !== null)
  },
  { immediate: true },
)

onMounted(() => {
  const handlePopstate = (event: PopStateEvent) => {
    if (event.state?.playerOpen) {
      audioStore.isFullscreen = true
    } else if (audioStore.isFullscreen) {
      audioStore.isFullscreen = false
    }
  }
  
  window.addEventListener('popstate', handlePopstate)
  
  onUnmounted(() => {
    window.removeEventListener('popstate', handlePopstate)
  })
})
</script>

<template>
  <div>
    <!-- Accessibility: skip link -->
    <a
      href="#main-content"
      class="skip-link sr-only focus:not-sr-only focus:fixed focus:top-3 focus:right-3 focus:z-[100000] focus:bg-black focus:text-gold focus:px-5 focus:py-3 focus:rounded-full focus:text-sm focus:font-bold"
    >
      پرش به محتوای اصلی
    </a>
    
    <!-- Background Effects -->
    <div class="bg-mesh"></div>
    <DustCanvas id="dust-canvas" :particle-count="40" />
    
    <!-- Header (persistent) -->
    <AppHeader />
    
    <!-- Router View (page content changes here) -->
    <main id="main-content">
      <router-view v-slot="{ Component }">
        <transition name="fade" mode="out-in">
          <component :is="Component" />
        </transition>
      </router-view>
    </main>
    
    <!-- Players (persistent across routes) -->
    <StickyPlayer />
    <FullscreenPlayer v-if="hasOpenedPlayer" />
    <BackToTop />
    <ToastContainer />
  </div>
</template>

<style>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
