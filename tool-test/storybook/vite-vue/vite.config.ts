import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    minify: false,
    rollupOptions: {
      external: [/node_modules/], // 忽略所有三方包
      // output: {
      //   globals: {
      //     vue: 'Vue', // umd需要
      //   },
      // },
    },
  },
  plugins: [vue(), vueJsx()],
});
