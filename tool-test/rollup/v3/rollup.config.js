import svelte from 'rollup-plugin-svelte';
import resolve from '@rollup/plugin-node-resolve';
import less from 'rollup-plugin-less';
/** @type {import('rollup').RollupOptions} */
export default {
  input: {
    Dialog: './src/Dialog.svelte',
  },
  output: [
    {
      dir: 'lib',
      // entryFileNames: '[name].webc.js',
    },
  ],
  plugins: [
    svelte({
      compilerOptions: {
        customElement: true,
      },
    }),
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
