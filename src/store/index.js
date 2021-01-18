import Vue from 'vue'
import Vuex from 'vuex'

// 挂载Vuex
Vue.use(Vuex)

// 创建VueX对象
const store = new Vuex.Store({
  state: {
    user: {
      username: window.localStorage.getItem('user' || '[]') == null ? '' : JSON.parse(window.localStorage.getItem('user' || '[]')).username
    },
    adminMenu: []
  },
  mutations: {
    login (state, user) {
      state.user = user
      window.localStorage.setItem('user', JSON.stringify(user))
    },
    logout (state) {
      state.user = []
      // state.adminMenu = []
      window.localStorage.removeItem('user')
      store.commit('initAdminMenu', null)
    },
    initAdminMenu (state, menus) {
      state.adminMenus = menus
    }
  }
})

export default store
