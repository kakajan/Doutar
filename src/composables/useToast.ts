import { ref } from 'vue'

export interface ToastItem {
  id: number
  message: string
  type: 'success' | 'error' | 'info'
}

// Module-level singleton state (shared across the app)
const toasts = ref<ToastItem[]>([])
let nextId = 1

function dismiss(id: number) {
  const index = toasts.value.findIndex(t => t.id === id)
  if (index !== -1) {
    toasts.value.splice(index, 1)
  }
}

function show(message: string, type: ToastItem['type'] = 'success', duration = 3200) {
  const id = nextId++
  toasts.value.push({ id, message, type })
  window.setTimeout(() => dismiss(id), duration)
  return id
}

export function useToast() {
  return {
    toasts,
    show,
    dismiss,
    success: (message: string, duration?: number) => show(message, 'success', duration),
    error: (message: string, duration?: number) => show(message, 'error', duration),
    info: (message: string, duration?: number) => show(message, 'info', duration),
  }
}
