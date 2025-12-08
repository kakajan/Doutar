<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { lyrics } from '@/data/tracks'

const lyricsContainer = ref<HTMLElement | null>(null)

onMounted(async () => {
  try {
    // Dynamically import motion for scroll animations
    const { animate, scroll } = await import('motion')
    
    if (lyricsContainer.value) {
      const lines = lyricsContainer.value.querySelectorAll('.lyric-line')
      
      lines.forEach((line) => {
        scroll(
          animate(line, {
            color: ['#d4d4d4', '#1a1a1a', '#d4d4d4'],
            scale: [0.95, 1.1, 0.95],
          }),
          { target: line as Element, offset: ['start end', 'end start'] }
        )
      })
    }
  } catch (err) {
    console.error('Failed to load motion animations:', err)
  }
})
</script>

<template>
  <section class="py-40 relative z-10 border-t border-black/5">
    <div class="container mx-auto text-center px-4">
      <h3
        id="lyrics-title"
        class="text-neutral-400 font-epic tracking-[0.5em] text-xs mb-32"
      >
        LYRICS HIGHLIGHT
      </h3>
      
      <div ref="lyricsContainer" id="lyrics-container" class="space-y-16">
        <p
          v-for="(line, index) in lyrics"
          :key="index"
          class="text-3xl md:text-7xl font-black text-neutral-300 lyric-line transition-all duration-300 cursor-default"
        >
          {{ line }}
        </p>
      </div>
    </div>
  </section>
</template>
