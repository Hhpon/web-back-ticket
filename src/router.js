import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Login from 'components/login/login'
import Admin from 'components/admin/admin'
import Addtic from 'components/addtic/addtic'
import User from 'components/user/user'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      component: Home,
      redirect: '/admin',
      children: [
        {
          path: '/admin',
          component: Admin
        },
        {
          path: '/addtic',
          component: Addtic
        },
        {
          path: '/user',
          component: User
        }
      ]
    },
    {
      path: '/login',
      component: Login
    }
  ]
})
