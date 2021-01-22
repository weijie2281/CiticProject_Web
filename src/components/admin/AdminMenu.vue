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
        // adminMenus: '',
        adminMenus: [
            {"id":1,"path":"/admin","name":null,"nameZh":"用户管理","iconCls":"el-icon-user","component":"Home","parentId":0,
                "children":[
                    {"id":4,"path":"/admin/user/basic","name":null,"nameZh":"用户信息","iconCls":null,"component":"admin/UserBasic","parentId":1,"children":null},
                    {"id":5,"path":"/admin/user/role","name":null,"nameZh":"角色配置","iconCls":null,"component":"admin/UserRole","parentId":1,"children":null}
                    ]},
            // {"id":3,"path":"/admin","name":null,"nameZh":"系统配置","iconCls":"el-icon-s-tools","component":"Home","parentId":0,
            //     "children":[
            //         {"id":7,"path":"/admin/user/demo","name":null,"nameZh":"demo","iconCls":null,"component":"admin/Demo","parentId":3,"children":null},
            //         {"id":10,"path":"/admin/menu/manage","name":null,"nameZh":"菜单管理","iconCls":"el-icon-s-tools","component":"admin/MenuManagement","parentId":3,"children":null},
            //         {"id":11,"path":"/admin/permission/manage","name":null,"nameZh":"权限管理","iconCls":"el-icon-s-tools","component":"admin/PermissionManagement","parentId":3,"children":null}
            //         ]},
            {"id":12,"path":"/admin","name":null,"nameZh":"账户管理","iconCls":"el-icon-s-tools","component":"Home","parentId":0,
                "children":[
                    {"id":17,"path":"/admin/account/manage","name":null,"nameZh":"账户管理","iconCls":"el-icon-s-tools","component":"admin/AccountManage","parentId":12,"children":null},
                    {"id":13,"path":"/admin/account/query","name":null,"nameZh":"账户查询","iconCls":"el-icon-s-tools","component":"admin/AccQuery","parentId":12,"children":null},
                    {"id":14,"path":"/admin/account/trade","name":null,"nameZh":"账户交易明细","iconCls":"el-icon-s-tools","component":"admin/AccDetail","parentId":12,"children":null}]},
            {"id":15,"path":"/transaction","name":null,"nameZh":"交易管理","iconCls":"el-icon-s-tools","component":"Home","parentId":0,
                "children":[
                    {"id":16,"path":"/transaction/tradeMain","name":null,"nameZh":"交易查询","iconCls":"el-icon-s-tools","component":"transaction/TradeMain","parentId":15,"children":null}]}
            ]
      }
    },
    created() {
      // this.getAdminMenus()
    },
    methods: {
      // getAdminMenus() {
      //   setTimeout(() => {
      //     console.log("comp", this.$store.state.adminMenus)
      //     this.adminMenus = this.$store.state.adminMenus
      //   }, 100)
      //   // console.log("comp", this.$store.state.adminMenus)
      //   // this.adminMenus = this.$store.state.adminMenus
      // }
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
