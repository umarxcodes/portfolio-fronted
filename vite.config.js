import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": "/src",
    },
  },
  build: {
    target: "esnext",
    minify: "esbuild",
    sourcemap: false,
    rollupOptions: {
      output: {
        manualChunks: {
          "react-vendor": ["react", "react-dom", "react-router-dom"],
          "data-vendor": ["@tanstack/react-query", "axios"],
          "chart-vendor": ["recharts"],
        },
      },
    },
  },
  server: {
    port: 5173,
    strictPort: false,
    open: false,
    proxy: {
      // Dev-only: forward API calls to the deployed backend so the browser
      // makes same-origin requests (no CORS). Override the target with
      // VITE_DEV_PROXY_TARGET (e.g. http://localhost:5000) when running the
      // backend locally.
      "/api": {
        target: process.env.VITE_DEV_PROXY_TARGET || "https://portfolio-server-ten-ecru.vercel.app",
        changeOrigin: true,
        secure: true,
      },
    },
  },
});
