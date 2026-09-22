<script setup lang="ts">
import { useToast } from '@/composables/useToast'

const { toasts, dismiss } = useToast()

const typeIcon: Record<string, string> = {
  success: 'fa-circle-check',
  error: 'fa-circle-exclamation',
  info: 'fa-circle-info',
}

const typeColor: Record<string, string> = {
  success: 'text-emerald-600 bg-emerald-50 border-emerald-200',
  error: 'text-red-600 bg-red-50 border-red-200',
  info: 'text-neutral-700 bg-white border-black/10',
}
</script>

<template>
  <Teleport to="body">
    <div
      class="fixed bottom-24 left-1/2 -translate-x-1/2 z-[100000] flex flex-col items-center gap-2 px-4 pointer-events-none"
      dir="rtl"
      aria-live="polite"
      role="status"
    >
      <TransitionGroup name="toast">
        <div
          v-for="t in toasts"
          :key="t.id"
          class="toast-item pointer-events-auto flex items-center gap-3 px-5 py-3 rounded-full shadow-xl border backdrop-blur-xl text-sm font-bold max-w-[90vw]"
          :class="typeColor[t.type]"
        >
          <i class="fas shrink-0" :class="typeIcon[t.type]"></i>
          <span class="truncate">{{ t.message }}</span>
          <button
            class="shrink-0 w-6 h-6 flex items-center justify-center rounded-full opacity-50 hover:opacity-100 transition-opacity cursor-pointer"
            aria-label="بستن اعلان"
            @click="dismiss(t.id)"
          >
            <i class="fas fa-xmark text-xs"></i>
          </button>
        </div>
      </TransitionGroup>
    </div>
  </Teleport>
</template>
