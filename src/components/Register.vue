<template>
  <div class="poster">
    <el-form class="login_box" label-position="left"
    label-width="0px" v-loading="loading" :rules="rules" :model="loginForm" ref="loginForm">
      <h3 class="login_title">用户注册</h3>
      <el-form-item prop="username">
        <el-input type="text" v-model="loginForm.username"
                  auto-complete="off" placeholder="账号"></el-input>
      </el-form-item>
      <el-form-item prop="password">
        <el-input type="password" v-model="loginForm.password"
                  auto-complete="off" placeholder="密码"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" class="el_button_class" v-on:click="register">Register</el-button>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" class="el_button_class" v-on:click="goBack">Back</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
  export default{
    data () {
      var validatePass = (rule, value, callback) => {
        if (!value) {
          callback(new Error('请输入密码'))
        } else {
          callback()
        }
      }
      var validate2 = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('请输入密码'))
        }
        if(value&&!((/^(0|([1-9]0){0,1}|[1-9]{1,2}|100)$/).test(value))){
          callback(new Error('请输入0-100之间包括0和100的正整数'))
        }else{
          callback()
        }
      }
      var validate3 = (rule, value, callback) => {
        if(value&&(/[`~!@#$%^&*()_\+=<>?:"{}|,.\/;'\\[\]·~！@#￥%……&*（）——\+={}|《》？：“”【】、；‘’，。、]/g).test(value)){
          callback(new Error('禁止输入特殊字符'));
        }else if(value&&(/\s+/g).test(value)) {
          callback(new Error('禁止输入空格'))
        }else{
          callback()
        }
      }
      return {
        checked: true,
        loginForm: {
          username: '',
          password: ''
        },
        loading: false,
        rules: {
          username: [
            { required: true, message: '请输入用户名', trigger: 'blur' },
            { validator: validate3, trigger: 'blur' }
          ],
          password: [
            { validator: validatePass, trigger: 'blur' }
          ]
        }
      }
    },
    methods: {
      register () {
        var _this = this
        this.$refs.loginForm.validate((valid) => {
          if (valid) {
            this.axios
              .post('/crud/register', {
                username: this.loginForm.username.toLowerCase(),
                password: this.loginForm.password
              })
              .then(resp => {
                if (resp.data.code === 200) {
                  this.$alert('注册成功', '提示', {
                    confirmButtonText: '确定'
                  })
                  _this.$router.replace('/login')
                } else {
                  this.$alert(resp.data.message, '提示', {
                    confirmButtonText: '确定'
                  })
                }
              })
              .catch(function (error) { // 请求失败处理
                console.log(error)
              })
          } else {
            _this.$message.warning('失败')
          }
        })
        // this.$refs.loginForm.validate((valid) => {
        //   if (valid) {
        //     console.log(valid)
        //   }
        // })
        // this.axios
        //   .post('http://localhost:8080/crud/register', {
        //     username: this.loginForm.username,
        //     password: this.loginForm.password
        //   })
        //   .then(resp => {
        //     if (resp.data.code === 200) {
        //       this.$alert('注册成功', '提示', {
        //         confirmButtonText: '确定'
        //       })
        //       _this.$router.replace('/login')
        //     } else {
        //       this.$alert(resp.data.message, '提示', {
        //         confirmButtonText: '确定'
        //       })
        //     }
        //   })
        //   .catch(function (error) { // 请求失败处理
        //     console.log(error)
        //   })
      },
      goBack () {
        this.$router.replace('/login')
      }
    }
  }
</script>
<style>

</style>

