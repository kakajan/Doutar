<script setup lang="ts">
</script>

<template>
  <footer
    id="download"
    class="py-20 text-center relative z-10 bg-linear-to-t from-black/5 to-transparent border-t border-black/5"
  >
    <div class="container mx-auto flex flex-col items-center px-4 gap-6" id="footer-content">
      <!-- Download Section Title -->
      <div class="mb-4">
        <h2 class="text-2xl md:text-3xl font-bold font-body text-neutral-900 mb-2">
          دانلود کامل آلبوم‌ها
        </h2>
        <p class="text-neutral-600 text-sm font-normal">
          دانلود مستقیم تمامی قطعات با کیفیت استودیویی ۳۲۰ در قالب فایل فشرده
        </p>
      </div>

      <!-- Download Buttons -->
      <div class="flex flex-col sm:flex-row flex-wrap justify-center items-center gap-4">
        <a
          href="/assets/Unity-Aytronic.zip"
          download
          class="inline-flex items-center gap-3 bg-neutral-900 cursor-pointer text-white font-bold py-4 px-8 text-sm tracking-wider uppercase hover:bg-gold hover:text-neutral-950 transition-all duration-300 shadow-md hover:shadow-xl hover:-translate-y-0.5 active:scale-95 rounded-full"
        >
          <i class="fas fa-download text-gold"></i>
          <span>دانلود آلبوم اتحاد (Unity)</span>
        </a>
        
        <a
          href="/assets/CHAP-Aytronic.zip"
          download
          class="inline-flex items-center gap-3 bg-neutral-900 cursor-pointer text-white font-bold py-4 px-8 text-sm tracking-wider uppercase hover:bg-gold hover:text-neutral-950 transition-all duration-300 shadow-md hover:shadow-xl hover:-translate-y-0.5 active:scale-95 rounded-full"
        >
          <i class="fas fa-download text-gold"></i>
          <span>دانلود آلبوم چاپ! (CHAP!)</span>
        </a>

        <a
          href="/assets/Ayrildim-Aytronic.zip"
          download
          class="inline-flex items-center gap-3 bg-neutral-900 cursor-pointer text-white font-bold py-4 px-8 text-sm tracking-wider uppercase hover:bg-gold hover:text-neutral-950 transition-all duration-300 shadow-md hover:shadow-xl hover:-translate-y-0.5 active:scale-95 rounded-full"
        >
          <i class="fas fa-download text-gold"></i>
          <span>دانلود آلبوم جدا ماندم (Ayrildim)</span>
        </a>
      </div>

      <!-- Social Links -->
      <div class="mt-8 flex justify-center gap-6">
        <a
          href="https://www.linkedin.com/in/usher-ir"
          target="_blank"
          rel="noopener noreferrer"
          class="text-neutral-600 hover:text-dark-gold transition-colors duration-300 p-2"
          aria-label="پروفایل لینکدین"
        >
          <i class="fab fa-linkedin text-2xl"></i>
        </a>
        <a
          href="https://github.com/kakajan"
          target="_blank"
          rel="noopener noreferrer"
          class="text-neutral-600 hover:text-dark-gold transition-colors duration-300 p-2"
          aria-label="پروفایل گیت‌هاب"
        >
          <i class="fab fa-github text-2xl"></i>
        </a>
        <a
          href="https://www.instagram.com/usher_vocal"
          target="_blank"
          rel="noopener noreferrer"
          class="text-neutral-600 hover:text-dark-gold transition-colors duration-300 p-2"
          aria-label="صفحه اینستاگرام"
        >
          <i class="fab fa-instagram text-2xl"></i>
        </a>
        <a
          href="https://t.me/usherArt"
          target="_blank"
          rel="noopener noreferrer"
          class="text-neutral-600 hover:text-dark-gold transition-colors duration-300 p-2"
          aria-label="کانال تلگرام"
        >
          <i class="fab fa-telegram text-2xl"></i>
        </a>
      </div>

      <!-- SEO Content Section -->
      <div class="mt-12 max-w-3xl mx-auto text-center text-neutral-600 text-sm leading-relaxed">
        <h3 class="text-base font-bold text-neutral-800 mb-3">
          درباره پروژه موسیقی میراث صحرا
        </h3>
        <p class="mb-3">
          مجموعه <strong>میراث صحرا</strong> گزیده‌ای منحصربه‌فرد از
          <strong>آهنگ‌های ترکمنی جدید</strong> است که با الهام از
          <strong>اشعار مختومقلی فراغی</strong>، شاعر نامدار ترکمن، تولید شده
          است. این مجموعه در قالب آلبوم‌های «اتحاد»، «چاپ!» و اثر ویژه «جدا ماندم» شامل ۵۸ قطعه با کیفیت استودیویی (۳۲۰ kbps) است که
          تلفیقی از نوای <strong>دوتار ترکمنی</strong>، <strong>قیجیق</strong>، نغمه‌های سوزناک در وصف <strong>مادر</strong> و <strong>دلتنگی و جدایی از مادر</strong> و
          تنظیم‌های <strong>مدرن و الکترونیک</strong> را ارائه می‌دهد.
        </p>
        <p class="mb-3">
          <strong>مختومقلی فراغی</strong> (Magtymguly Pyragy) شاعر و اندیشمند نامدار قرن هجدهم
          ترکمن است که آثار او از جمله سروده‌های پرشور در ستایش ایل و سروده‌های غمگین در فراق مادرش (اورازگل)، شناسنامه هویت و ادبیات ترکمن‌صحراست.
        </p>
        <p class="text-xs text-neutral-500 mt-4 flex items-center justify-center gap-2">
          <i class="fas fa-compact-disc text-gold"></i>
          <span>تمامی ۵۸ قطعه برای شنیدن آنلاین و دانلود رایگان در دسترس علاقه‌مندان قرار دارد.</span>
        </p>
      </div>

      <!-- Credits -->
      <div class="mt-8 mb-12 text-xs text-neutral-500 font-epic tracking-widest uppercase">
        PRODUCED BY
        <a href="https://aytronic.ir" class="hover:text-dark-gold font-bold transition-colors">AYTRONIC</a>
        | POWERED BY
        <a href="https://x-dev.org" class="hover:text-dark-gold font-bold transition-colors">X-DEV ACADEMY</a>
      </div>
    </div>
  </footer>
</template>
