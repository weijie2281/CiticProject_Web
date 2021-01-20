<template>
  <div>
    <el-menu
      :default-active="'/admin/user/basic'"
      router
      style="height: 100%;"
      mode="vertical"
      background-color="#304156"
      text-color="#fff"
      active-text-color="#ffd04b">
      <!-- <div class="side-header">
         <p>Online Banking</p>
       </div>-->
      <template v-for="(item,i) in adminMenus">
        <!--index 没有用但是必需字段且为 string -->
        <el-submenu :key="i" :index="i + ''" style="text-align: left">
          <span slot="title" style="font-size: 17px;">
            <i :class="item.iconCls"></i>
            {{item.nameZh}}
          </span>
          <el-menu-item v-for="child in item.children" :key="child.path" :index="child.path" class="nest-menu">
            <i :class="child.icon"></i>
            {{ child.nameZh }}
          </el-menu-item>
        </el-submenu>
      </template>
    </el-menu>
  </div>
</template>

<script>
  // import Demo from './admin/Demo'
  export default {
    name: 'AdminMenu',
    data() {
      return {
        adminMenus: '',
      }
    },
    created() {
      this.getAdminMenus()
    },
    methods: {
      getAdminMenus() {
        setTimeout(() => {
          console.log("comp", this.$store.state.adminMenus)
          this.adminMenus = this.$store.state.adminMenus
        }, 100)
        // console.log("comp", this.$store.state.adminMenus)
        // this.adminMenus = this.$store.state.adminMenus
      }
    }
    // data () {
    //   return {
    //     adminMenus: []
    //   }
    // },
    // created () {
    //   this.getMenuData()
    // },
    // methods: {
    //   getMenuData () {
    //     this.axios
    //       .get('http://localhost:8080/crud/getAdminMenu')
    //       .then(response => {
    //         let responseData = response.data
    //         this.adminMenus = responseData
    //       })
    //       .catch(function (error) { // 请求失败处理
    //         console.log(error)
    //       })
    //   }
    // }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .side-header {
    /*height: 80px;*/
    background-color: #002a3f;
    font-size: 20px;
    color: white;
    text-align: center;
    padding: 20px;
  }

  .nest-menu {
    background-color: #1f2d3d !important;
  }

  .nest-menu:hover {
    background-color: #001528 !important;
  }

  /*.sidebar-container {*/
  /*  transition: width 0.28s;*/
  /*  width: 15%;*/
  /*  height: 100%;*/
  /*  position: fixed;*/
  /*  font-size: 0px;*/
  /*  top: 0;*/
  /*  bottom: 0;*/
  /*  left: 0;*/
  /*  z-index: 1001;*/
  /*  overflow: hidden;*/
  /*}*/
</style>
