import { createWebHistory, createRouter, RouteRecordRaw } from 'vue-router';

import CurrencyExchangeView from '../views/CurrencyExchangeView.vue';
import HomeView from '../views/HomeView.vue';
import NewsDetailView from '../views/NewsDetailView.vue';
import NewsView from '../views/NewsView.vue';
import Login from '../components/Login.vue';
import Register from '../components/Register.vue';

const routes: RouteRecordRaw[] = [
  { path: '/', name: 'home', component: HomeView },
  { path: '/exchange', name: 'currencyExchange', component: CurrencyExchangeView },
  { path: '/news', name: 'news', component: NewsView },
  { path: '/news/:id', name: 'newsDetial', component: NewsDetailView },
  // { path: '/login', name: 'login', component: Login },
  // { path: '/register', name: 'register', component: Register },

]


const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router;