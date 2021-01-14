<template>
  <el-menu
    class="el_menu_nav"
    router
    mode="horizontal"
    background-color="white"
    text-color="#222"
    active-text-color="red"
    style="min-width: 1300px">
    <a href="#nowhere">更多功能</a>
    <i class="el-icon-menu"></i>
    <span>{{username}}</span>
    <i class="el-icon-switch-button"></i>
  </el-menu>
</template>

<script>
  export default {
    name: 'NavMenu',
    data () {
      return {
        // username: this.$store.state.user.username
        username: 'demo'
      }
    },
    methods: {

    }
  }
</script>

<style scoped>

</style>
