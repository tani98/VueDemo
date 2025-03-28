import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import Login from '@/views/Login.vue'
import Admin from '@/views/Admin.vue'
import User from '@/views/User.vue'
import Vehicle from '@/views/Vehicle.vue'
import Customer from '@/views/Customer.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/login',
      name: 'login',
      component: Login,
    },
    {
      path: '/admin',
      name: 'admin',
      meta: {
        requiresAuth: true, // Add meta field to indicate protected route
      },
      component: Admin,
      children: [
        {
          path: 'user',
          name: 'user',
          component: User,
        },
        {
          path: 'vehicle',
          name: 'vehicle',
          component: Vehicle,
        },
        {
          path: 'customer',
          name: 'customer',
          component: Customer,
        },
      ],
    },
  ],
})

export default router
