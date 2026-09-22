import { onMounted, onUnmounted } from 'vue'
import { useAudioStore } from '@/stores/audio'

const isTypingTarget = (el: Element | null): boolean => {
  if (!el) return false
  const tag = el.tagName
  if (tag === 'INPUT' || tag === 'TEXTAREA' || tag === 'SELECT') return true
  if ((el as HTMLElement).isContentEditable) return true
  // Space on a focused button should trigger the native click, not our shortcut
  if (tag === 'BUTTON' || tag === 'A') return true
  return false
}

/**
 * Global media shortcuts: Space (play/pause), ArrowRight/Left (seek ±5s),
 * ArrowUp/Down (volume ±10%). They are ignored while typing in form fields
 * or when a button/link is focused (native behaviour wins).
 */
export function useKeyboardShortcuts() {
  const audioStore = useAudioStore()

  const handleKeydown = (e: KeyboardEvent) => {
    if (e.ctrlKey || e.metaKey || e.altKey) return
    if (isTypingTarget(document.activeElement)) return

    switch (e.key) {
      case ' ':
      case 'Spacebar': {
        e.preventDefault()
        audioStore.togglePlay()
        break
      }
      case 'ArrowRight': {
        e.preventDefault()
        const target = audioStore.currentTime + 5
        audioStore.seek((target / Math.max(audioStore.duration, 1)) * 100)
        break
      }
      case 'ArrowLeft': {
        e.preventDefault()
        const target = audioStore.currentTime - 5
        audioStore.seek((target / Math.max(audioStore.duration, 1)) * 100)
        break
      }
      case 'ArrowUp': {
        e.preventDefault()
        audioStore.setVolume(audioStore.volume + 0.1)
        break
      }
      case 'ArrowDown': {
        e.preventDefault()
        audioStore.setVolume(audioStore.volume - 0.1)
        break
      }
    }
  }

  onMounted(() => {
    window.addEventListener('keydown', handleKeydown)
  })

  onUnmounted(() => {
    window.removeEventListener('keydown', handleKeydown)
  })
}
