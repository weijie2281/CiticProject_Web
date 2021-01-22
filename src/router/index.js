import Vue from 'vue'
import Router from 'vue-router'

import AppIndex from '../components/AppIndex'
import Home from '../components/Home'
import login from "../components/login";
import Register from "../components/Register";

import page401 from '../components/401page'
import TradeMain from "../components/transaction/TradeMain";
import TradeDetail from "../components/transaction/TradeDetail";

Vue.use(Router)

export default new Router({
  // mode: 'history',
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
      path: '/infoSearch',
      name: 'InfoSearch',
      component: () => import('../components/account/infoSearch')
    },
    {
      path: '/accSheetSearch',
      name: 'accSheetSearch',
      component: () => import('../components/account/accSheetSearch')
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
        {
          path: '/401',
          name: 'page401',
          component: page401,
          meta: {
            requireAuth: true
          }
        },
        {
          path: '/trade',
          name: 'tradeMain',
          component: TradeMain
        },
        {
          path: '/tradeDetail',
          name: 'tradeDetail',
          component: TradeDetail
        },
      ]
    },
  ]
})
