<template>
  <div id="courseCatalog">
      <div class="head">
          <div class="title">
              <h3>新入职员工考核</h3>
              <el-tag effect="dark" size="mini">新入职</el-tag>
              <i>奥点教育</i>
          </div>
          <div class="details">
              <p>最近在学  2003人累计订阅 218215人好评度100%8课时学习周期3天</p>
          </div>
          <el-button plain>朴素按钮</el-button>
          <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect">
            <el-menu-item index="1">课程概述</el-menu-item>
            <el-menu-item index="2">目录</el-menu-item>
            <el-menu-item index="3">评论（0）</el-menu-item>
          </el-menu>
      </div>
  </div>
</template>

<script>
  export default {
    components: {
    },
    data() {
      return {
        activeIndex: '1',
      };
    },
    computed: {
        
    },
    methods: {
        handleSelect(key, keyPath) {
            console.log(key, keyPath);
        }
    },
    mounted() {
      
    }
  }
</script>

<style lang="scss">
#courseCatalog {
    height: 95%;
    border-radius: 10px;
    position: relative;
    display: flex;
    flex-direction: column;
    
    .head {
        padding: 15px 15% 0;
        background: white;
        text-align: left;
        position: relative;

        .title {
            display: flex;
        }

        .is-plain {
            position: absolute;
            left: 15%;
            bottom: 10px;
            z-index: 5;
        }

        .el-menu {
            display: flex;
            justify-content: center;
        }
    }
}

</style>