import { createApp } from 'vue';
import './style.css';
import App from './App.vue';
import { createI18n } from 'vue-i18n';
// import { createPinia } from 'pinia';

createApp(App)
  .use(
    createI18n({
      legacy: false,
      locale: 'zh-CN',
      fallbackLocale: 'en',
      messages: {
        en: {
          message: {
            hello: 'hello',
            language: 'Language',
          },
        },
        'zh-CN': {
          message: {
            hello: '你好',
            language: '语言',
          },
        },
      },
    }),
  )
  .mount('#app');
