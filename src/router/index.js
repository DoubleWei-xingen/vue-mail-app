import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home.vue';
import Classfiy from '../views/Classify.vue';
import Shopping from '../components/Shopping.vue';
import Search from '../views/Search.vue';

const originalPush = VueRouter.prototype.push;

VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch((err) => err);
};
const originalReplace = VueRouter.prototype.replace;
VueRouter.prototype.replace = function replace(location) {
  return originalReplace.call(this, location).catch((err) => err);
};
Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    redirect: '/home/classify',
  },
  {
    path: '/home',
    name: 'home',
    component: Home,
    children: [
      {
        path: 'classify',
        name: 'Classify',
        component: Classfiy,
      },
      {
        path: 'shopping',
        name: 'Shopping',
        component: Shopping,
      },
    ],

  },
  {
    path: '/search',
    name: 'Search',
    component: Search,
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
