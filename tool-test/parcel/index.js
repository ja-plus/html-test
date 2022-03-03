import './style.css';
import './style.less';
console.log('hello world');
import Vue from 'vue';
import App from './App.vue';

new Vue({
  el: '#vue-app',
  render: (h) => h(App),
});
