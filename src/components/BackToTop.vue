<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useAudioStore } from '@/stores/audio'

const audioStore = useAudioStore()
const isVisible = ref(false)
const hasPlayer = computed(() => audioStore.currentTrackId !== null)

function handleScroll() {
  isVisible.value = window.scrollY > 600
}

function scrollToTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll, { passive: true })
  handleScroll()
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>

<template>
  <Transition
    enter-active-class="transition-all duration-300"
    enter-from-class="opacity-0 translate-y-4 scale-90"
    enter-to-class="opacity-100 translate-y-0 scale-100"
    leave-active-class="transition-all duration-200"
    leave-from-class="opacity-100 translate-y-0 scale-100"
    leave-to-class="opacity-0 translate-y-4 scale-90"
  >
    <button
      v-if="isVisible"
      class="fixed left-4 md:left-6 z-40 w-11 h-11 rounded-full bg-black/85 text-gold backdrop-blur-md border border-white/10 shadow-lg shadow-black/30 hover:bg-gold hover:text-black transition-[bottom,colors] duration-300 flex items-center justify-center cursor-pointer"
      :class="hasPlayer ? 'bottom-28' : 'bottom-5'"
      aria-label="بازگشت به بالای صفحه"
      @click="scrollToTop"
    >
      <i class="fas fa-chevron-up"></i>
    </button>
  </Transition>
</template>
