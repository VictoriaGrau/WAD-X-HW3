import Vue from 'vue'
import VueRouter from 'vue-router'
import SignupPage from '../views/SignupPage.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Signup',
    component: SignupPage
  },
  {
    path: '/signup',
    redirect: '/'
  }
]

const router = new VueRouter({
  mode: 'hash',
  routes
})

export default router