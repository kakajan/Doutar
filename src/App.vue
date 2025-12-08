<script setup lang="ts">
import { onMounted, onUnmounted } from 'vue'
import { useAudioStore } from './stores/audio'
import AppHeader from './components/AppHeader.vue'
import StickyPlayer from './components/StickyPlayer.vue'
import FullscreenPlayer from './components/FullscreenPlayer.vue'
import Preloader from './components/Preloader.vue'
import DustCanvas from './components/DustCanvas.vue'
import SchemaOrg from './components/SchemaOrg.vue'

const audioStore = useAudioStore()

onMounted(() => {
  const handlePopstate = (event: PopStateEvent) => {
    if (event.state?.playerOpen) {
      audioStore.isFullscreen = true
    } else {
      audioStore.closeFullscreen()
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
    <Preloader />
    <SchemaOrg />
    
    <!-- Background Effects -->
    <div class="bg-mesh"></div>
    <DustCanvas id="dust-canvas" :particle-count="40" />
    
    <!-- Header (persistent) -->
    <AppHeader />
    
    <!-- Router View (page content changes here) -->
    <router-view v-slot="{ Component }">
      <transition name="fade" mode="out-in">
        <component :is="Component" />
      </transition>
    </router-view>
    
    <!-- Players (persistent across routes) -->
    <StickyPlayer />
    <FullscreenPlayer />
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
