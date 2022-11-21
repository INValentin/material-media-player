import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from "vite-plugin-pwa"

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    port: 8000,
  },
  plugins: [react(), VitePWA({
    registerType: "autoUpdate",
    workbox: {
      globPatterns: ["**/*.{js,css,html,ico,png,jpeg,svg}"]
    },
    includeAssets: ["favicon-32x32.png", "favicon-16x16.png", "apple-touch-icon.png"],
    manifest: {
      name: "Audio Player",
      short_name: "Audio",
      description: "Reat PWA example using vite-plugin-pwa.",
      theme_color: "#ffffff",
      icons: [
        {
          src: "android-chrome-192x192.png",
          sizes: "192x192",
          type: "image/png",
        },
        {
          src: "android-chrome-512x512.png",
          sizes: "512x512",
          type: "image/png",
        },
      ],
    },
    devOptions: {
      enabled: false,
    },
  })]
})
