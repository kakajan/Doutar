<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

const isScrolled = ref(false)
const isVisible = ref(false)

function handleScroll() {
  isScrolled.value = window.scrollY > 20
}

function goToDownload() {
  const el = document.getElementById('download')
  if (el) {
    el.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
  
  // Reveal after animation delay
  setTimeout(() => {
    isVisible.value = true
  }, 100)
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>

<template>
  <nav
    id="navbar"
    class="fixed top-0 w-full z-50 px-8 flex justify-between items-center transition-all duration-300 ease-in-out"
    :class="[
      isScrolled ? 'bg-white/80 backdrop-blur-md shadow-sm py-4' : 'py-6',
      isVisible ? 'opacity-100' : 'opacity-0 -translate-y-5'
    ]"
  >
    <div class="text-xl font-bold font-body text-black/90">
      <router-link to="/">دوتار | Doutar</router-link>
    </div>
    <button
      @click="goToDownload"
      class="text-xs font-bold tracking-widest uppercase border border-black/10 px-6 py-2 rounded-full hover:bg-black hover:text-white transition-all duration-300 cursor-pointer"
    >
      دانلود
    </button>
  </nav>
</template>
