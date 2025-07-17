import { defineConfig } from "vite";
import path from "node:path";
import electron from "vite-plugin-electron/simple";
import react from "@vitejs/plugin-react";
import tsConfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  plugins: [
    react(),
    tsConfigPaths(),
    electron({
      main: {
        entry: "main.js",
      },
      preload: {
        input: path.join(__dirname, "preload.js"),
      },
      renderer: {},
    }),
  ],
  build: {
    rollupOptions: {
      external: ["systeminformation"],
    },
  },
});
