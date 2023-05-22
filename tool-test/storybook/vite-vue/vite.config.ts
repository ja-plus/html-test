import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    minify: false,
    rollupOptions: {
      external: ['vue', 'd3-interpolate'], // 排除三方包
      // output: {
      //   globals: {
      //     vue: 'Vue', // umd需要
      //   },
      // },
    },
  },
  plugins: [vue(), vueJsx()],
});
