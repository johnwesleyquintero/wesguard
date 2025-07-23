// vite.config.ts
import { defineConfig } from "file:///home/project/node_modules/vite/dist/node/index.js";
import path from "node:path";
import electron from "file:///home/project/node_modules/vite-plugin-electron/dist/simple.mjs";
import react from "file:///home/project/node_modules/@vitejs/plugin-react/dist/index.js";
import tsConfigPaths from "file:///home/project/node_modules/vite-tsconfig-paths/dist/index.mjs";
var __vite_injected_original_dirname = "/home/project";
var vite_config_default = defineConfig({
  plugins: [
    react(),
    tsConfigPaths(),
    electron({
      main: {
        entry: "main.js"
        // Removed outputDir as it's not a valid option here
      },
      preload: {
        input: path.join(__vite_injected_original_dirname, "preload.cjs")
        // Removed outputDir as it's not a valid option here
      },
      renderer: {}
    })
  ],
  build: {
    rollupOptions: {
      external: ["systeminformation"],
      output: {
        manualChunks: {
          react: ["react", "react-dom"],
          vendor: ["class-variance-authority", "clsx", "tailwind-merge"]
        }
      }
    }
  }
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCIvaG9tZS9wcm9qZWN0XCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCIvaG9tZS9wcm9qZWN0L3ZpdGUuY29uZmlnLnRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9ob21lL3Byb2plY3Qvdml0ZS5jb25maWcudHNcIjtpbXBvcnQgeyBkZWZpbmVDb25maWcgfSBmcm9tICd2aXRlJztcclxuaW1wb3J0IHBhdGggZnJvbSAnbm9kZTpwYXRoJztcclxuaW1wb3J0IGVsZWN0cm9uIGZyb20gJ3ZpdGUtcGx1Z2luLWVsZWN0cm9uL3NpbXBsZSc7XHJcbmltcG9ydCByZWFjdCBmcm9tICdAdml0ZWpzL3BsdWdpbi1yZWFjdCc7XHJcbmltcG9ydCB0c0NvbmZpZ1BhdGhzIGZyb20gJ3ZpdGUtdHNjb25maWctcGF0aHMnO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgZGVmaW5lQ29uZmlnKHtcclxuICBwbHVnaW5zOiBbXHJcbiAgICByZWFjdCgpLFxyXG4gICAgdHNDb25maWdQYXRocygpLFxyXG4gICAgZWxlY3Ryb24oe1xyXG4gICAgICBtYWluOiB7XHJcbiAgICAgICAgZW50cnk6ICdtYWluLmpzJyxcclxuICAgICAgICAvLyBSZW1vdmVkIG91dHB1dERpciBhcyBpdCdzIG5vdCBhIHZhbGlkIG9wdGlvbiBoZXJlXHJcbiAgICAgIH0sXHJcbiAgICAgIHByZWxvYWQ6IHtcclxuICAgICAgICBpbnB1dDogcGF0aC5qb2luKF9fZGlybmFtZSwgJ3ByZWxvYWQuY2pzJyksXHJcbiAgICAgICAgLy8gUmVtb3ZlZCBvdXRwdXREaXIgYXMgaXQncyBub3QgYSB2YWxpZCBvcHRpb24gaGVyZVxyXG4gICAgICB9LFxyXG4gICAgICByZW5kZXJlcjoge30sXHJcbiAgICB9KSxcclxuICBdLFxyXG4gIGJ1aWxkOiB7XHJcbiAgICByb2xsdXBPcHRpb25zOiB7XHJcbiAgICAgIGV4dGVybmFsOiBbJ3N5c3RlbWluZm9ybWF0aW9uJ10sXHJcbiAgICAgIG91dHB1dDoge1xyXG4gICAgICAgIG1hbnVhbENodW5rczoge1xyXG4gICAgICAgICAgcmVhY3Q6IFsncmVhY3QnLCAncmVhY3QtZG9tJ10sXHJcbiAgICAgICAgICB2ZW5kb3I6IFsnY2xhc3MtdmFyaWFuY2UtYXV0aG9yaXR5JywgJ2Nsc3gnLCAndGFpbHdpbmQtbWVyZ2UnXSxcclxuICAgICAgICB9LFxyXG4gICAgICB9LFxyXG4gICAgfSxcclxuICB9LFxyXG59KTtcclxuIl0sCiAgIm1hcHBpbmdzIjogIjtBQUF5TixTQUFTLG9CQUFvQjtBQUN0UCxPQUFPLFVBQVU7QUFDakIsT0FBTyxjQUFjO0FBQ3JCLE9BQU8sV0FBVztBQUNsQixPQUFPLG1CQUFtQjtBQUoxQixJQUFNLG1DQUFtQztBQU16QyxJQUFPLHNCQUFRLGFBQWE7QUFBQSxFQUMxQixTQUFTO0FBQUEsSUFDUCxNQUFNO0FBQUEsSUFDTixjQUFjO0FBQUEsSUFDZCxTQUFTO0FBQUEsTUFDUCxNQUFNO0FBQUEsUUFDSixPQUFPO0FBQUE7QUFBQSxNQUVUO0FBQUEsTUFDQSxTQUFTO0FBQUEsUUFDUCxPQUFPLEtBQUssS0FBSyxrQ0FBVyxhQUFhO0FBQUE7QUFBQSxNQUUzQztBQUFBLE1BQ0EsVUFBVSxDQUFDO0FBQUEsSUFDYixDQUFDO0FBQUEsRUFDSDtBQUFBLEVBQ0EsT0FBTztBQUFBLElBQ0wsZUFBZTtBQUFBLE1BQ2IsVUFBVSxDQUFDLG1CQUFtQjtBQUFBLE1BQzlCLFFBQVE7QUFBQSxRQUNOLGNBQWM7QUFBQSxVQUNaLE9BQU8sQ0FBQyxTQUFTLFdBQVc7QUFBQSxVQUM1QixRQUFRLENBQUMsNEJBQTRCLFFBQVEsZ0JBQWdCO0FBQUEsUUFDL0Q7QUFBQSxNQUNGO0FBQUEsSUFDRjtBQUFBLEVBQ0Y7QUFDRixDQUFDOyIsCiAgIm5hbWVzIjogW10KfQo=
