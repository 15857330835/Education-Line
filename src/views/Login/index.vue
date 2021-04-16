<template>
  <div id="login">
      <el-button type="text" @click="login('studentLogin')">学生端</el-button>
      <el-button type="text" @click="login('teacherLogin')">教师端</el-button>
      <el-button type="text" @click="login('institutionLogin')">机构端</el-button>
      <el-button type="text" @click="login('serviceProviderLogin')">服务商端</el-button>
  </div>
</template>

<script>
  export default {
    components: {
    },
    data() {
      return {
        
      };
    },
    computed: {
        
    },
    methods: {
        login(address) {
            this.$router.push(address)
        }
    },
    mounted() {
      
    }
  }
</script>

<style lang="scss">
#login {
    width: 100vw;
    height: 100vh;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 100;
    background: url('../../assets/img/登录.png') no-repeat center/cover;
    display: flex;
    align-items: center;
    justify-content: center; 
}

</style>