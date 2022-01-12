import { createApp } from 'vue';
import App from './App.vue';
import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css';
import Antdv from 'ant-design-vue';
import 'ant-design-vue/dist/antd.css';

import 'xe-utils';
import VXETable from 'vxe-table';
import 'vxe-table/lib/style.css';

createApp(App)
.use(ElementPlus)
.use(Antdv)
.use(VXETable)
.mount('#app');
