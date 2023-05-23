import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';
import dts from 'vite-plugin-dts';

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    minify: false,
    assetsDir: '../assets',
    rollupOptions: {
      external: ['vue', 'd3-interpolate', /assets\/images\/.+\.(png|jpe?g|svg|bmp)/], // 排除三方包,排除图片
      // output: {
      //   globals: {
      //     vue: 'Vue', // umd需要
      //   },
      // },
    },
  },
  plugins: [
    vue(),
    vueJsx(),
    dts({
      outputDir: './lib',
      entryRoot: './packages',
    }),
    /**
     * 在产物js上导入css
     */
    (function () {
      return {
        name: 'auto-import-style',
        generateBundle(options, bundle) {
          // console.log('options:', options);
          // console.log('bundle:', bundle);
          (bundle['index.js'] as any).code = 'import "./style.css";\n' + (bundle['index.js'] as any).code;
        },
      };
    })(),
  ],
});
