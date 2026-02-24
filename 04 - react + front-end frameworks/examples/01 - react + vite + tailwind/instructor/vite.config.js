import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
// 1. import the tailwindcss vite plugin
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    // 2. add it to vite runtime
    tailwindcss()
  ],
})
