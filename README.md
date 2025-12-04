# 🎵 Miras Sahrasy | میراث صحرا

### Interactive Music Experience / Magtymguly Pyragy Tribute

**[English]** A high-performance, single-page music portfolio designed for the "Miras Sahrasy" album by **Aytronic**. This project blends traditional Turkmen cultural elements with cutting-edge web technologies, featuring a real-time audio visualizer, dynamic track loading, and immersive animations.

**[فارسی]** یک لندینگ پیج موزیک مدرن و با پرفورمنس بالا که برای آلبوم «میراث صحرا» اثر **آی‌ترونیک** طراحی شده است. این پروژه تلفیقی از المان‌های فرهنگی ترکمن و تکنولوژی‌های وب مدرن است که شامل ویژوالایزر صوتی زنده، بارگذاری داینامیک ترک‌ها و انیمیشن‌های جذاب می‌باشد.

---

## ✨ Features (ویژگی‌ها)

* **🎧 Real-time Audio Visualizer:** Uses the Web Audio API to sync particle effects and UI elements with the music's bass frequencies.
* **🌌 Canvas Particle System:** A lightweight, custom-coded background dust effect that reacts to music intensity.
* **📱 Dynamic JSON Playlist:** Automatically generates players for 28+ tracks using a JavaScript configuration array.
* **🎨 Glassmorphism UI:** Modern, translucent card designs using Tailwind CSS backdrop filters.
* **🚀 Smooth Animations:** Powered by **Motion One** for high-performance scroll scrubbing and staggered entry effects.
* **🔍 SEO Optimized:** Includes full Open Graph, Twitter Cards, and meta tags for maximum visibility.
* **⚡ Zero Build Tooling:** Runs directly in the browser (via CDN) without complex `npm` setups.

---

## 🛠 Tech Stack (تکنولوژی‌های استفاده شده)

* **Core:** HTML5, Vanilla JavaScript (ES6+)
* **Styling:** [Tailwind CSS](https://tailwindcss.com/) (via CDN)
* **Animation:** [Motion One](https://motion.dev/)
* **Graphics:** HTML5 Canvas API
* **Audio:** Web Audio API

---

## 🚀 How to Run (راهنمای اجرا)

**Important Note:** Due to browser security policies regarding the `Web Audio API` and CORS, this project **cannot** be run by simply opening `index.html` file. You must run it on a local server.

**نکته مهم:** به دلیل قوانین امنیتی مرورگرها در مورد `Web Audio API`، این پروژه با باز کردن مستقیم فایل `index.html` کار نمی‌کند (ویژوالایزر فعال نمی‌شود). شما حتماً باید آن را روی یک سرور لوکال اجرا کنید.

### Method 1: VS Code (Recommended)

1. Install the **"Live Server"** extension in VS Code.
2. Right-click on `index.html`.
3. Select **"Open with Live Server"**.

### Method 2: Python

If you have Python installed, run this in the project folder:

```bash
# Python 3
python -m http.server 8000
