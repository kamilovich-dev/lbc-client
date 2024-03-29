import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import svgr from "vite-plugin-svgr";
import tsconfigPaths from 'vite-tsconfig-paths'

// https://vitejs.dev/config/
export default defineConfig({
  server:{
    host: true,
    port: 5173,
  },
  plugins: [
    svgr({
      include: "**/*.svg",
    }),
    react(),
    tsconfigPaths()],
})
