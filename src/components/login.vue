<template>
  <div class="poster">
    <el-form class="login_box" label-position="left" label-width="0px">
      <h3 class="login_title">请登陆</h3>
      <el-form-item>
        <el-input type="text" v-model="loginForm.username"  auto-complete="off" placeholder="请输入用户名"></el-input>
      </el-form-item>
      <el-form-item>
        <el-input type="password" v-model="loginForm.password" auto-complete="off" placeholder="请输入密码"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button class="el_button_class" type="primary" v-on:click="login">登陆</el-button>
      </el-form-item>
      <el-form-item>
        <el-button class="el_button_class" type="primary" v-on:click="goToRegister">注册</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  export default {
    name: 'login',
    data () {
      return {
        loginForm: {
          username: '',
          password: ''
        },
        responseResult: [],
        isValid: false
      }
    },
    methods: {
      login () {
        var _this = this
        this.axios
          // .post('/crud/login', {
          //     username: this.loginForm.username.toLowerCase(),
          //     password: this.loginForm.password
          // })
          .post('/7979/login/login?username=' + this.loginForm.username + '&password=' + this.loginForm.password)
          .then(response => {
            if (response.data.code === 200) {
              _this.$store.commit('login', _this.loginForm)
              var path = this.$route.query.redirect
              this.$router.replace({path: path === '/' || path === undefined ? '/home' : path})
            }
            else {
              _this.$message.warning(response.data.msg)
            }
          })
          .catch(function (error) { // 请求失败处理
            console.log(error)
          })
      },
      goToRegister () {
        this.$router.replace('/register')
      },

    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .valid /deep/ .el-input__inner {
    border-color: red;
  }
</style>
