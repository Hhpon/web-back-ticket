import router from '@/router'
import { getCookie } from './util'

const whiteList = ['/login']

router.beforeEach((to, from, next) => {
  if (getCookie()) {
    console.log(getCookie());
    if (to.path === '/login') {
      next({ path: '/' })
    } else {
      next()
    }
  } else {
    if (whiteList.indexOf(to.path) !== -1) {
      next()
    } else {
      next({ path: '/login' })
    }
  }
})