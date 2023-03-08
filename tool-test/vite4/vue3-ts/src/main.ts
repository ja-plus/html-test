import { createApp } from 'vue';
import App from './App.vue';
import ArcoVue from '@arco-design/web-vue';
import '@arco-design/web-vue/dist/arco.css';
import './components/arco-design/ths-style.less';
createApp(App).use(ArcoVue).mount('#app');
