import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],

  // Only affects the production build
  build: {
    minify: 'terser', // Use terser instead of esbuild
    terserOptions: {
      compress: {
        drop_console: true,     // Remove all console.* logs
        drop_debugger: true,    // Remove debugger statements
      },
    },
  },
})
