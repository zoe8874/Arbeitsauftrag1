import { createRouter, createWebHistory } from 'vue-router'
import LoginView from '../views/Login.vue'
import StartView from '../views/StartView.vue'
import RegisterView from '../views/Regristriren.vue'
import ProduktView from '../views/Produkt.vue'


const routes = [
  {
    path: '/',
    name: 'Start',
    component: StartView
  },
  {
    path: '/login',
    name: 'Login',
    component: LoginView
  },
  {
    path: '/register',
    name: 'Register',
    component: RegisterView
  },
  {
    path: '/produkt',
    name: 'Produkt',
    component: ProduktView
  }

]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router
