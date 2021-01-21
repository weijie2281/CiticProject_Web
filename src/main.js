// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
// import '@/assets/css/global.css'
import '@/assets/css/demo.css'
import axios from 'axios'
import store from './store'

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

Vue.use(ElementUI)
Vue.prototype.axios = axios
axios.defaults.withCredentials = true
Vue.config.productionTip = false


const formatRoutes = (routes) => {
  let fmtRoutes = []
  routes.forEach(route => {
    if (route.children) {
      route.children = formatRoutes(route.children)
    }

    let fmtRoute = {
      path: route.path,
      component: resolve => {
        require(['./components/' + route.component + '.vue'], resolve)
      },
      name: route.name,
      nameZh: route.nameZh,
      iconCls: route.iconCls,
      children: route.children
    }
    fmtRoutes.push(fmtRoute)
  })
  return fmtRoutes
}

const initAdminMenu = (router, store) => {
  if (store.state.adminMenus) {
    return
  }
  axios.get('/crud/getAdminMenu').then(resp => {
    if (resp && resp.status === 200) {
      var fmtRoutes = formatRoutes(resp.data)
      router.addRoutes(fmtRoutes)
      console.log("Routes",router)
      console.log("fmtRoutes",fmtRoutes)
      // console.log(store.state.adminMenus)
      store.commit('initAdminMenu', fmtRoutes)
      // console.log(store.state.adminMenus)
    }
  })
}



router.beforeEach((to, from, next) => {
    // initAdminMenu(router, store)
    if (store.state.user.username && to.path.startsWith('/admin')) {
      initAdminMenu(router, store)
    }
    if (store.state.user.username && to.path.startsWith('/login')) {
      next({
        path: '/home'
      })
    }
    if (to.meta.requireAuth) {
      if (store.state.user.username) {
        // console.log(store.state.user)
        axios.get('/crud/authentication').then(resp => {
          if (resp) {
            // console.log("response")
            next()
          }
        })
      } else {
        next({
          path: 'login',
          query: {redirect: to.fullPath}
        })
      }
    } else {
      next()
    }
  }
)


/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
