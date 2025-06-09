import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

export default defineConfig(() => ({
  plugins: [react()],
  server: {
    proxy: {
      "/countries": "http://localhost:3001/",
    },
  },
}));
