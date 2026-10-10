import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// Build output goes to ../public/app and is served by Express.
// In dev, API calls are proxied to the Express server.
export default defineConfig({
  plugins: [react()],
  base: "/",
  build: { outDir: "../dist-client", emptyOutDir: true },
  server: {
    port: 5173,
    proxy: { "/api": "http://localhost:5001", "/images": "http://localhost:5001", "/css": "http://localhost:5001", "/css2": "http://localhost:5001" }
  }
});
