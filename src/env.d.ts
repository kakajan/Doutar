/// <reference types="vite/client" />

declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  const component: DefineComponent<{}, {}, any>
  export default component
}

declare module 'audiomotion-analyzer' {
  export default class AudioMotionAnalyzer {
    constructor(container: HTMLElement, options?: any)
    audioCtx: AudioContext
    connectInput(source: MediaElementAudioSourceNode): void
    disconnectInput(): void
    getEnergy(band?: string): number
    getBars(): Array<{ value: number }>
    registerGradient(name: string, options: any): void
    setOptions(options: any): void
  }
}
