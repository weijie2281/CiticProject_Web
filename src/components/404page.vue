<template>
  <div class="wscn-http404-container">
    <div class="wscn-http404">
      <div class="pic-404">
        <img class="pic-404__parent" src="../assets/img/404.png" alt="404">
      </div>
      <div class="error-msg">
        <div class="error-msg__oops">OOPS!</div>
        <div class="error-msg__headline">{{ message }}</div>
        <div class="error-msg__info">请检查你输入的url是否正确</div>
        <el-button icon="el-icon-arrow-left" class="pan-back-btn" @click="back">
          返回
        </el-button>
      </div>
    </div>
  </div>
</template>

<script>

  export default {
    name: 'Page404',
    computed: {
      message() {
        return '你访问的页面无法访问'
      }
    },
    methods: {
      back() {
        if (this.$route.query.noGoBack) {
          this.$router.push({ path: '/dashboard' })
        } else {
          this.$router.go(-1)
        }
      }
    }
  }
</script>

<style scoped>
  .wscn-http404-container{
    transform: translate(-50%,-50%);
    position: absolute;
    top: 40%;
    left: 50%;
  }
  .wscn-http404 {
    position: relative;
    width: 1200px;
    padding: 0 50px;
    overflow: hidden;
  }
  .pic-404__parent {
    position: relative;
    float: left;
    width: 600px;
    overflow: hidden;
  }
  .error-msg {
    position: relative;
    float: left;
    width: 300px;
    padding: 30px 0;
    overflow: hidden;
  }
  .error-msg__oops {
    font-size: 32px;
    font-weight: bold;
    line-height: 40px;
    color: #1482f0;
    /*opacity: 0;*/
    margin-bottom: 20px;
  }
  .error-msg__info {
    font-size: 13px;
    line-height: 21px;
    color: grey;
    /*opacity: 0;*/
    margin-bottom: 30px;
  }
  .error-msg__headline {
    font-size: 20px;
    line-height: 24px;
    color: #222;
    font-weight: bold;
    /*opacity: 0;*/
    margin-bottom: 10px;
  }
  .error-msg__return-home {
    display: block;
    float: left;
    width: 110px;
    height: 36px;
    background: #1482f0;
    border-radius: 100px;
    text-align: center;
    color: #ffffff;
    /*opacity: 0;*/
    font-size: 14px;
    line-height: 36px;
    cursor: pointer;
    text-decoration:none;
  }
  .pan-back-btn {
    background: #1482f0;
    color: #fff;
  }

</style>
