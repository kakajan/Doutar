<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

const props = withDefaults(defineProps<{
  id?: string
  particleCount?: number
}>(), {
  id: 'dust-canvas',
  particleCount: 40
})

const canvasRef = ref<HTMLCanvasElement | null>(null)
let ctx: CanvasRenderingContext2D | null = null
let particles: Particle[] = []
let animationId: number | null = null
let isPageVisible = true
let width = 0
let height = 0

interface Particle {
  x: number
  y: number
  size: number
  speedY: number
  opacity: number
  life: number
  color: string
}

function createParticle(): Particle {
  return {
    x: Math.random() * width,
    y: Math.random() * height,
    size: Math.random() * 2,
    speedY: Math.random() * -0.5 - 0.1,
    opacity: Math.random() * 0.4,
    life: Math.random() * 100 + 50,
    color: Math.random() > 0.5 ? '212, 175, 55' : '100, 100, 100',
  }
}

function resetParticle(p: Particle) {
  p.x = Math.random() * width
  p.y = Math.random() * height
  p.size = Math.random() * 2
  p.speedY = Math.random() * -0.5 - 0.1
  p.opacity = Math.random() * 0.4
  p.life = Math.random() * 100 + 50
  p.color = Math.random() > 0.5 ? '212, 175, 55' : '100, 100, 100'
}

function initParticles() {
  particles = []
  // Reduce on mobile
  const count = window.innerWidth < 768 
    ? Math.floor(props.particleCount / 2) 
    : props.particleCount
    
  for (let i = 0; i < count; i++) {
    particles.push(createParticle())
  }
}

function resize() {
  if (!canvasRef.value || !ctx) return
  // Scale the backing store by devicePixelRatio for crisp rendering,
  // while keeping particle math in CSS pixels.
  const dpr = window.devicePixelRatio || 1
  width = window.innerWidth
  height = window.innerHeight
  canvasRef.value.width = Math.floor(width * dpr)
  canvasRef.value.height = Math.floor(height * dpr)
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
  initParticles()
}

function animate() {
  if (!ctx) return
  
  ctx.clearRect(0, 0, width, height)

  particles.forEach((p) => {
    p.y += p.speedY
    p.life--
    p.opacity -= 0.002
    
    if (p.life < 0 || p.opacity <= 0) {
      resetParticle(p)
    }

    ctx!.beginPath()
    ctx!.arc(p.x, p.y, p.size, 0, Math.PI * 2)
    ctx!.fillStyle = `rgba(${p.color}, ${p.opacity})`
    ctx!.fill()
  })
  
  // Pause rendering when the tab is hidden to save CPU/battery
  if (isPageVisible) {
    animationId = requestAnimationFrame(animate)
  } else {
    animationId = null
  }
}

function handleVisibility() {
  isPageVisible = !document.hidden
  if (isPageVisible && animationId === null) {
    animate()
  }
}

let idleCallbackId: number | null = null
let startTimeoutId: number | null = null

onMounted(() => {
  if (canvasRef.value) {
    // Respect reduced motion preference
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return
    }

    ctx = canvasRef.value.getContext('2d')
    
    // Defer canvas startup to ensure initial paint is prioritized
    const startCanvas = () => {
      resize()
      animate()
      window.addEventListener('resize', resize, { passive: true })
      document.addEventListener('visibilitychange', handleVisibility)
    }

    if ('requestIdleCallback' in window) {
      idleCallbackId = (window as any).requestIdleCallback(startCanvas, { timeout: 1500 })
    } else {
      startTimeoutId = setTimeout(startCanvas, 1200) as unknown as number
    }
  }
})

onUnmounted(() => {
  if (idleCallbackId !== null && 'cancelIdleCallback' in window) {
    (window as any).cancelIdleCallback(idleCallbackId)
  }
  if (startTimeoutId !== null) {
    clearTimeout(startTimeoutId)
  }
  if (animationId) {
    cancelAnimationFrame(animationId)
    animationId = null
  }
  window.removeEventListener('resize', resize)
  document.removeEventListener('visibilitychange', handleVisibility)
})
</script>

<template>
  <canvas
    :id="id"
    ref="canvasRef"
  ></canvas>
</template>
