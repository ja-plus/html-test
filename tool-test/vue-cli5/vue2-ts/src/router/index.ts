import Vue from 'vue';
import VueRouter, { RouteConfig } from 'vue-router';
import Vuex from '../views/Vuex/index.vue';

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: '/',
    name: 'vuex',
    component: Vuex,
  },
  {
    path: '/antdv',
    name: 'antdv',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "Antdv" */ '../views/Antdv/index.vue'),
  },
  {
    path: '/vxeTable',
    name: 'vxeTable',
    component: () => import(/*webpackChunkName: "vxeTable" */ '../views/VxeTable/index.vue'),
  },
  {
    path: '/pinia',
    name: 'pinia',
    component: () => import(/*webpackChunkName: "Pinia" */ '../views/Pinia/index.vue'),
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
