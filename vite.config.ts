import { copyFileSync } from 'node:fs'
import { resolve } from 'node:path'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// GitHub Pages has no SPA fallback — serve index.html for unknown paths via 404.html
function spaFallback() {
  return {
    name: 'spa-github-pages-fallback',
    closeBundle() {
      const dist = resolve(__dirname, 'dist')
      copyFileSync(resolve(dist, 'index.html'), resolve(dist, '404.html'))
    },
  }
}

// https://vite.dev/config/
export default defineConfig({
  base: '/Portfolio/',
  plugins: [react(), spaFallback()],
})
