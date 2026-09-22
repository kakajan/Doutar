import { defineStore } from 'pinia'
import { ref, computed, shallowRef } from 'vue'
import { musicGroups, type Track, type MusicGroup } from '@/data/tracks'

export const useAudioStore = defineStore('audio', () => {
  // State
  const activeGroupId = ref<string>(musicGroups[0].id)
  const currentTrackId = ref<string | null>(null)
  const currentTrackGroupId = ref<string | null>(null) // Track which album the current track belongs to
  const isPlaying = ref(false)
  const currentTime = ref(0)
  const duration = ref(0)
  const isLoading = ref(false)
  const isFullscreen = ref(false)
  const volume = ref(0.9)
  const muted = ref(false)
  const isRepeat = ref(false)
  
  // Audio element (shallow to avoid deep reactivity on DOM element)
  const audioElement = shallowRef<HTMLAudioElement | null>(null)
  
  // AudioMotion analyzer instance
  let audioMotion: any = null
  const audioSourceMap = new WeakMap<HTMLAudioElement, MediaElementAudioSourceNode>()

  // Computed
  const activeGroup = computed<MusicGroup>(() => 
    musicGroups.find(g => g.id === activeGroupId.value) || musicGroups[0]
  )
  
  const tracks = computed<Track[]>(() => activeGroup.value.tracks)
  
  // Get current track from any album
  const currentTrack = computed<Track | null>(() => {
    if (!currentTrackId.value) return null
    // Search in the current playing album
    if (currentTrackGroupId.value) {
      const group = musicGroups.find(g => g.id === currentTrackGroupId.value)
      if (group) {
        const track = group.tracks.find(t => t.id === currentTrackId.value)
        if (track) return track
      }
    }
    // Fallback: search all albums
    for (const group of musicGroups) {
      const track = group.tracks.find(t => t.id === currentTrackId.value)
      if (track) return track
    }
    return null
  })
  
  // Get current track's album
  const currentTrackGroup = computed<MusicGroup | null>(() => {
    if (!currentTrackGroupId.value) return null
    return musicGroups.find(g => g.id === currentTrackGroupId.value) || null
  })

  // Get current track/album cover image
  const currentTrackCover = computed<string>(() => {
    if (currentTrack.value?.cover) return currentTrack.value.cover
    if (currentTrackGroup.value?.cover) return currentTrackGroup.value.cover
    return activeGroup.value?.cover || '/assets/img/covers/album-unity.webp'
  })
  
  // Tracks for the currently playing album (for next/prev)
  const currentPlayingTracks = computed<Track[]>(() => {
    if (!currentTrackGroupId.value) return []
    const group = musicGroups.find(g => g.id === currentTrackGroupId.value)
    return group?.tracks || []
  })
  
  const currentTrackIndex = computed<number>(() => 
    currentTrackId.value 
      ? currentPlayingTracks.value.findIndex(t => t.id === currentTrackId.value)
      : -1
  )
  
  const hasNext = computed(() => currentTrackIndex.value < currentPlayingTracks.value.length - 1)
  const hasPrev = computed(() => currentTrackIndex.value > 0)
  
  const progress = computed(() => 
    duration.value > 0 ? (currentTime.value / duration.value) * 100 : 0
  )

  // Helpers
  function formatTime(seconds: number): string {
    if (isNaN(seconds)) return '--:--'
    const m = Math.floor(seconds / 60)
    const s = Math.floor(seconds % 60)
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`
  }

  // Find which album a track belongs to
  function findTrackGroup(trackId: string): MusicGroup | null {
    for (const group of musicGroups) {
      if (group.tracks.some(t => t.id === trackId)) {
        return group
      }
    }
    return null
  }

  // Actions
  function switchGroup(groupId: string) {
    if (groupId === activeGroupId.value) return
    
    // Stop current playback
    if (audioElement.value) {
      audioElement.value.pause()
      audioElement.value.currentTime = 0
    }
    
    isPlaying.value = false
    currentTrackId.value = null
    currentTrackGroupId.value = null
    currentTime.value = 0
    duration.value = 0
    activeGroupId.value = groupId
  }

  // Switch group without stopping playback (for navigation)
  function switchGroupWithoutStop(groupId: string) {
    if (groupId === activeGroupId.value) return
    activeGroupId.value = groupId
  }

  async function playTrack(trackId: string) {
    // Find which album this track belongs to
    const trackGroup = findTrackGroup(trackId)
    if (!trackGroup) return
    
    const track = trackGroup.tracks.find(t => t.id === trackId)
    if (!track) return

    // If clicking same track while playing, pause it
    if (currentTrackId.value === trackId && isPlaying.value) {
      pause()
      return
    }

    isLoading.value = true
    currentTrackId.value = trackId
    currentTrackGroupId.value = trackGroup.id
    currentTime.value = 0
    duration.value = 0

    try {
      // Create or reuse audio element
      if (!audioElement.value) {
        audioElement.value = new Audio()
        audioElement.value.crossOrigin = 'anonymous'
        audioElement.value.volume = muted.value ? 0 : volume.value
        
        // Setup event listeners
        audioElement.value.addEventListener('timeupdate', () => {
          currentTime.value = audioElement.value?.currentTime || 0
        })
        
        audioElement.value.addEventListener('loadedmetadata', () => {
          duration.value = audioElement.value?.duration || 0
        })
        
        audioElement.value.addEventListener('ended', () => {
          if (hasNext.value) {
            const nextTrack = currentPlayingTracks.value[currentTrackIndex.value + 1]
            playTrack(nextTrack.id)
          } else if (isRepeat.value && currentPlayingTracks.value.length > 0) {
            // Repeat: wrap back to the first track of the album
            playTrack(currentPlayingTracks.value[0].id)
          } else {
            isPlaying.value = false
            currentTime.value = 0
          }
        })
        
        audioElement.value.addEventListener('error', (e) => {
          console.error('Audio error:', e)
          isPlaying.value = false
          isLoading.value = false
        })
      }

      // Set new source if different track
      if (audioElement.value.src !== track.file) {
        audioElement.value.src = track.file
        audioElement.value.load()
      }

      await audioElement.value.play()
      isPlaying.value = true

      // Resume the analyzer's AudioContext inside the user gesture so
      // routed audio is not left in a suspended state.
      try {
        await audioMotion?.audioCtx?.resume?.()
      } catch { /* context is already running */ }

      // Connect to visualizer if available
      await connectToVisualizer()
      
    } catch (err) {
      console.error('Playback error:', err)
      isPlaying.value = false
    } finally {
      isLoading.value = false
    }
  }

  function pause() {
    audioElement.value?.pause()
    isPlaying.value = false
  }

  async function resume() {
    try {
      await audioElement.value?.play()
      isPlaying.value = true
    } catch (err) {
      console.error('Resume failed:', err)
      isPlaying.value = false
    }
  }

  function togglePlay() {
    if (isPlaying.value) {
      pause()
    } else if (currentTrackId.value) {
      resume()
    } else if (tracks.value.length > 0) {
      playTrack(tracks.value[0].id)
    }
  }

  function seek(percent: number) {
    if (audioElement.value && duration.value > 0) {
      audioElement.value.currentTime = (percent / 100) * duration.value
    }
  }

  function nextTrack() {
    if (hasNext.value) {
      const next = currentPlayingTracks.value[currentTrackIndex.value + 1]
      playTrack(next.id)
    } else if (isRepeat.value && currentPlayingTracks.value.length > 0) {
      playTrack(currentPlayingTracks.value[0].id)
    }
  }

  function prevTrack() {
    if (hasPrev.value) {
      const prev = currentPlayingTracks.value[currentTrackIndex.value - 1]
      playTrack(prev.id)
    } else if (isRepeat.value && currentPlayingTracks.value.length > 0) {
      playTrack(currentPlayingTracks.value[currentPlayingTracks.value.length - 1].id)
    }
  }

  function setVolume(value: number) {
    volume.value = Math.min(1, Math.max(0, value))
    if (audioElement.value) {
      audioElement.value.volume = muted.value ? 0 : volume.value
    }
    if (volume.value > 0 && muted.value) {
      muted.value = false
      if (audioElement.value) audioElement.value.volume = volume.value
    }
  }

  function toggleMute() {
    muted.value = !muted.value
    if (audioElement.value) {
      audioElement.value.volume = muted.value ? 0 : volume.value
    }
  }

  function toggleRepeat() {
    isRepeat.value = !isRepeat.value
  }

  function openFullscreen() {
    isFullscreen.value = true
    if (typeof window !== 'undefined') {
      const currentState = window.history.state || {}
      if (window.location.hash !== '#player') {
        window.history.pushState({ ...currentState, playerOpen: true }, '', '#player')
      }
    }
  }

  function closeFullscreen() {
    isFullscreen.value = false
    if (typeof window !== 'undefined' && window.location.hash === '#player') {
      if (window.history.state?.playerOpen) {
        window.history.back()
      } else {
        const cleanUrl = window.location.pathname + window.location.search
        window.history.replaceState(window.history.state, '', cleanUrl)
      }
    }
  }

  // Visualizer integration
  async function initAudioMotion(container: HTMLElement) {
    if (audioMotion) return audioMotion
    
    try {
      const { default: AudioMotionAnalyzer } = await import('audiomotion-analyzer')
      
      audioMotion = new AudioMotionAnalyzer(container, {
        source: undefined,
        height: container.clientHeight || 100,
        mode: 2,
        barSpace: 0.6,
        ledBars: false,
        gradient: 'classic',
        showScaleX: false,
        showScaleY: false,
        spinSpeed: 0,
        overlay: true,
        showPeaks: true,
        smoothing: 0.7,
        frequencyScale: 'log',
      })

      audioMotion.registerGradient('gold', {
        bgColor: 'transparent',
        dir: 'v',
        colorStops: [
          { pos: 0, color: 'rgba(212, 175, 55, 0.1)' },
          { pos: 0.5, color: 'rgba(212, 175, 55, 0.6)' },
          { pos: 1, color: '#fff' },
        ],
      })
      audioMotion.setOptions({ gradient: 'gold' })
      
      return audioMotion
    } catch (err) {
      console.error('Failed to load AudioMotion:', err)
      return null
    }
  }

  async function connectToVisualizer() {
    const element = audioElement.value
    if (!audioMotion || !element) return
    
    try {
      audioMotion.disconnectInput()
      
      const existing = audioSourceMap.get(element)
      const source = existing ?? audioMotion.audioCtx.createMediaElementSource(element)
      if (!existing) {
        audioSourceMap.set(element, source)
      }
      
      audioMotion.connectInput(source)
    } catch (err) {
      console.error('Visualizer connection error:', err)
    }
  }

  function getEnergy(): number {
    return audioMotion?.getEnergy() || 0
  }

  return {
    // State
    activeGroupId,
    currentTrackId,
    currentTrackGroupId,
    isPlaying,
    currentTime,
    duration,
    isLoading,
    isFullscreen,
    volume,
    muted,
    isRepeat,
    audioElement,
    
    // Computed
    activeGroup,
    tracks,
    currentTrack,
    currentTrackGroup,
    currentTrackCover,
    currentPlayingTracks,
    currentTrackIndex,
    hasNext,
    hasPrev,
    progress,
    
    // Actions
    switchGroup,
    switchGroupWithoutStop,
    playTrack,
    pause,
    resume,
    togglePlay,
    seek,
    nextTrack,
    prevTrack,
    setVolume,
    toggleMute,
    toggleRepeat,
    openFullscreen,
    closeFullscreen,
    
    // Visualizer
    initAudioMotion,
    connectToVisualizer,
    getEnergy,
    
    // Helpers
    formatTime,
  }
})
