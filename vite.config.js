import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
    plugins: [react()],
    server: {
        port: 3003,
        open: true,
    },
    build: {
        // Enable minification with esbuild (default, faster than terser)
        minify: 'esbuild',
        // Disable source maps in production
        sourcemap: false,
        // Optimize chunk splitting for better caching
        rollupOptions: {
            output: {
                manualChunks: {
                    // Vendor chunk for React
                    'vendor-react': ['react', 'react-dom', 'react-router-dom'],
                    // Icons separate chunk
                    'vendor-icons': ['lucide-react'],
                },
                // Optimize asset file names with hash for cache busting
                assetFileNames: (assetInfo) => {
                    const info = assetInfo.name.split('.')
                    const ext = info[info.length - 1]
                    if (/png|jpe?g|svg|gif|tiff|bmp|ico/i.test(ext)) {
                        return `assets/images/[name]-[hash][extname]`
                    }
                    if (/woff2?|eot|ttf|otf/i.test(ext)) {
                        return `assets/fonts/[name]-[hash][extname]`
                    }
                    return `assets/[name]-[hash][extname]`
                },
                chunkFileNames: 'assets/js/[name]-[hash].js',
                entryFileNames: 'assets/js/[name]-[hash].js',
            },
        },
        // Increase chunk size warning limit
        chunkSizeWarningLimit: 1000,
        // Enable CSS code splitting
        cssCodeSplit: true,
        // Target modern browsers for smaller bundle
        target: 'es2020',
    },
    // Optimize dependencies
    optimizeDeps: {
        include: ['react', 'react-dom', 'react-router-dom', 'lucide-react'],
    },
    // Preview server config
    preview: {
        port: 3003,
    },
})
