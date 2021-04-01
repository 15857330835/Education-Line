<template>
    <div id="topbar">
        <el-menu :default-active="this.activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect">
            <div class="title">奥点教育</div>
            <el-menu-item v-for="item in this.list" :index="item.index" :key="item.index" @click="switchTab(item.key)">
                <span slot="title">{{ item.text }}</span>
            </el-menu-item>
            <el-submenu index="1">
                <template slot="title">{{ uin }}</template>
                <el-menu-item index="1-1">选项1</el-menu-item>
                <el-menu-item index="1-2">选项2</el-menu-item>
                <el-menu-item index="1-3">选项3</el-menu-item>
            </el-submenu>
            <el-submenu index="2">
                <template slot="title"><i class="el-icon-bell" /></template>
                <el-menu-item index="2-1">选项1</el-menu-item>
                <el-menu-item index="2-2">选项2</el-menu-item>
                <el-menu-item index="2-3">选项3</el-menu-item>
            </el-submenu>
            <div class="search" v-if="this.ifSearch">
              <label>{{ this.$route.path == '/courseware' ? '课件：' :  '课程：'}}</label>
              <el-input
                placeholder="请输入"
                suffix-icon="el-icon-search"
                size="mini"
                v-model="input1">
              </el-input>
              <label>创建时间：</label>
              <el-date-picker
                v-model="value2"
                type="datetime"
                size="mini"
                placeholder="选择日期"
                align="right"
                :picker-options="pickerOptions">
              </el-date-picker>
              <el-button type="primary" plain size="mini" round>查询</el-button>
              <el-button type="primary" plain size="mini" round>重置</el-button>
            </div>
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
              key: 'course'
            },
            {
              index: "2",
              text: '我的课程',
              key: 'course'
            }
          ],
          institution: [
            {
              index: "1",
              text: '工具模板',
              key: 'courseware'
            },
            {
              index: "2",
              text: '课程管理',
              key: 'assess'
            },
            {
              index: "3",
              text: '账号管理',
              key: 'courseManagement'
            }
          ],
          serviceProvider: [

          ]
        },
        value2: '',
        pickerOptions: {
          shortcuts: [{
            text: '今天',
            onClick(picker) {
              picker.$emit('pick', new Date());
            }
          }, {
            text: '昨天',
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24);
              picker.$emit('pick', date);
            }
          }, {
            text: '一周前',
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit('pick', date);
            }
          }]
        },
      };
    },
    computed: {
        ...mapState([
          'tabKey',
        ]),
        list() {
          return this.account[window.EL.identity]
        },
        activeIndex() {
          let index = 0
          this.account[window.EL.identity].forEach((item, idx) => {
            if(item.key == this.tabKey) {
              index = idx + 1
            }
          })
          return String(index)
        },
        uin() {
            return window.EL.uin
        },
        ifSearch() {
          let arr = ['/courseCatalog', '/assess']
          return arr.indexOf(this.$route.path) == -1 ? true : false 
        }
    },
    methods: {
        ...mapMutations([
            'CHANGE_TABKEY',
        ]),
        switchTab(key) {
            this.CHANGE_TABKEY(key)
            if('/'+this.tabKey != this.$route.path) {
              this.$router.push(key)
            }
        },
        handleSelect(key, keyPath) {
            console.log(key, keyPath);
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
        width: 70%;
        margin: auto;
        border: none;
    }

    .title {
        float: left;
        height: 60px;
        line-height: 60px;
        width: 100px;
        text-align: left;
        font-weight: bold;
        color: lightblue;
        user-select: none;
        pointer-events: none;
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
