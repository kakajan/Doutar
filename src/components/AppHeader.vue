<script setup lang="ts">
import { ref, computed, watch, onMounted, onUnmounted, nextTick } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { lockBody, unlockBody } from '@/composables/useBodyScrollLock'

const route = useRoute()
const router = useRouter()

const isScrolled = ref(false)
const isVisible = ref(true)
const isHidden = ref(false)
const menuOpen = ref(false)
const progress = ref(0)
const activeSection = ref('')

let lastScrollY = 0
let scrollRafId: number | null = null
let cachedDocHeight = 0
let sectionOffsets: { id: string; top: number }[] = []

interface NavLink {
  key: string
  label: string
  target: string
}

const navLinks: NavLink[] = [
  { key: 'home', label: 'خانه', target: '' },
  { key: 'albums', label: 'آلبوم‌ها', target: 'albums' },
  { key: 'lyrics', label: 'اشعار', target: 'lyrics' },
  { key: 'download', label: 'دانلود', target: 'download' },
]

const sectionIds = ['albums', 'lyrics', 'download']

function updateOffsets() {
  cachedDocHeight = Math.max(1, document.documentElement.scrollHeight - window.innerHeight)
  sectionOffsets = sectionIds.map((id) => {
    const el = document.getElementById(id)
    return { id, top: el ? el.offsetTop : 0 }
  })
}

function handleScroll() {
  if (typeof document !== 'undefined' && document.body.classList.contains('is-scroll-locked')) return
  if (scrollRafId !== null) return
  scrollRafId = requestAnimationFrame(() => {
    scrollRafId = null
    const y = window.scrollY
    isScrolled.value = y > 20

    if (cachedDocHeight > 0) {
      progress.value = Math.min(100, (y / cachedDocHeight) * 100)
    }

    if (y > lastScrollY && y > 140 && !menuOpen.value) {
      isHidden.value = true
    } else {
      isHidden.value = false
    }
    lastScrollY = y

    if (route.path !== '/') {
      activeSection.value = route.hash.replace('#', '')
      return
    }

    let current = ''
    for (const item of sectionOffsets) {
      if (item.top - 140 <= y) {
        current = item.id
      }
    }
    activeSection.value = current
  })
}

function isLinkActive(link: NavLink): boolean {
  if (link.key === 'home') return route.path === '/' && activeSection.value === ''
  return activeSection.value === link.target
}

function closeMenu() {
  if (!menuOpen.value) return
  menuOpen.value = false
}

function toggleMenu() {
  menuOpen.value = !menuOpen.value
}

watch(menuOpen, (open) => {
  if (open) lockBody()
  else unlockBody()
})

watch(
  () => route.fullPath,
  () => {
    closeMenu()
  },
)

function scrollToId(id: string) {
  const el = document.getElementById(id)
  if (!el) return false
  el.scrollIntoView({ behavior: 'smooth', block: 'start' })
  return true
}

async function goToSection(link: NavLink) {
  closeMenu()
  await nextTick()

  if (link.key === 'home') {
    if (route.path !== '/') {
      await router.push({ path: '/' })
    } else if (route.hash) {
      await router.replace({ path: '/', hash: '' })
    }
    window.scrollTo({ top: 0, behavior: 'smooth' })
    return
  }

  const hash = `#${link.target}`
  if (route.path === '/' && route.hash === hash) {
    scrollToId(link.target)
    return
  }

  await router.push({ path: '/', hash })
}

function goToDownload() {
  goToSection(navLinks[navLinks.length - 1])
}

function handleKeydown(e: KeyboardEvent) {
  if (e.key === 'Escape' && menuOpen.value) {
    e.preventDefault()
    closeMenu()
  }
}

onMounted(() => {
  updateOffsets()
  window.addEventListener('scroll', handleScroll, { passive: true })
  window.addEventListener('resize', updateOffsets, { passive: true })
  document.addEventListener('keydown', handleKeydown)
  handleScroll()
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
  window.removeEventListener('resize', updateOffsets)
  document.removeEventListener('keydown', handleKeydown)
  if (scrollRafId !== null) cancelAnimationFrame(scrollRafId)
  if (menuOpen.value) closeMenu()
})

const headerClass = computed(() => [
  isScrolled.value || menuOpen.value ? 'bg-white/90 backdrop-blur-md shadow-sm py-3' : 'py-5',
  isVisible.value ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-5',
  isHidden.value && !menuOpen.value ? '-translate-y-full' : 'translate-y-0',
])
</script>

<template>
  <nav
    id="navbar"
    class="fixed top-0 w-full z-50 px-6 md:px-8 transition-all duration-300 ease-in-out"
    :class="headerClass"
    aria-label="ناوبری اصلی"
  >
    <div
      class="absolute top-0 right-0 h-0.5 bg-linear-to-l from-gold to-dark-gold shadow-[0_0_8px_rgba(212,175,55,0.6)] transition-[width] duration-100"
      :style="{ width: progress + '%' }"
      aria-hidden="true"
    ></div>

    <div class="container mx-auto max-w-6xl flex justify-between items-center">
      <div class="text-xl font-bold font-body text-black/90">
        <router-link to="/" class="flex items-center gap-2" @click="closeMenu">
          <i class="fas fa-wave-square text-gold text-lg"></i>
          <span>دوتار | Doutar</span>
        </router-link>
      </div>

      <div class="hidden md:flex items-center gap-8">
        <button
          v-for="link in navLinks"
          :key="link.key"
          type="button"
          class="text-sm font-bold transition-colors duration-300 relative pb-1 cursor-pointer"
          :class="isLinkActive(link) ? 'text-dark-gold' : 'text-neutral-500 hover:text-black'"
          @click="goToSection(link)"
        >
          {{ link.label }}
          <span
            class="absolute bottom-0 right-0 h-0.5 bg-gold rounded-full transition-all duration-300"
            :class="isLinkActive(link) ? 'w-full' : 'w-0'"
          ></span>
        </button>
      </div>

      <div class="flex items-center gap-3">
        <button
          type="button"
          @click="goToDownload"
          class="hidden md:inline-flex text-xs font-bold tracking-widest uppercase border border-black/10 px-6 py-2 rounded-full hover:bg-black hover:text-white hover:border-black transition-all duration-300 cursor-pointer"
        >
          دانلود
        </button>

        <button
          type="button"
          class="md:hidden w-10 h-10 flex items-center justify-center rounded-full border border-black/10 text-black cursor-pointer"
          :aria-expanded="menuOpen"
          aria-controls="mobile-nav"
          aria-label="باز و بسته کردن منو"
          @click="toggleMenu"
        >
          <i class="fas text-lg" :class="menuOpen ? 'fa-xmark' : 'fa-bars'"></i>
        </button>
      </div>
    </div>

    <Transition
      enter-active-class="transition-all duration-300 ease-out"
      enter-from-class="opacity-0 -translate-y-3"
      enter-to-class="opacity-100 translate-y-0"
      leave-active-class="transition-all duration-200 ease-in"
      leave-from-class="opacity-100 translate-y-0"
      leave-to-class="opacity-0 -translate-y-3"
    >
      <div
        v-if="menuOpen"
        id="mobile-nav"
        class="md:hidden mt-3 bg-white/95 backdrop-blur-xl rounded-2xl shadow-xl border border-black/5 overflow-hidden relative z-20"
      >
        <button
          v-for="(link, i) in navLinks"
          :key="link.key"
          type="button"
          class="w-full flex items-center justify-between px-6 py-4 text-sm font-bold transition-colors cursor-pointer"
          :class="isLinkActive(link) ? 'text-dark-gold bg-gold/5' : 'text-neutral-600 hover:bg-black/5'"
          :style="{ transitionDelay: i * 30 + 'ms' }"
          @click="goToSection(link)"
        >
          <span>{{ link.label }}</span>
          <i class="fas fa-chevron-left text-xs opacity-40"></i>
        </button>
      </div>
    </Transition>
  </nav>

  <Teleport to="body">
    <Transition
      enter-active-class="transition-opacity duration-300"
      enter-from-class="opacity-0"
      enter-to-class="opacity-100"
      leave-active-class="transition-opacity duration-200"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0"
    >
      <div
        v-if="menuOpen"
        class="fixed inset-0 z-40 bg-black/35 backdrop-blur-sm md:hidden"
        aria-hidden="true"
        @click="closeMenu"
      ></div>
    </Transition>
  </Teleport>
</template>
