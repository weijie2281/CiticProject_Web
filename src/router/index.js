import Vue from 'vue'
import Router from 'vue-router'

import login from '../components/login'
import AppIndex from '../components/AppIndex'
import Home from '../components/Home'
import Register from '../components/Register'
import UserBasic from '../components/admin/UserBasic'
import UserRole from '../components/admin/UserRole'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'login',
      component: login
    },
    {
      path: '/login',
      name: 'Login',
      component: login
    },
    {
      path: '/register',
      name: 'Register',
      component: Register
    },
    {
      path: '/home',
      name: 'Home',
      component: Home,
      redirect: '/admin/user/basic',
      children: [
        {
          path: '/index',
          name: 'AppIndex',
          component: AppIndex,
          meta: {
            requireAuth: true
          }
        },
      ]
    },
    {
      path: '/admin',
      name: 'admin',
      component: Home,
      children: [
        {
          path: '/admin/user/basic',
          name: 'UserBasic',
          component: UserBasic,
          meta: {
            requireAuth: true
          }
        },
        {
          path: '/admin/user/role',
          name: 'UserRole',
          component: UserRole,
          meta: {
            requireAuth: true
          }
        }
      ]
    },
  ]
})
