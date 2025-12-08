<script setup lang="ts">
import { computed, onMounted, onUnmounted } from 'vue'
import { musicGroups } from '@/data/tracks'

// Generate Schema.org MusicAlbum structured data
const schemaData = computed(() => {
  const albums = musicGroups.map(group => {
    return {
      "@type": "MusicAlbum",
      "name": group.id === 'unity' ? 'Unity (اتحاد)' : 'CHAP! (چاپ!)',
      "byArtist": {
        "@type": "MusicGroup",
        "name": "Aytronic"
      },
      "genre": "Turkmen Folk Fusion",
      "albumProductionType": "https://schema.org/StudioAlbum",
      "numTracks": group.tracks.length,
      "image": "https://doutar.ir/assets/img/music-cover.webp",
      "datePublished": "2025-12-04",
      "description": "A modern epic retelling of Magtymguly Pyragy's poems utilizing Dutar and electronic synthesis.",
      "track": group.tracks.map(track => ({
        "@type": "MusicRecording",
        "name": track.title,
        "url": track.file
      }))
    }
  })

  return {
    "@context": "https://schema.org",
    "@graph": albums
  }
})

let scriptElement: HTMLScriptElement | null = null

onMounted(() => {
  // Create and inject the JSON-LD script
  try {
    scriptElement = document.createElement('script')
    scriptElement.type = 'application/ld+json'
    scriptElement.textContent = JSON.stringify(schemaData.value)
    document.head.appendChild(scriptElement)
    console.log('Schema.org JSON-LD injected successfully')
  } catch (e) {
    console.error('Error injecting Schema.org JSON-LD:', e)
  }
})

onUnmounted(() => {
  // Clean up when component is destroyed
  if (scriptElement && scriptElement.parentNode) {
    scriptElement.parentNode.removeChild(scriptElement)
  }
})
</script>

<template>
  <!-- This component doesn't render anything visible -->
</template>
