import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue2';
import antdvFix from 'vite-plugin-antdv-fix';
export default defineConfig({
  css: {
    preprocessorOptions: {
      less: {
        javascriptEnabled: true,
      },
    },
  },
  plugins: [vue(), antdvFix()],
});
