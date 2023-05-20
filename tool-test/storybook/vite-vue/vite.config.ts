import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    minify: false,
    lib: {
      name: 'vite-vue-component',
      entry: ['./packages/StkTable/index.ts', './packages/Button/index.ts'],
      fileName: (format, entryName) => {
        console.log(format, entryName);
        return entryName + '.' + format + '.js';
      },
      formats: ['es'],
    },
    rollupOptions: {
      external: [/node_modules/], // 忽略所有三方包
      // external: ['vue', 'd3-interpolate'],//忽略打包vue文件
      // output: {
      //   globals: {
      //     vue: 'Vue', // umd需要
      //   },
      // },
    },
  },
  plugins: [vue(), vueJsx()],
});
