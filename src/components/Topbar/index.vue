<template>
    <div id="topbar">
        <el-menu :default-active="this.activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect">
            <div class="title"></div>
            <el-menu-item v-for="item in this.list" :index="item.index" :key="item.index" @click="switchTab(item.key)">
                <span slot="title">{{ item.text }}</span>
            </el-menu-item>
            <el-submenu index="0">
                <template slot="title">{{ name }}</template>
                <el-menu-item @click="exit">退出</el-menu-item>
            </el-submenu>
            <!-- <el-submenu index="2">
                <template slot="title"><i class="el-icon-bell" /></template>
                <el-menu-item index="2-1">选项1</el-menu-item>
                <el-menu-item index="2-2">选项2</el-menu-item>
                <el-menu-item index="2-3">选项3</el-menu-item>
            </el-submenu> -->
            <!-- <div class="search" v-if="this.ifSearch">
              <label>{{ this.$route.path == '/courseware' ? '课件：' :  '课程：'}}</label>
              <el-input
                placeholder="请输入"
                suffix-icon="el-icon-search"
                size="mini"
                v-model="input1">
              </el-input>
              <label v-if="this.$route.path !== '/course'">创建时间：</label>
              <el-date-picker
                v-if="this.$route.path !== '/course'"
                v-model="value2"
                type="datetime"
                size="mini"
                placeholder="选择日期"
                align="right">
              </el-date-picker>
              <el-button type="primary" plain size="mini" round v-if="this.$route.path !== '/course'">查询</el-button>
              <el-button type="primary" plain size="mini" round>重置</el-button>
            </div> -->
        </el-menu>
    </div>
</template>

<script>
  import { mapState, mapMutations } from 'vuex'
  export default {
    name: 'Topbar',
    data() {
      return {
        input1: '',
        account: {
          '': [],
          manager: [
            {
              index: "1",
              text: '课程管理',
              key: 'courseManagement'
            }
          ],
          human: [
            {
              index: "1",
              text: '全部课程',
              key: 'course?1'
            },
            {
              index: "2",
              text: '我的课程',
              key: 'course?2'
            }
          ],
          institution: [
            {
              index: "1",
              text: '工具模板',
              key: 'authorware'
            },
            {
              index: "2",
              text: '课程管理',
              key: 'institutionCourse'
            },
            {
              index: "3",
              text: '账号管理',
              key: 'account'
            }
          ],
          serviceProvider: [
            {
              index: "1",
              text: '工具模板',
              key: 'authorware'
            },
            {
              index: "2",
              text: '课程管理',
              key: 'allCourses'
            },
            {
              index: "3",
              text: '账号管理',
              key: 'agencyAccount'
            }
          ]
        },
        value2: ''
      };
    },
    computed: {
        ...mapState([
          'user',
          'identity',
          'tabKey',
        ]),
        list() {
          return this.account[this.identity]
        },
        activeIndex() {
          let index = 1
          this.account[this.identity].forEach((item, idx) => {
            if(item.key == this.tabKey) {
              index = idx + 1
            }
          })
          return String(index)
        },
        name() {
            return this.user ? this.user.username : ''
        },
        ifSearch() {
          let arr = ['/courseCatalog', '/assess', '/template', '/history', '/account', '/authorware', '/introduce', '/agencyAccount', '/setup', '/course']
          return arr.indexOf(this.$route.path) == -1 ? true : false 
        }
    },
    methods: {
        ...mapMutations([
            'CHANGE_TABKEY',
            'CHANGE_USER'
        ]),
        switchTab(key) {
            this.CHANGE_TABKEY(key)
            if('/'+this.tabKey != this.$route.path) {
              this.$router.push(key)
            }
        },
        handleSelect(key, keyPath) {
            console.log(key, keyPath);
        },
        exit() {
            let url
            const that = this
            switch (this.identity) {
                case 'human':
                    url = 'http://edu.aodianyun.com/study/account/userLogout'
                    break;
                case 'manager':
                    url = 'http://edu.aodianyun.com/teach/account/userLogout'
                    break;
                case 'institution':
                    url = 'http://edu.aodianyun.com/company/account/userLogout'
                    break;
                case 'serviceProvider':
                    url = 'http://edu.aodianyun.com/admin/account/userLogout'
                    break;
            }
            $.post(
                url,
                JSON.stringify({
                    token: this.user.token
                }),
                function(res) {
                    if(res.flag == 100) {
                      that.CHANGE_USER('')
                      that.$router.push('/')
                    }else {
                      that.$message.error(res.flagString);
                    }
                },
                'json'
            )
        }
    }
  }
</script>

<style lang="scss">
#topbar {
    background: white;
    position: relative;
    z-index: 5;
    box-shadow: 0 0 5px 0 rgb(228, 223, 223);

    .el-menu {
        width: 1200px;
        margin: auto;
        border: none;

        .is-active {
          border-bottom: none;
          background: #1890FF;
          color: white;
        }
    }

    .title {
        float: left;
        height: 60px;
        line-height: 60px;
        width: 120px;
        text-align: left;
        font-weight: bold;
        color: lightblue;
        user-select: none;
        pointer-events: none;
        background: url('../../assets/img/logo.png') no-repeat center;
        margin-right: 60px;
    }

    .search {
      line-height: 60px;
      float: right;

      >.el-input {
        width: 128px;
        height: 30px;
        margin-right: 20px;
      }
    }

    .el-submenu {
        float: right;

        .el-submenu__title {
            padding-right: 0;
        }

        .el-submenu__icon-arrow::before {
            display: none;
        }
    }
}
</style>
