<template>
  <div>
    <el-menu
      router
      style="height: 100%;"
      mode="vertical"
      background-color="#304156"
      text-color="#fff"
      active-text-color="#ffd04b">
      <!--<div class="side-header">
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
  export default {
    name: 'AdminMenu',
    data () {
      return {
        adminMenus: [
          {
            path: '', name: '', component: '', iconCls: 'el-icon-menu', nameZh: '参考',
            children: [{
              path: '/', name: '', component: '', icon: 'el-icon-minus', nameZh: '参考选项'
            }, {
              path: '/login', name: 'Login', component: 'Login', icon: 'el-icon-menu', nameZh: '参考选项'}]
          },
           ]
      }
    },
    created () {
      // this.getMenuData()
    },
    methods: {

    }
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
</style>
