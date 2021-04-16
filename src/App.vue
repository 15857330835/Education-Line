<template>
  <div id="app">
    <Topbar></Topbar>
    <div id="context">
      <router-view/>
    </div>
  </div>
</template>

<script>
  import { mapState } from 'vuex'
  import { Topbar } from './components'
  export default {
    components: {
      Topbar
    },
    computed: {
      ...mapState([
          'user',
      ]),
      page() {
        return this.$route.path
      }
    },
    watch: {
      page() {
        const arr = ['/', '/studentLogin', '/teacherLogin', '/institutionLogin', '/serviceProviderLogin']
        if(arr.indexOf(this.page) == -1) {
          if(this.user == '') {
            this.$message.error('请登录！');
            this.$router.push('/')
          }
        }
      }
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
    background: #F5F6F6;
    height: 100%;

    #content {
      position: relative;
      padding: 30px 0;
      width: 1200px;
      height: 100%;
      margin: auto;
      display: flex;
      flex-direction: column;
    }
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
