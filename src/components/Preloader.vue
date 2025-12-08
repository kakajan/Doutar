<script setup lang="ts">
import { ref, onMounted } from 'vue'

const isLoaded = ref(false)

onMounted(() => {
  // Hide preloader after DOM is ready
  const hidePreloader = () => {
    isLoaded.value = true
    document.body.classList.add('loaded')
  }
  
  setTimeout(hidePreloader, 300)
  
  // Safety timeout
  setTimeout(hidePreloader, 4000)
})
</script>

<template>
  <div
    id="preloader"
    :class="{ 'opacity-0 invisible': isLoaded }"
  >
    <div class="loader-wave">
      <div class="bar"></div>
      <div class="bar"></div>
      <div class="bar"></div>
      <div class="bar"></div>
      <div class="bar"></div>
    </div>
    <div class="loader-text">Miras Sahrasy</div>
  </div>
</template>
