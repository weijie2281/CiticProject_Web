<template>
  <section class="app-main">
      <router-view :key="key" />
  </section>
</template>

<script>
  export default {
    name: 'AppMain',
    computed: {
      key() {
        console.log(this.$route.path)
        return this.$route.path
      }
    }
  }
</script>

<style scoped>
  .app-main {
    /* 50= navbar  50  */
    /*min-height: calc(100vh - 50px);*/
    /*height: 100%;*/
    width: 100%;
    position: relative;
    overflow: hidden;
  }

  .fixed-header+.app-main {
    padding-top: 80px;
  }

</style>

