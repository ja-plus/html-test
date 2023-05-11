import svelte from 'rollup-plugin-svelte';
import resolve from '@rollup/plugin-node-resolve';
import less from 'rollup-plugin-less';
export default {
  input: {
    Dialog: './src/Dialog.svelte',
  },
  output: [
    {
      dir: 'lib',
    },
  ],
  plugins: [
    svelte(),
    resolve({
      browser: true,
      exportConditions: ['svelte'], // 要打包的模块
      extensions: ['.svelte'],
    }),
    less({
      //If you specify true, the plugin will insert compiled CSS into <head/> tag.
      insert: true,
    }),
  ],
};
