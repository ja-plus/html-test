import { createApp } from 'vue';
import './style.css';
import App from './App.vue';
import { i18n } from './locale';
// import { createPinia } from 'pinia';

createApp(App).use(i18n).mount('#app');
