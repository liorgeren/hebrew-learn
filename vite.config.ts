import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig(({ command }) => ({
  // GitHub Pages project URL: https://liorgeren.github.io/hebrew-learn/
  base: command === 'build' ? '/hebrew-learn/' : '/',
  plugins: [react()],
}))
