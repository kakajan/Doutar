import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import tailwindcss from '@tailwindcss/vite'
import { fileURLToPath, URL } from 'node:url'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    tailwindcss(),
    {
      name: 'inline-css',
      apply: 'build',
      transformIndexHtml: {
        enforce: 'post',
        transform(html, ctx) {
          if (!ctx.bundle) return html
          
          let newHtml = html
          for (const [fileName, bundle] of Object.entries(ctx.bundle)) {
            if (fileName.endsWith('.css') && 'source' in bundle) {
              const cssSource = bundle.source
              // Match the link tag. Vite generates href="/assets/..." or "./assets/..."
              // We construct a regex to match the href ending with the filename
              const re = new RegExp(`<link[^>]+href="[^"]*${fileName}"[^>]*>`)
              
              if (re.test(newHtml)) {
                 newHtml = newHtml.replace(re, `<style>${cssSource}</style>`)
                 // Optional: prevent the file from being written to disk
                 // delete ctx.bundle[fileName] 
              }
            }
          }
          return newHtml
        }
      }
    }
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  ssgOptions: {
    script: 'async',
    formatting: 'minify',
  },
  server: {
    host: true,
    port: 3000
  }
})
