import { createRouter, createWebHistory } from 'vue-router'
import CategoriesView from '@/views/CategoriesView.vue'
import ItemsView from '@/views/ItemsView.vue'
import OrdersView from '@/views/OrdersView.vue'
import HomeView from '@/views/HomeView.vue'
import LoginView from '@/views/LoginView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', name: 'dashboard', component: HomeView },
    { path: '/login', name: 'login', component: LoginView },
    { path: '/categories', name: 'categories', component: CategoriesView },
    { path: '/items', name: 'items', component: ItemsView },
    { path: '/orders', name: 'orders', component: OrdersView },
  ],
})

export default router
