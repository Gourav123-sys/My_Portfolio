import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { resolve } from "path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],

  // Build optimizations
  build: {
    target: "es2015",
    outDir: "dist",
    assetsDir: "assets",
    sourcemap: false,
    minify: "esbuild",
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ["react", "react-dom"],
          framer: ["framer-motion"],
          charts: ["chart.js", "react-chartjs-2"],
          icons: ["lucide-react"],
          utils: ["react-hot-toast", "react-intersection-observer"],
        },
        chunkFileNames: "assets/js/[name]-[hash].js",
        entryFileNames: "assets/js/[name]-[hash].js",
        assetFileNames: (assetInfo) => {
          const info = assetInfo.name.split(".");
          const ext = info[info.length - 1];
          if (/png|jpe?g|svg|gif|tiff|bmp|ico/i.test(ext)) {
            return `assets/images/[name]-[hash].${ext}`;
          }
          if (/css/i.test(ext)) {
            return `assets/css/[name]-[hash].${ext}`;
          }
          return `assets/[name]-[hash].${ext}`;
        },
      },
    },
  },

  // Dependency optimization
  optimizeDeps: {
    include: [
      "react",
      "react-dom",
      "framer-motion",
      "lucide-react",
      "react-hot-toast",
      "react-intersection-observer",
    ],
    exclude: [],
  },

  // Development server
  server: {
    port: 3000,
    host: true,
    open: true,
    cors: true,
  },

  // Preview server
  preview: {
    port: 4173,
    host: true,
    open: true,
  },

  // Resolve aliases
  resolve: {
    alias: {
      "@": resolve(__dirname, "src"),
      "@components": resolve(__dirname, "src/components"),
      "@assets": resolve(__dirname, "src/assets"),
    },
  },

  // CSS configuration
  css: {
    postcss: "./postcss.config.cjs",
  },

  // Environment variables
  define: {
    __APP_VERSION__: JSON.stringify(process.env.npm_package_version),
  },

  // Performance optimizations
  esbuild: {
    drop: ["console", "debugger"],
  },
});
