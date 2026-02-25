import { createRouter, createWebHistory } from 'vue-router'
import LoginView from '../conmponents/Login.vue'
import StartView from '../views/StartView.vue'


const routes = [
  {
    path: '/',
    name: 'start',
    component: StartView
  },
  {
    path: '/login',
    name: 'Login',
    component: LoginView
  },
  
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router
