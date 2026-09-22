# 🎵 Miras Sahrasy | میراث صحرا

### Interactive Music Experience / Magtymguly Pyragy Tribute

**[English]** A high-performance, single-page music portfolio designed for the "Miras Sahrasy" album by **Aytronic**. This project blends traditional Turkmen cultural elements with cutting-edge web technologies, featuring a real-time audio visualizer, dynamic track loading, and immersive animations.

**[فارسی]** یک لندینگ پیج موزیک مدرن و با پرفورمنس بالا که برای آلبوم «میراث صحرا» اثر **آی‌ترونیک** طراحی شده است. این پروژه تلفیقی از المان‌های فرهنگی ترکمن و تکنولوژی‌های وب مدرن است که شامل ویژوالایزر صوتی زنده، بارگذاری داینامیک ترک‌ها و انیمیشن‌های جذاب می‌باشد.

---

## ✨ Features (ویژگی‌ها)

* **🎧 Real-time Audio Visualizer:** Uses the Web Audio API and **AudioMotion Analyzer** to sync particle effects and UI elements with the music's bass frequencies.
* **🌌 Canvas Particle System:** A lightweight, custom-coded background dust effect that reacts to music intensity.
* **🎼 Dynamic Playlist:** 44 tracks managed from a typed configuration array (`src/data/tracks.ts`), with full-screen and sticky players.
* **🎨 Glassmorphism UI:** Modern, translucent card designs using Tailwind CSS backdrop filters.
* **🚀 Smooth Animations:** Powered by **Motion** for high-performance scroll scrubbing and staggered entry effects.
* **🔍 SEO Optimized:** Includes full Open Graph, Twitter Cards, and meta tags for maximum visibility.
* **⚡ Modern Build Tooling:** Vue 3 SFCs compiled with Vite, TypeScript-checked with vue-tsc.

---

## 🛠 Tech Stack (تکنولوژی‌های استفاده شده)

* **Core:** [Vue 3](https://vuejs.org/) (Composition API), [Vue Router](https://router.vuejs.org/), [Pinia](https://pinia.vuejs.org/)
* **Build:** [Vite](https://vitejs.dev/) 8, [TypeScript](https://www.typescriptlang.org/) 7 (tsgo via [typescript-native-bridge](https://www.npmjs.com/package/typescript-native-bridge)), [vue-tsc](https://github.com/vuejs/language-tools)
* **Styling:** [Tailwind CSS](https://tailwindcss.com/) 4 (`@tailwindcss/vite`)
* **Animation:** [Motion](https://motion.dev/)
* **Graphics:** HTML5 Canvas API
* **Audio:** Web Audio API, [AudioMotion Analyzer](https://audiomotion.dev/)

---

## 🚀 How to Run (راهنمای اجرا)

**Important Note:** Due to browser security policies regarding the `Web Audio API` and CORS, this project **cannot** be run by simply opening `index.html` file. You must run it on a local server.

**نکته مهم:** به دلیل قوانین امنیتی مرورگرها در مورد `Web Audio API`، این پروژه با باز کردن مستقیم فایل `index.html` کار نمی‌کند (ویژوالایزر فعال نمی‌شود). شما حتماً باید آن را روی یک سرور لوکال اجرا کنید.

### Prerequisites

* **Node.js** ≥ 22.12 (required by Vite 8)

### Commands

```bash
npm install       # install dependencies
npm run dev       # start the Vite dev server (http://localhost:3000)
npm run build     # production build to dist/
npm run preview   # preview the production build
npm run typecheck # type-check the whole project with vue-tsc
```
