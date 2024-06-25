// vite.config.js
import { defineConfig } from "vite";
import preact from "@preact/preset-vite";

export default defineConfig({
  plugins: [preact()],
  define: {
    "import.meta.env": JSON.stringify(process.env), // Pass environment variables to Vite
  },
  server: {
    port: 8080,
  },
});
