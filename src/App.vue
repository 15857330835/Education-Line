<template>
  <div id="app">
    <Sidebar></Sidebar>
    <Topbar></Topbar>
    <div id="context">
      <router-view/>
    </div>
  </div>
</template>

<script>
  import { Sidebar, Topbar } from './components'
  export default {
    components: {
      Sidebar,
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
    background: #F0F2F5;
    height: 100%;
    padding: 60px;
    padding-left: 210px;
  }
}

</style>
