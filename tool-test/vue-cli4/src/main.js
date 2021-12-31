import Vue from 'vue'
import App from './App.vue'

Vue.config.productionTip = false
/* eslint-disable no-undef */
// window.VERSION = VERSION;
new Vue({
  render: h => h(App),
}).$mount('#app')
