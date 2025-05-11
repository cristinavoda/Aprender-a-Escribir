import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  plugins: [
    vue(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.ico', 'apple-touch-icon.png'],
      manifest: {
        name: 'Aprender a Escribir',
        short_name: 'Escribir',
        description: 'App para aprender a escribir y jugar',
        theme_color: '#ffffff',
        icons: [
          {
            src: '/app-icon.ico',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: '/app-icon.ico',
            sizes: '512x512',
            type: 'image/png'
          }
        ]
      }
    })
  ],
  build: {
    rollupOptions: {
      external: [],
    }
  }
})
