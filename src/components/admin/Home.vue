<template>
  <div class="app-wrapper">
    <admin-menu class="sidebar-container" />
    <div class="main-container">
      <div class="fixed-header" >
        <nav-menu />
      </div>
      <app-main></app-main>
    </div>
  </div>
</template>

<script>
  import NavMenu from '../common/NavMenu'
  import AdminMenu from '../admin/AdminMenu'
  import AppMain from '../AppMain'
  export default {
    name: 'Home',
    components: {AppMain, NavMenu, AdminMenu}
  }
</script>

<style scoped>
  .main-container {
    min-height: 100%;
    transition: margin-left .28s;
    margin-left: 15%;
    position: relative;
  }
  .sidebar-container {
    transition: width 0.28s;
    width: 15%;
    height: 100%;
    position: fixed;
    font-size: 0px;
    top: 0;
    bottom: 0;
    left: 0;
    z-index: 1001;
    overflow: hidden;
  }
  .app-wrapper {
  @include clearfix;
    position: relative;
    height: 100%;
    width: 100%;
  }
  .fixed-header {
    position: fixed;
    top: 0;
    right: 0;
    z-index: 9;
    width: 85%;
    transition: width 0.28s;
  }
</style>
