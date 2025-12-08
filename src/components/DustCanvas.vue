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
  if (!canvasRef.value) return
  width = canvasRef.value.width = window.innerWidth
  height = canvasRef.value.height = window.innerHeight
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
  
  animationId = requestAnimationFrame(animate)
}

onMounted(() => {
  if (canvasRef.value) {
    ctx = canvasRef.value.getContext('2d')
    resize()
    animate()
    window.addEventListener('resize', resize)
  }
})

onUnmounted(() => {
  if (animationId) {
    cancelAnimationFrame(animationId)
  }
  window.removeEventListener('resize', resize)
})
</script>

<template>
  <canvas
    :id="id"
    ref="canvasRef"
  ></canvas>
</template>
