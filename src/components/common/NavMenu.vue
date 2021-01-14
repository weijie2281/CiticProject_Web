<template>
  <el-menu
    class="el_menu_nav"
    :default-active="'/admin'"
    router
    mode="horizontal"
    background-color="white"
    text-color="#222"
    active-text-color="red"
    style="min-width: 1300px">
    <a href="#nowhere">更多功能</a>
    <i class="el-icon-menu"></i>
<!--    <span>Demo</span>-->
    <span>{{username}}</span>
    <i class="el-icon-switch-button" v-on:click="logout"></i>
  </el-menu>
</template>

<script>
  export default {
    name: 'NavMenu',
    data () {
      return {
        navList: [
          {name: '/index', navItem: '首页'},
          {name: '/jotter', navItem: '笔记本'},
          {name: '/library', navItem: '图书馆'},
          {name: '/admin', navItem: '个人中心'}
        ],
        username: this.$store.state.user.username
        // username: 'demo'
      }
    },
    methods: {
      logout () {
        var _this = this
        this.axios.get('/crud/logout').then(resp => {
          if (resp.data.code === 200) {
            // 前后端状态保持一致
            _this.$store.commit('logout')
            _this.$router.replace('/login')
          }
        })
      }
    }
  }
</script>

<style scoped>

</style>
