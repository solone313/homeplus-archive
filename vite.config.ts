import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// GitHub Pages serves the site under `/<repo>/`, so build with that base.
// dev/preview keeps `/` so localhost URLs stay clean.
export default defineConfig(({ command }) => ({
  base: command === 'build' ? '/homeplus-archive/' : '/',
  plugins: [react(), tailwindcss()],
  server: {
    host: true,
    allowedHosts: true,
  },
}))
