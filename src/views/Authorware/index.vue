<template>
  <div id="authorware">
    <div id="content">
    <div class="search">
        <label>工具名称：</label>
        <el-input v-model="title" size="mini" placeholder="请输入内容"></el-input>
        <el-button type="primary" size="mini" @click="search">查询</el-button>
        <el-button size="mini" @click="refresh">重置</el-button>
        <div class="add" v-if="identity == 'serviceProvider'">
          <el-button type="primary" size="mini" @click="create">新建</el-button>
          <!-- <el-button size="mini">批量删除</el-button> -->
        </div>
    </div>
    <div class="content">
      <div class="template" v-for="(template, index) in templates" :key="index" @click="click(template.title, template.remarks)">
        <div class="img">
          <img :src="template.coverAddr">
        </div>
        <div class="title">
          <p>{{ template.title }}</p>
          <div v-if="identity == 'serviceProvider'">
            <i class="el-icon-s-tools" @click="setup($event, template.id)"></i>
            <i class="el-icon-delete-solid" @click="del($event, template.id)"></i>
          </div>
        </div>
      </div>
    </div>
    <!-- <div class="bottom">
      <el-pagination
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        layout="total, prev, pager, next, jumper"
        :total="templates.length">
      </el-pagination>
    </div> -->
    </div>
  </div>
</template>

<script>
  import { mapState, mapMutations } from 'vuex'
  import { getToolList, delTool } from '@/api/tool'
  export default {
    components: {
    },
    data() {
      return {
        title: '',
        templates: [],
        currentPage: 1,
      };
    },
    computed: {
      ...mapState([
          'user',
          'identity'
      ]),
    },
    methods: {
      ...mapMutations([
            'CHANGE_MODIFY',
      ]),
      click(title, remarks) {
        this.$router.push({name:'Introduce',query: {title, remarks}})
      },
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
      },
      search() {
        const data = {
          token: this.user.Token,
          title: this.title
        }
        getToolList(data).then(res => {
          if(res.flag == 100) {
            this.templates =  res.data
          }else {
            this.$message.error(res.flagString);
          }
        })
      },
      refresh() {
        this.title = ''
        const data = {
          token: this.user.Token
        }
        getToolList(data).then(res => {
          if(res.flag == 100) {
            this.templates =  res.data
          }else {
            this.$message.error(res.flagString);
          }
        })
      },
      create() {
        this.CHANGE_MODIFY(false)
        this.$router.push({name:'Setup'})
      },
      setup(e, id) {
        e.stopPropagation()
        this.CHANGE_MODIFY(true)
        this.$router.push({name:'Setup', query: {id}})
      },
      del(e, id) {
        e.stopPropagation()
        const data = {
          token: this.user.Token,
          id
        }
        delTool(data).then(res => {
          if(res.flag == 100) {
            this.refresh()
          }else {
            this.$message.error(res.flagString);
          }
        })
      }
    },
    mounted() {
      this.refresh()
    }
  }
</script>

<style lang="scss">
#authorware {
  height: 95%;
  background: white;


  .search {
      margin-bottom: 30px;
      text-align: left;

      .add {
        margin-top: 20px;
      }

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
      background: #2D2D2D;
      color: white;
      border-radius: 10px;
      margin-right: 60px;
      margin-bottom: 30px;
      cursor: pointer;

      &:hover {
        box-shadow: 0 0 5px 1px #9e9494;
      }

      .img {
        height: 120px;
        margin-bottom: 10px;

        img {
          width: 100%;
          height: 100%;
          border-radius: 10px;
        }
      }

      .title {

        div {
          text-align: right;
          padding: 0 10px;

          i {
            margin-left: 5px;
          }
        }
      }

      p {
        font-size: 13px;
      }
    }
  }

}

</style>