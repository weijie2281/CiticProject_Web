<template>
  <el-card class="admin-header">
    <a href="/index">
      <img src="../../assets/img/logo.jpg" alt="CITIC">
    </a>
    <span>Online Banking System</span>
<!--    <i class="el-icon-menu"/>-->
    <i class="el-icon-switch-button" v-on:click="logout"/>
    <a class="personalCenter" href="#">{{username}}</a>
  </el-card>
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
  a {
    text-decoration: none;
  }
  .admin-header {
    height: 80px;
    opacity: 0.85;
    line-height: 40px;
    min-width: 900px;
  }

  .admin-header img {
    float: left;
    margin-top: -5px;
    margin-left: 20px;
    width: 55px;
  }

  .admin-header span {
    font-size: 28px;
    font-weight: bold;
    position: absolute;
    left: 10%;
  }
  .personalCenter{
    color: #222;
    float: right;
    padding-right: 20px;
    font-size: 18px;
  }
  .el-icon-switch-button {
    padding: 0;
    font-size: 40px;
    float: right;
  }
  .el-icon-menu{
    cursor: pointer;
    outline: 0;
    font-size: 40px;
    float: right;
    padding-left: 20px;
  }
</style>
