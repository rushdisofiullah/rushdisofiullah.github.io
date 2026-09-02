import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Set base to './' for flexible deployment (GitHub Pages, Vercel, Netlify)
// For GitHub Pages with repo subpath: base: '/your-repo-name/'
export default defineConfig({
  plugins: [react()],
  base: '/',
  build: {
    outDir: 'dist',
    sourcemap: false,
  },
})