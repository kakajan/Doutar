<script setup lang="ts">
</script>

<template>
  <footer
    id="download"
    class="py-20 text-center relative z-10 bg-linear-to-t from-black/5 to-transparent"
  >
    <div class="container mx-auto flex flex-col items-center px-4 gap-6" id="footer-content">
      <!-- Download Buttons -->
      <a
        href="/assets/Unity-Aytronic.zip"
        download
        class="dust-btn relative inline-block bg-black cursor-pointer text-white font-bold py-5 px-12 text-sm tracking-widest uppercase hover:bg-gold hover:text-black transition-all duration-300 shadow-xl shadow-black/10 rounded-full"
      >
        <div class="play-btn-dust-container">
          <div class="play-btn-dust" style="left: 20%; animation-delay: 0s; --tx: -10px"></div>
          <div class="play-btn-dust" style="left: 50%; animation-delay: 0.5s; --tx: 5px"></div>
          <div class="play-btn-dust" style="left: 80%; animation-delay: 1s; --tx: -5px"></div>
          <div class="play-btn-dust" style="left: 35%; animation-delay: 0.2s; --tx: 10px"></div>
          <div class="play-btn-dust" style="left: 65%; animation-delay: 0.7s; --tx: -8px"></div>
        </div>
        <span class="relative z-10">Download Full Album (Unity)</span>
      </a>
      
      <a
        href="/assets/CHAP-Aytronic.zip"
        download
        class="dust-btn mt-3 relative inline-block bg-black cursor-pointer text-white font-bold py-5 px-12 text-sm tracking-widest uppercase hover:bg-gold hover:text-black transition-all duration-300 shadow-xl shadow-black/10 rounded-full"
      >
        <div class="play-btn-dust-container">
          <div class="play-btn-dust" style="left: 20%; animation-delay: 0s; --tx: -10px"></div>
          <div class="play-btn-dust" style="left: 50%; animation-delay: 0.5s; --tx: 5px"></div>
          <div class="play-btn-dust" style="left: 80%; animation-delay: 1s; --tx: -5px"></div>
          <div class="play-btn-dust" style="left: 35%; animation-delay: 0.2s; --tx: 10px"></div>
          <div class="play-btn-dust" style="left: 65%; animation-delay: 0.7s; --tx: -8px"></div>
        </div>
        <span class="relative z-10">Download Full Album (CHAP!)</span>
      </a>

      <!-- Social Links -->
      <div class="mt-12 flex justify-center gap-6">
        <a
          href="https://www.linkedin.com/in/usher-ir"
          target="_blank"
          class="text-neutral-400 hover:text-gold transition-colors duration-300"
          aria-label="LinkedIn profile"
        >
          <i class="fab fa-linkedin text-2xl"></i>
        </a>
        <a
          href="https://github.com/kakajan"
          target="_blank"
          class="text-neutral-400 hover:text-gold transition-colors duration-300"
          aria-label="GitHub profile"
        >
          <i class="fab fa-github text-2xl"></i>
        </a>
        <a
          href="https://www.instagram.com/usher_vocal"
          target="_blank"
          class="text-neutral-400 hover:text-gold transition-colors duration-300"
          aria-label="Instagram profile"
        >
          <i class="fab fa-instagram text-2xl"></i>
        </a>
        <a
          href="https://t.me/usher_art"
          target="_blank"
          class="text-neutral-400 hover:text-gold transition-colors duration-300"
          aria-label="Telegram channel"
        >
          <i class="fab fa-telegram text-2xl"></i>
        </a>
      </div>

      <!-- SEO Content Section -->
      <div class="mt-16 max-w-3xl mx-auto text-center text-neutral-500 text-sm leading-relaxed">
        <h3 class="text-lg font-bold text-neutral-700 mb-4">
          درباره آلبوم میراث صحرا
        </h3>
        <p class="mb-4">
          آلبوم <strong>میراث صحرا</strong> مجموعه‌ای منحصربه‌فرد از
          <strong>آهنگ‌های ترکمنی جدید</strong> است که با الهام از
          <strong>اشعار مختومقلی فراغی</strong>، شاعر نامدار ترکمن، تولید شده
          است. این آلبوم شامل ۴۴ قطعه موسیقی با کیفیت بالا (۳۲۰ kbps) است که
          تلفیقی از <strong>دوتار ترکمنی</strong>، <strong>قیجیق</strong> و
          <strong>موسیقی الکترونیک</strong> را ارائه می‌دهد.
        </p>
        <p class="mb-4">
          <strong>مختومقلی فراغی</strong> (Magtymguly Pyragy) شاعر بزرگ قرن
          هجدهم ترکمن است که اشعار او در فرهنگ ترکمن صحرا جایگاه ویژه‌ای دارد.
          <strong>دانلود آهنگ ترکمنی</strong> با اشعار او، سفری است به قلب
          تاریخ و فرهنگ غنی ترکمن.
        </p>
        <p class="mb-4">
          برای <strong>دانلود رایگان آهنگ ترکمنی</strong> کافیست روی هر قطعه
          کلیک کنید یا کل آلبوم را یکجا دانلود نمایید.
        </p>
        <p class="text-xs text-neutral-400 mt-6 flex items-center justify-center gap-2">
          <i class="fas fa-robot"></i>
          <span>این آلبوم با کمک <strong>هوش مصنوعی</strong> در تنظیم و تولید موسیقی ساخته شده است.</span>
        </p>
      </div>

      <!-- Credits -->
      <div class="mt-12 mb-35 text-[10px] text-neutral-400 font-epic tracking-widest uppercase">
        PRODUCED BY
        <a href="https://aytronic.ir" class="hover:text-gold transition-colors">AYTRONIC</a>
        | POWERED BY
        <a href="https://x-dev.org" class="hover:text-gold transition-colors">X-DEV ACADEMY</a>
      </div>
    </div>
  </footer>
</template>
