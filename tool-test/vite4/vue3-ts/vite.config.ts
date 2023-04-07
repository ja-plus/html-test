import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

// https://vitejs.dev/config/
export default defineConfig({
  css: {
    preprocessorOptions: {
      less: {
        javascriptEnabled: true,
        globalVars: {
          'border-radius-base': '4px',
        },
      },
    },
  },
  plugins: [vue()],
});
