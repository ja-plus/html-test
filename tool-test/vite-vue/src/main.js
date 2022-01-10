import { createApp } from 'vue';
import App from './App.vue';
import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css';
import Antdv from 'ant-design-vue';
import 'ant-design-vue/dist/antd.css';


createApp(App)
.use(ElementPlus)
.use(Antdv)
.mount('#app');
