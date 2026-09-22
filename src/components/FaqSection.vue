<script setup lang="ts">
import { faqs } from '@/data/seo'
</script>

<template>
  <section id="faq" class="py-24 md:py-32 relative z-10 border-t border-black/5">
    <div class="container mx-auto px-6 max-w-3xl">
      <header class="text-center mb-14">
        <h2 class="text-3xl md:text-4xl font-bold font-body text-neutral-900">پرسش‌های رایج</h2>
        <p class="text-neutral-600 text-sm mt-3 font-normal max-w-lg mx-auto">
          پاسخ به سوالات متداول دربارهٔ آلبوم میراث صحرا، دانلود رایگان و اشعار مختومقلی فراغی
        </p>
      </header>

      <div class="space-y-3">
        <details
          v-for="(item, index) in faqs"
          :key="item.question"
          class="faq-item group rounded-2xl bg-white/70 border border-black/5 backdrop-blur-sm open:bg-white open:shadow-lg open:border-gold/20 transition-all"
          :open="index === 0"
        >
          <summary
            class="flex items-center justify-between gap-4 cursor-pointer list-none px-5 py-4 text-right font-bold text-neutral-800"
          >
            <span>{{ item.question }}</span>
            <i class="fas fa-chevron-down text-xs text-gold shrink-0 transition-transform duration-300 group-open:rotate-180"></i>
          </summary>
          <p class="px-5 pb-5 text-sm leading-8 text-neutral-600 font-light">
            {{ item.answer }}
          </p>
        </details>
      </div>
    </div>
  </section>
</template>
