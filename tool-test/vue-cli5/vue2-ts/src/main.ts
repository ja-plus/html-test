import Vue from 'vue';
import App from './App.vue';
import router from './router';
import VueCompositionAPI from '@vue/composition-api';
Vue.use(VueCompositionAPI);
// import store from './store';
import pinia from '@/views/Pinia/store';

Vue.config.productionTip = false;

new Vue({
  router,
  // store,
  pinia,
  render: h => h(App),
}).$mount('#app');
