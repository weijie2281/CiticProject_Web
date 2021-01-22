import Vue from 'vue'
import Router from 'vue-router'

import AppIndex from '../components/AppIndex'
import Home from '../components/Home'
import login from "../components/login";
import Register from "../components/Register";
import page404 from '../components/404page'
import page401 from '../components/401page'
import profile from "../components/admin/profile";

import UserBasic from "../components/admin/UserBasic";
import UserRole from "../components/admin/UserRole";
import MenuManagement from "../components/admin/MenuManagement";
import PermissionManagement from "../components/admin/PermissionManagement";
import AccDetail from "../components/admin/AccDetail";
import AccQuery from "../components/admin/AccQuery";
import TradeMain from "../components/transaction/TradeMain";
import AccountManage from "../components/admin/AccountManage";
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
      path: '/customer',
      name: 'Customer',
      component: () => import('../components/customer')
    },
    {
      path: '/customerRecord',
      name: 'CustomerRecord',
      component: () => import('../components/customer/record')
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
          path: '/profile',
          name: 'profile',
          component: profile,
          meta: {
            requireAuth: true
          }
        },
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
        },
        {
          path: '/admin/menu/manage',
          name: 'MenuManagement',
          component: MenuManagement,
          meta: {
            requireAuth: true
          }
        },
        {
          path: '/admin/account/manage',
          name: 'AccountManage',
          component: AccountManage,
          meta: {
            requireAuth: true
          }
        },
        {
          path: '/admin/account/query',
          name: 'AccQuery',
          component: AccQuery,
          meta: {
            requireAuth: true
          }
        },
        {
          path: '/admin/account/trade',
          name: 'AccDetail',
          component: AccDetail,
          meta: {
            requireAuth: true
          }
        },
        {
          path: '/transaction/tradeMain',
          name: 'TradeMain',
          component: TradeMain,
          meta: {
            requireAuth: true
          }
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
