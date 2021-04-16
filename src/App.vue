<template>
  <div id="app">
    <Topbar></Topbar>
    <div id="context">
      <router-view/>
    </div>
  </div>
</template>

<script>
  import { Topbar } from './components'
  export default {
    components: {
      Topbar
    },
    methods: {
    }
  }
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  height: 100%;

  #context {
    background: white;
    height: 100%;
  }
}

.prompt {
  background: rgba($color: #000000, $alpha: 0.6) !important;
}

.el-menu--popup {
  min-width: unset !important;
  width: 100px;

  >li {
    text-align: center;
  }
}

</style>
