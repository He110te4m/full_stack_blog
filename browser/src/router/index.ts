import Vue from 'vue';
import VueRouter, { RouteConfig } from 'vue-router';

Vue.use(VueRouter);

const routes: RouteConfig[] = [
  {
    name: 'index',
    path: '/',
    redirect: '/home',
    component: () => import(/* webpackChunkName: "home" */ '@/views/index.vue'),
    children: [
      {
        name: 'home',
        path: '/home',
        component: () => import(/* webpackChunkName: "home" */ '@/views/home.vue')
      }, {
        name: 'article',
        path: '/article',
        component: () => import(/* webpackChunkName: "home" */ '@/views/article.vue')
      }
    ]
  }
];

const router: VueRouter = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  scrollBehavior: () => ({
    x: 0,
    y: 0
  }),
  routes
});

export default router;
