import { createRouter, createWebHistory } from 'vue-router'
import Cookies from 'js-cookie'
import CategoriesView from '@/views/CategoriesView.vue'
import ItemsView from '@/views/ItemsView.vue'
import OrdersView from '@/views/OrdersView.vue'
import HomeView from '@/views/HomeView.vue'
import LoginView from '@/views/LoginView.vue'
import GamesView from '@/views/GamesView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/login', name: 'login', component: LoginView, },
    { path: '/', name: 'dashboard', component: HomeView, meta: { requiresAuth: true } },
    { path: '/categories', name: 'categories', component: CategoriesView, meta: { requiresAuth: true } },
    { path: '/items', name: 'items', component: ItemsView, meta: { requiresAuth: true } },
    { path: '/orders', name: 'orders', component: OrdersView, meta: { requiresAuth: true } },
    { path: '/games', name: 'games', component: GamesView, meta: { requiresAuth: true } },
  ],
})

router.beforeEach((to, from, next) => {
  const token = Cookies.get('token')
  if (to.meta.requiresAuth && !token) {
    next({ name: 'login' })
    return
  }
  if (to.name == 'login' && token) {
    next({ name: 'dashboard' })
    return
  }
  next()
})

export default router
