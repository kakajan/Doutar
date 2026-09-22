import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import tailwindcss from '@tailwindcss/vite'
import { fileURLToPath, URL } from 'node:url'
import { writeFileSync, mkdirSync, readFileSync, existsSync } from 'node:fs'
import { resolve } from 'node:path'
import { buildJsonLd, getPageSeo } from './src/data/seo.ts'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    tailwindcss(),
    {
      name: 'inject-jsonld',
      transformIndexHtml(html) {
        const json = JSON.stringify(buildJsonLd('/'))
        return html.replace(
          '<!--json-ld-->',
          `<script type="application/ld+json" id="seo-jsonld">${json}</script>`,
        )
      },
    },
    {
      name: 'inline-css-and-preload',
      apply: 'build',
      transformIndexHtml: {
        order: 'post',
        handler(html, ctx) {
          if (!ctx.bundle) return html
          
          let newHtml = html
          let preloadTags = ''

          for (const [fileName, bundle] of Object.entries(ctx.bundle)) {
            if (fileName.endsWith('.css') && 'source' in bundle) {
              const cssSource = bundle.source
              const re = new RegExp(`<link[^>]+href="[^"]*${fileName}"[^>]*>`)
              
              if (re.test(newHtml)) {
                 newHtml = newHtml.replace(re, `<style>${cssSource}</style>`)
                 delete ctx.bundle[fileName]
              }
            }

            // Preload hero LCP image and update pre-rendered image src
            if (fileName.includes('magtymguly') && fileName.endsWith('.webp')) {
              preloadTags += `\n    <link rel="preload" as="image" href="/${fileName}" fetchpriority="high" type="image/webp" />`
              newHtml = newHtml.replace(/\/assets\/img\/magtymguly\.webp/g, `/${fileName}`)
            }

            // Preload primary body font (Vazirmatn 400)
            if (fileName.includes('JRklWgzORc') && fileName.endsWith('.woff2')) {
              preloadTags += `\n    <link rel="preload" as="font" href="/${fileName}" type="font/woff2" crossorigin />`
            }

            // Preload hero title font (Cinzel 700)
            if (fileName.includes('jHgTYo') && fileName.endsWith('.woff2')) {
              preloadTags += `\n    <link rel="preload" as="font" href="/${fileName}" type="font/woff2" crossorigin />`
            }

            // Preload bold body font (Vazirmatn 700)
            if (fileName.includes('JRklY80ORc') && fileName.endsWith('.woff2')) {
              preloadTags += `\n    <link rel="preload" as="font" href="/${fileName}" type="font/woff2" crossorigin />`
            }
          }

          if (preloadTags) {
            newHtml = newHtml.replace('</head>', `${preloadTags}\n  </head>`)
          }

          return newHtml
        }
      }
    },
    {
      name: 'prerender-seo-routes',
      apply: 'build',
      closeBundle() {
        const distDir = resolve(fileURLToPath(new URL('.', import.meta.url)), 'dist')
        const indexHtmlPath = resolve(distDir, 'index.html')
        if (!existsSync(indexHtmlPath)) return

        const baseHtml = readFileSync(indexHtmlPath, 'utf-8')
        const routes = [
          { path: '/album/unity', albumId: 'unity' },
          { path: '/album/chap', albumId: 'chap' },
          { path: '/album/joda', albumId: 'joda' },
        ]

        for (const route of routes) {
          const page = getPageSeo(route.path, route.albumId)
          const jsonLd = JSON.stringify(buildJsonLd(route.path, route.albumId))

          let html = baseHtml
            .replace(/<title>.*?<\/title>/, `<title>${page.title}</title>`)
            .replace(
              /<meta\s+name="description"\s+content=".*?"\s*\/?>/,
              `<meta name="description" content="${page.description}" />`,
            )
            .replace(
              /<link\s+rel="canonical"\s+href=".*?"\s*\/?>/,
              `<link rel="canonical" href="${page.canonical}" />`,
            )
            .replace(
              /<link\s+rel="alternate"\s+hreflang="fa"\s+href=".*?"\s*\/?>/,
              `<link rel="alternate" hreflang="fa" href="${page.canonical}" />`,
            )
            .replace(
              /<link\s+rel="alternate"\s+hreflang="x-default"\s+href=".*?"\s*\/?>/,
              `<link rel="alternate" hreflang="x-default" href="${page.canonical}" />`,
            )
            .replace(
              /<meta\s+property="og:url"\s+content=".*?"\s*\/?>/,
              `<meta property="og:url" content="${page.canonical}" />`,
            )
            .replace(
              /<meta\s+property="og:title"\s+content=".*?"\s*\/?>/,
              `<meta property="og:title" content="${page.title}" />`,
            )
            .replace(
              /<meta\s+property="og:description"\s+content=".*?"\s*\/?>/,
              `<meta property="og:description" content="${page.description}" />`,
            )
            .replace(
              /<meta\s+property="og:image"\s+content=".*?"\s*\/?>/,
              `<meta property="og:image" content="${page.image}" />`,
            )
            .replace(
              /<meta\s+name="twitter:url"\s+content=".*?"\s*\/?>/,
              `<meta name="twitter:url" content="${page.canonical}" />`,
            )
            .replace(
              /<meta\s+name="twitter:title"\s+content=".*?"\s*\/?>/,
              `<meta name="twitter:title" content="${page.title}" />`,
            )
            .replace(
              /<meta\s+name="twitter:description"\s+content=".*?"\s*\/?>/,
              `<meta name="twitter:description" content="${page.description}" />`,
            )
            .replace(
              /<meta\s+name="twitter:image"\s+content=".*?"\s*\/?>/,
              `<meta name="twitter:image" content="${page.image}" />`,
            )
            .replace(
              /<script type="application\/ld\+json" id="seo-jsonld">.*?<\/script>/,
              `<script type="application/ld+json" id="seo-jsonld">${jsonLd}</script>`,
            )

          const targetDir = resolve(distDir, 'album', route.albumId)
          mkdirSync(targetDir, { recursive: true })
          writeFileSync(resolve(targetDir, 'index.html'), html, 'utf-8')
        }

        // Generate 404.html
        const notFoundPage = getPageSeo('/404')
        const notFoundJson = JSON.stringify(buildJsonLd('/404'))
        const notFoundHtml = baseHtml
          .replace(/<title>.*?<\/title>/, `<title>${notFoundPage.title}</title>`)
          .replace(
            /<meta\s+name="description"\s+content=".*?"\s*\/?>/,
            `<meta name="description" content="${notFoundPage.description}" />`,
          )
          .replace(
            /<meta\s+name="robots"\s+content=".*?"\s*\/?>/,
            `<meta name="robots" content="noindex, follow" />`,
          )
          .replace(
            /<script type="application\/ld\+json" id="seo-jsonld">.*?<\/script>/,
            `<script type="application/ld+json" id="seo-jsonld">${notFoundJson}</script>`,
          )

        writeFileSync(resolve(distDir, '404.html'), notFoundHtml, 'utf-8')
      },
    },
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  build: {
    target: 'es2022',
    cssMinify: true,
  },
  server: {
    host: true,
    port: 3000
  }
})
