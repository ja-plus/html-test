import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
// import federation from '@originjs/vite-plugin-federation';

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
  plugins: [
    vue(),
    // 模块联邦，vue slot 会报错
    // federation({
    //   // 定义远程模块入口
    //   remotes: {
    //     'storybook-vite-vue': 'http://localhost:4173/assets/remoteEntry.js',
    //   },
    //   // 共享依赖声明
    //   shared: ['vue'],
    // }),
  ],
});
