/// <reference types="vitest/config" />
import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      injectRegister: 'script-defer',
      manifestFilename: 'site.webmanifest',
      includeAssets: ['favicon.ico', 'apple-touch-icon.png', 'favicon-16x16.png', 'favicon-32x32.png'],
      manifest: {
        name: 'sharetime',
        short_name: 'sharetime',
        description: 'Share time in different timezones easily',
        start_url: '/',
        display: 'standalone',
        theme_color: '#0099cc',
        background_color: '#ffffff',
        icons: [
          { src: '/android-chrome-192x192.png', sizes: '192x192', type: 'image/png' },
          { src: '/android-chrome-512x512.png', sizes: '512x512', type: 'image/png' }
        ]
      },
      workbox: {
        globPatterns: ['**/*.{js,css,html,ico,png,svg,woff2}'],
        navigateFallback: '/index.html'
      }
    })
  ],
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
