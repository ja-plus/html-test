import Vue from 'vue';
import App from './App.vue';
import { DatePicker } from 'ant-design-vue';
import 'ant-design-vue/es/date-picker/style';
Vue.use(DatePicker);
import './style.css';
new Vue({
  render: h => h(App),
}).$mount('#app');
