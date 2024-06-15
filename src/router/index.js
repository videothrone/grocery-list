import { createRouter, createWebHistory } from 'vue-router';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('../views/HomeView.vue')
    },
    {
      path: '/grocerys-list',
      name: 'grocerys-list',
      component: () => import('../components/groceryList/GroceryList.vue')
    },
    {
      path: '/:catchAll(.*)',
      name: 'Page-404',
      component: () => import('../views/Page-404/Page-404.vue')
    }
  ]
});

export default router;
