import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import ProductView from '../views/ProductView.vue';
import CartView from '../views/CartView.vue';
import LoginView from '../views/LoginView.vue';

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', name: 'home', component: HomeView },
    {
      path: '/product/:id',
      name: 'product',
      component: ProductView,
      props: (route) => ({ id: String(route.params.id) })
    },
    { path: '/cart', name: 'cart', component: CartView },
    { path: '/login', name: 'login', component: LoginView },
  ],
  scrollBehavior() {
    return { top: 0 };
  },
});

export default router;