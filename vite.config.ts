import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // Required because the CatalystClient tries to access it
  define: {
    "process.env": {},
  },
});
