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
    rollupOptions: {
      output: {
        // Chunk size warning limit
        manualChunks: {
          vendor: ['react', 'react-dom', 'react-router-dom'],
          // Add other large dependencies here
        },
        // Add content hash to file names for better caching
        entryFileNames: 'assets/[name].[hash].js',
        chunkFileNames: 'assets/[name].[hash].js',
        assetFileNames: 'assets/[name].[hash].[ext]'
      }
    },
    // Enable source maps for production
    sourcemap: true,
    // Enable CSS code splitting
    cssCodeSplit: true,
    // Enable assets optimization
    assetsInlineLimit: 4096, // 4kb
  },

  // Development server options
  server: {
    // Enable HMR
    hmr: true,
    // Enable compression
    compress: true,
    // Enable caching
    force: false,
    // Enable source maps
    sourcemapIgnoreList: false,
  },

  // Optimize dependencies
  optimizeDeps: {
    include: ['react', 'react-dom', 'react-router-dom'],
    // Exclude dependencies that don't need optimization
    exclude: [],
  },

  // Cache options
  cacheDir: '.vite_cache',
})
