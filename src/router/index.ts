import { createRouter, createWebHistory } from 'vue-router'
import CategoriesView from '@/views/CategoriesView.vue'
import ItemsView from '@/views/ItemsView.vue'
import OrdersView from '@/views/OrdersView.vue'
import HomeView from '@/views/HomeView.vue'
import LoginView from '@/views/LoginView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', name: 'dashboard', component: HomeView, meta: { requiresAuth: true } },
    { path: '/login', name: 'login', component: LoginView },
    { path: '/categories', name: 'categories', component: CategoriesView },
    { path: '/items', name: 'items', component: ItemsView },
    { path: '/orders', name: 'orders', component: OrdersView },
  ],
})

router.beforeEach((to, from, next) => {
  const token = ""
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
