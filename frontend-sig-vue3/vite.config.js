import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vuetify from 'vite-plugin-vuetify'
import path from 'path'

export default defineConfig({
  plugins: [vue(), vuetify({ autoImport: true })],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
      'vue-echarts$': 'vue-echarts/dist/vue-echarts.esm.js'
    }
  },
  optimizeDeps: {
    include: [
      'vue-echarts',
      'echarts/core',
      'echarts/charts',
      'echarts/renderers',
      'echarts/components'
    ]
  },
  server: {
    proxy: {
      '/auth': 'http://localhost:5000',
      '/complaints': 'http://localhost:5000'
    }
  }
})
