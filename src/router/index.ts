import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import { PAGE_CONVERT, PAGE_HOME } from '@/constants/routes';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: PAGE_HOME,
      component: HomeView,
    },
    {
      path: '/' + PAGE_CONVERT,
      name: PAGE_CONVERT,
      component: () => import('../views/ConvertView.vue'),
    },
  ],
});

export default router;
