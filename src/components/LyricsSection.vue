<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue'
import { lyrics } from '@/data/tracks'

const lyricsContainer = ref<HTMLElement | null>(null)
let observer: IntersectionObserver | null = null

onMounted(() => {
  if (!lyricsContainer.value) return

  const lines = lyricsContainer.value.querySelectorAll<HTMLElement>('.lyric-line')
  if (!lines.length) return

  // Observe middle section of viewport
  observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        const el = entry.target as HTMLElement
        if (entry.isIntersecting) {
          el.classList.add('text-neutral-900', 'scale-105')
          el.classList.remove('text-neutral-500', 'scale-95')
        } else {
          el.classList.remove('text-neutral-900', 'scale-105')
          el.classList.add('text-neutral-500', 'scale-95')
        }
      })
    },
    {
      rootMargin: '-30% 0px -30% 0px',
      threshold: 0.2,
    }
  )

  lines.forEach((line) => observer?.observe(line))
})

onUnmounted(() => {
  observer?.disconnect()
  observer = null
})
</script>

<template>
  <section id="lyrics" class="py-40 relative z-10 border-t border-black/5">
    <div class="container mx-auto text-center px-4">
      <h2
        id="lyrics-title"
        class="text-neutral-600 font-body tracking-[0.35em] text-xs mb-16 md:mb-32"
      >
        برگزیده اشعار
      </h2>
      
      <div ref="lyricsContainer" id="lyrics-container" class="space-y-16">
        <p
          v-for="(line, index) in lyrics"
          :key="index"
          class="text-3xl md:text-7xl font-black font-body text-neutral-500 scale-95 lyric-line transition-all duration-500 cursor-default"
        >
          {{ line }}
        </p>
      </div>
    </div>
  </section>
</template>
