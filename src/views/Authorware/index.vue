<template>
  <div id="authorware">
    <div class="search">
        <label>工具名称：</label>
        <el-input v-model="input" size="mini" placeholder="请输入内容"></el-input>
        <el-button type="primary" size="mini">查询</el-button>
        <el-button size="mini">重置</el-button>
    </div>
    <div class="content">
      <div class="template" v-for="(template, index) in templates" :key="index" @click="click(template.title)">
        <img :src="template.coverAddr">
        <p>{{ template.title }}</p>
      </div>
    </div>
    <div class="bottom">
      <el-pagination
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        layout="total, prev, pager, next, jumper"
        :total="templates.length">
      </el-pagination>
    </div>
  </div>
</template>

<script>
  import { mapState } from 'vuex'
  import { getToolList } from '@/api/tool'
  export default {
    components: {
    },
    data() {
      return {
        input: '',
        templates: [],
        currentPage: 1,
      };
    },
    computed: {
      ...mapState([
          'user',
      ]),
    },
    methods: {
      click(title) {
        this.$router.push({name:'Introduce',query: {title}})
      },
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
      }
    },
    mounted() {
      const data = {
        token: this.user.Token
      }
      getToolList(data).then(res => {
        this.templates =  res.data
      })
    }
  }
</script>

<style lang="scss">
#authorware {
  display: flex;
  height: 95%;
  padding: 30px 15%;
  flex-direction: column;

  .search {
      margin-bottom: 30px;
      text-align: left;

      label {
        line-height: 40px;
      }

      .el-input {
        width: unset;
        margin-right: 30px;
      }
    }

  .content {
    flex: 1;
    display: flex;

    .template {
      width: 140px;
      height: 180px;
      background: white;
      border-radius: 10px;
      margin-right: 60px;
      margin-bottom: 30px;
      cursor: pointer;

      &:hover {
        box-shadow: 0 0 5px 1px #9e9494;
      }

      p {
        font-size: 13px;
      }
    }
  }

}

</style>