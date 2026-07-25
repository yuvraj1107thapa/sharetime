/// <reference types="vitest/config" />
import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  css: {
    preprocessorOptions: {
      scss: {
        // Bulma 0.9 still uses @import and global built-ins
        quietDeps: true,
        silenceDeprecations: ['import', 'global-builtin', 'legacy-js-api', 'if-function', 'color-functions', 'slash-div']
      }
    }
  },
  server: {
    port: 3000
  },
  test: {
    globals: true,
    include: ['test/**/*.{test,spec}.{ts,tsx}']
  }
})
