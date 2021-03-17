<template>
    <div id="topbar">
        <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect">
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
        </el-menu>
        <el-menu :default-active="activeIndex2" class="el-menu-demo" mode="horizontal" @select="handleSelect">
            <el-menu-item v-for="tab in this.tabs" :key="tab.index" :index="tab.index">{{ tab.text }}</el-menu-item>
        </el-menu>
    </div>
</template>

<script>
  import { mapState } from 'vuex'
  export default {
    name: 'Topbar',
    data() {
      return {
        activeIndex: '1',
        activeIndex2: '1',
        tabgroup: {
            "none": [],
            "material": [
                {
                    index: "1",
                    text: '媒资'
                },
                {
                    index: "2",
                    text: '图片'
                },
                {
                    index: "3",
                    text: '音频'
                },
                {
                    index: "4",
                    text: '其他'
                },
            ],
            "courseware": [
                {
                    index: "1",
                    text: '云导播'
                },
                {
                    index: "2",
                    text: '云非编'
                },
                {
                    index: "3",
                    text: '帧级快剪'
                }
            ],
            "assess": [
                {
                    index: "1",
                    text: '云导播'
                },
                {
                    index: "2",
                    text: '云非编'
                },
                {
                    index: "3",
                    text: '帧级快剪'
                }
            ]
        }
      };
    },
    computed: {
        ...mapState([
          'tabKey',
        ]),
        uin() {
            return window.EL.uin
        },
        tabs() {
            return this.tabgroup[this.tabKey]
        }
    },
    methods: {
      handleSelect(key, keyPath) {
        console.log(key, keyPath);
      }
    }
  }
</script>

<style lang="scss">
#topbar {
    margin-left: 150px;

    .el-submenu {
        float: right;

        .el-submenu__title {
            padding: 0;

            &:first-child {
                padding-right: 20px;
            }
        }

        .el-submenu__icon-arrow::before {
            display: none;
        }
    }
}
</style>
