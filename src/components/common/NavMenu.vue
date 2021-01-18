<template>
  <el-menu
    class="el_menu_nav"
    router
    mode="horizontal"
    background-color="white"
    text-color="#222"
    active-text-color="red"
    style="min-width: 1300px">
    <!--    <i class="el-icon-menu"></i>-->
    <!--    <span>Demo</span>-->
    <span class="el-icon-user-solid"> {{username}}</span>
    <i class="el-icon-switch-button" v-on:click="logout">logout</i>
  </el-menu>
</template>

<script>
    export default {
        name: 'NavMenu',
        data () {
            return {
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
