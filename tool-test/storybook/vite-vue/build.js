import { build } from 'vite';
import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';
import path from 'path';
import { fileURLToPath } from 'url';
// const __dirname = fileURLToPath(new URL('.', import.meta.url));
build({
  // root: path.resolve(__dirname, './project'),
  build: {
    minify: false,
    lib: {
      name: 'vite-vue-component',
      entry: ['./packages/StkTable/index.ts'],
      // fileName: 'stkTable.js',
      formats: ['es'],
    },
    rollupOptions: {
      external: [/node_modules/], // 忽略所有三方包
    },
  },
  plugins: [vue(), vueJsx()],
});
