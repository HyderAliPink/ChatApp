import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react'; // Your framework plugin
import tailwindcss from '@tailwindcss/vite'; // The correct import

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(), // Now this is correctly defined
  ],
   build: {
    minify: false},
    base: "/"
});