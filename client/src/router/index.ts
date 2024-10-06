import { createMemoryHistory, createRouter, RouteRecordRaw } from 'vue-router';

import CurrencyExchangeView from '../views/CurrencyExchangeView.vue';
import HomeView from '../views/HomeView.vue';
import NewsDetailView from '../views/NewsDetailView.vue';
import NewsView from '../views/NewsView.vue';
import Login from '../components/Login.vue';
import Register from '../components/Register.vue';

const routes: RouteRecordRaw[] = [
  { path: '/', name: 'Home', component: HomeView },
  { path: '/exchange', name: 'CurrencyExchange', component: CurrencyExchangeView },
  { path: '/news', name: 'News', component: NewsView },
  { path: '/news/:id', name: 'NewsDetial', component: NewsDetailView },
  // { path: '/login', name: 'Login', component: Login },
  // { path: '/register', name: 'Register', component: Register },

]


const router = createRouter({
  history: createMemoryHistory(),
  routes
})

export default router;