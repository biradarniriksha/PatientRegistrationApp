// import { defineConfig } from 'vite'
// import vue from '@vitejs/plugin-vue'

// // https://vite.dev/config/
// export default defineConfig({
//   plugins: [vue()],
//   optimizeDeps: {
//     exclude: ['@electric-sql/pglite']
//   },
//   build: {
//     rollupOptions: {
//       external: ['@electric-sql/pglite']
//     }
//   },
//   server: {
//     headers: {
//       'Cross-Origin-Opener-Policy': 'same-origin',
//       'Cross-Origin-Embedder-Policy': 'require-corp'
//     }
//   }
// })
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
// import basicSsl from '@vitejs/plugin-basic-ssl'
export default defineConfig({
  plugins: [vue()],
  //plugins: [vue(), basicSsl()],
  optimizeDeps: {
    exclude: ['@electric-sql/pglite']
  },
  server: {
    headers: {
      'Cross-Origin-Opener-Policy': 'same-origin',
      'Cross-Origin-Embedder-Policy': 'require-corp',
      'Cross-Origin-Resource-Policy': 'cross-origin'
    }
  }
})