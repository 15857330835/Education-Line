<template>
  <div id="login">
      <div class="logo"><i></i><p>专业新媒体云服务商</p></div>
      <div class="title"></div>
      <div class="phone">
          <i class="el-icon-phone-outline">   400-963-9063</i>
      </div>
      <div class="panel">
        <h3>账号登录</h3>
        <el-select v-model="role" placeholder="请选择角色" class="el-icon-user">
            <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value">
            </el-option>
        </el-select>
        <el-input v-model="name" placeholder="请输入账户ID" prefix-icon="el-icon-search"></el-input>
        <el-input placeholder="请输入登录密码" v-model="password" prefix-icon="el-icon-lock" show-password></el-input>
        <el-button type="primary" @click="login">登录</el-button>
      </div>
  </div>
</template>

<script>
  import { mapMutations } from 'vuex'
  export default {
    components: {
    },
    data() {
      return {
        name: '',
        password: '',
        role: '',
        options: [{
          value: 'human',
          label: '学生'
        }, {
          value: 'manager',
          label: '教师'
        }, {
          value: 'institution',
          label: '机构'
        }, {
          value: 'serviceProvider',
          label: '服务商'
        }],
      };
    },
    computed: {
        title() {
            return this.$route.query.title
        }
    },
    methods: {
        ...mapMutations([
            'CHANGE_USER',
            'CHANGE_IDENTITY',
            'CHANGE_TABKEY'
        ]),
        login() {
            if(this.name == '' || this.password == '') {
                this.$message({
                    message: '用户名或密码为空,请填写后再登录！',
                    type: 'warning'
                });
                return
            }
            let url
            const that = this
            switch (this.role) {
                case 'human':
                    url = 'http://edu.aodianyun.com/teach/account/login'
                    break;
                case 'manager':
                    url = 'http://edu.aodianyun.com/teach/account/login'
                    break;
                case 'institution':
                    url = 'http://edu.aodianyun.com/company/account/login'
                    break;
                case 'serviceProvider':
                    url = 'http://edu.aodianyun.com/admin/account/login'
                    break;
            }
            $.post(
                url,
                JSON.stringify({
                    username: this.name,
                    password: this.password
                }),
                function(res) {
                    if(res.Flag == 100) {
                        that.CHANGE_USER(res.data)
                         switch (that.role) {
                             case 'human':
                                 that.CHANGE_IDENTITY(that.role)
                                 that.CHANGE_TABKEY('course?1')
                                 that.$router.push('course?1')
                                 break;
                             case 'manager':
                                 that.CHANGE_IDENTITY(that.role)
                                 that.CHANGE_TABKEY('courseManagement')
                                 that.$router.push('courseManagement')
                                 break;
                             case 'institution':
                                 that.CHANGE_IDENTITY(that.role)
                                 that.CHANGE_TABKEY('authorware')
                                 that.$router.push('authorware')
                                 break;
                             case 'serviceProvider':
                                 that.CHANGE_IDENTITY(that.role)
                                 that.CHANGE_TABKEY('authorware')
                                 that.$router.push('authorware')
                                 break;
                         
                             default:
                                 break;
                         }
                    }else {
                        that.$message.error(res.FlagString);
                        return
                    }
                },
                'json'
            )
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
    background: url('../../assets/img/登录.png') no-repeat center;
    display: flex;
    align-items: center;
    justify-content: center;

    .logo {
        color: white;
        position: absolute;
        top: 30px;
        left: 30px;

        i {
            display: inline-block;
            width: 140px;
            height: 50px;
            background: url('../../assets/img/logo-white.png') no-repeat center;
        }

        p {
            display: inline-block;
            line-height: 54px;
            vertical-align: top;
        }
    }

    .title {
        position: absolute;
        width: 571px;
        height: 177px;
        background: url('../../assets/img/title.png');
        top: 251px;
        left: 285px;
    }

    .phone {
        color: white;
        position: absolute;
        top: 30px;
        right: 30px;
    }

    .panel {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        background: white;
        border-radius: 10px;
        width: 400px;
        height: 400px;
        position: absolute;
        top: 286px;
        right: 343px;

        h3 {
            margin-bottom: 30px;
        }

        .el-select {

            &::before {
                position: absolute;
                left: 10px;
                top: 29px;
                z-index: 5;
                color: #C0C4CC;
            }

            input {
                padding: 0 30px;
            }
        }

        .el-input {
            width: 300px;
            margin: 15px 0;
        }

        button {
            width: 300px;
            margin-top: 30px;
        }
    }
}

</style>