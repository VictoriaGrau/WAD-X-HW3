import Vue from 'vue'
import VueRouter from 'vue-router'

import MainPage from '../views/MainPage.vue'
import SignupPage from '../views/SignupPage.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Main',
    component: MainPage
  },
  {
    path: '/signup',
    name: 'Signup',
    component: SignupPage
  }
]

const router = new VueRouter({
  mode: 'hash',
  routes
})

export default router