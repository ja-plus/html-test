import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';
// import federation from '@originjs/vite-plugin-federation';

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    minify: false,
    rollupOptions: {
      external: ['vue', 'd3-interpolate' /* /assets\/images\/.+\.(png|jpe?g|svg|bmp)/ */], // 排除三方包,排除图片
      // output: {
      //   globals: {
      //     vue: 'Vue', // umd需要
      //   },
      // },
    },
    target: ['esnext'],
  },
  plugins: [
    vue(),
    vueJsx(),
    // -- federation 不支持slot vue，会报错 isCE
    // federation({
    //   name: 'storybook-vite-vue',
    //   filename: 'remoteEntry.js',
    //   // 需要暴露的模块
    //   exposes: {
    //     './Button': './packages/Button/index.ts',
    //   },
    //   shared: ['vue'],
    // }),
  ],
});
