import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],

  // Only affects the production build
  build: {
    minify: 'esbuild', // Use esbuild instead of terser (default and faster)
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
    // Set base URL for Hostinger
    base: '/',
    // Add chunk size warning limit
    chunkSizeWarningLimit: 1000,
  },

  // Development server options
  server: {
    // Enable HMR with better configuration
    hmr: {
      port: 5173,
      host: 'localhost',
      protocol: 'ws'
    },
    // Enable compression
    compress: true,
    // Enable caching
    force: false,
    // Enable source maps
    sourcemapIgnoreList: false,
    // Better history API fallback for SPA
    historyApiFallback: {
      index: '/index.html'
    },
    // Add host configuration
    host: 'localhost',
    port: 5173,
    // Add strict port checking
    strictPort: true,
    // Add open browser option
    open: false,
    // Add cors configuration
    cors: true
  },

  // Optimize dependencies
  optimizeDeps: {
    include: ['react', 'react-dom', 'react-router-dom'],
    // Exclude dependencies that don't need optimization
    exclude: [],
    // Force dependency optimization
    force: false
  },

  // Cache options
  cacheDir: '.vite_cache',

  // CSS options
  css: {
    // Enable CSS source maps in development
    devSourcemap: true,
    // PostCSS configuration
    postcss: {
      plugins: []
    }
  },

  // Define global constants
  define: {
    // Add any global constants here
    __APP_VERSION__: JSON.stringify(process.env.npm_package_version),
  },

  // Resolve options
  resolve: {
    alias: {
      // Add any path aliases here
      '@': '/src',
    }
  }
})
