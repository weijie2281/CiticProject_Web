<template>
  <el-container id="admin-body">
    <nav-menu style="position: absolute;width: 100%;z-index: 1;height: 80px"/>
    <el-container>
      <el-aside style="width: 250px;padding-top:80px;height: 100%">
        <admin-menu style="height: 100%"/>
      </el-aside>
      <el-main style="padding: 80px 0 0 0">
        <app-main/>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
  import NavMenu from './common/NavMenu'
  import AdminMenu from './admin/AdminMenu'
  import AppMain from './AppMain'
  export default {
    name: 'Home',
    components: {AppMain, NavMenu, AdminMenu}
  }
</script>

<style scoped>
  #admin-body {
    height: 101vh;
  }
</style>
