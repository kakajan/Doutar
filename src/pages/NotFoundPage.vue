<script setup lang="ts">
</script>

<template>
  <section class="min-h-screen flex flex-col items-center justify-center px-6 text-center relative z-10">
    <h1 class="text-4xl md:text-6xl font-black font-body text-neutral-900 mb-4">
      صفحه پیدا نشد (۴۰۴)
    </h1>
    <p class="text-neutral-600 max-w-md leading-relaxed mb-10 text-base font-normal">
      این نشانی در سایت دوتار وجود ندارد. می‌توانید به صفحهٔ اصلی آلبوم میراث صحرا بازگردید و آهنگ‌های ترکمنی را بشنوید.
    </p>
    <router-link
      to="/"
      class="inline-flex items-center gap-3 px-8 py-4 bg-black text-white rounded-full font-bold text-sm tracking-widest uppercase hover:bg-gold hover:text-black transition-all duration-300"
    >
      <i class="fas fa-house"></i>
      بازگشت به خانه
    </router-link>
  </section>
</template>
