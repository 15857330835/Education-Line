<template>
    <div id="sidebar">
        <el-menu
          :default-active="this.activeIndex"
          class="el-menu-vertical-demo"
          background-color="#545c64"
          text-color="#fff"
          active-text-color="#ffd04b">
          <div class="title">title</div>
          <el-menu-item v-for="manager in this.list" :index="manager.index" :key="manager.index" @click="switchTab(manager.key)">
              <i :class="manager.icon"></i>
              <span slot="title">{{ manager.text }}</span>
          </el-menu-item>
        </el-menu>
    </div>
</template>

<script>
  import { mapState, mapMutations } from 'vuex'
  export default {
    name: 'Sidebar',
    data() {
      return {
        managers: [
          {
            index: "1",
            text: '课件制作',
            icon: 'el-icon-location',
            key: 'none'
          },
          {
            index: "2",
            text: '素材管理',
            icon: 'el-icon-menu',
            key: 'material'
          },
          {
            index: "3",
            text: '课件管理',
            icon: 'el-icon-document',
            key: 'courseware'
          },
          {
            index: "4",
            text: '考核评分',
            icon: 'el-icon-setting',
            key: 'assess'
          },
        ],
        humans: [
          {
            index: "1",
            text: '媒体制作',
            icon: 'el-icon-location',
            key: 'none'
          },
          {
            index: "2",
            text: '素材管理',
            icon: 'el-icon-menu',
            key: 'material'
          },
          {
            index: "3",
            text: '精彩分享',
            icon: 'el-icon-document',
            key: 'courseware'
          },
          {
            index: "4",
            text: '考核',
            icon: 'el-icon-setting',
            key: 'assess'
          },
        ]
      };
    },
    computed: {
        ...mapState([
          'tabKey',
        ]),
        list() {
          return window.EL.identity == 'manager' ? this.managers : this.humans
        },
        activeIndex() {
          const arr= ['none', 'material', 'courseware', 'assess']
          const index = arr.indexOf(this.tabKey) + 1
          return String(index)
        }
    },
    methods: {
      ...mapMutations([
        'CHANGE_TABKEY',
      ]),
      switchTab(key) {
        this.CHANGE_TABKEY(key)
      }
    }
  }
</script>

<style lang="scss">
#sidebar {
  position: fixed;
  top: 0;
  left: 0;
  height: 100%;
  width: 150px;

  >ul.el-menu {
    height: 100%;

    .title {
      height: 60px;
      background: #444a4e;
      display: flex;
      align-items: center;
      justify-content: center;
      color: wheat;
      font-size: 20px;
    }

    .el-submenu .el-menu-item {
      min-width: 0;
    }
  }
}
</style>
