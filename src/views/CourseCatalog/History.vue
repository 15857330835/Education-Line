<template>
  <div id="history">
    <div class="btn">
        <el-button type="primary" size="small">开始考核</el-button>
        <el-button type="primary" size="small">提交</el-button>
    </div>
    <el-table
        :data="tableData"
        style="width: 100%"
        :header-cell-style="{'font-weight': 'bold', 'border-top': '1px solid #EEEEEE'}"
        :default-sort = "{prop: 'date', order: 'descending'}"
        >
        <el-table-column width="30">
          <template slot-scope="scope">
            <el-radio v-model="radio" :label="scope.row.ID"></el-radio>
          </template>
        </el-table-column>
        <el-table-column align="center" width="50" prop="ID" label="ID"></el-table-column>
        <el-table-column align="center" prop="title" label="标题"></el-table-column>
        <el-table-column align="center" prop="startTime" label="开始时间" sortable></el-table-column>
        <el-table-column align="center" prop="endTime" label="结束时间" sortable></el-table-column>
        <el-table-column align="center" label="状态">
          <template slot-scope="scope">
            <span :class="scope.row.state == '已提交' ? 'submitted' : 'nosubmitted'">{{ scope.row.state }}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" label="操作">
          <el-button type="text" size="mini" @click="handleEdit">成果</el-button>
          <el-button type="text" size="mini" @click="del">删除</el-button>
        </el-table-column>
      </el-table>
  </div>
</template>

<script>
  export default {
    components: {
    },
    data() {
      return {
        tableData: [{
          ID: '1',
          title: 'title',
          startTime: '2020-02-21 08:53:21',
          endTime: '2020-02-21 08:53:21',
          state: '已提交',
          score: '36'
        },
        {
          ID: '2',
          title: 'title',
          startTime: '2020-02-21 08:53:21',
          endTime: '2020-02-21 08:53:21',
          state: '-',
          score: '80'
        },
        {
          ID: '3',
          title: 'title',
          startTime: '2020-02-21 08:53:21',
          endTime: '2020-02-21 08:53:21',
          state: '-',
          score: '30'
        }
        ],
        radio: '1'
      };
    },
    computed: {
        
    },
    methods: {
        handleEdit() {

        },
        del() {
            this.$confirm('是否确定删除该课件？<br><i style="color:#FA6400">课件删除后将无法恢复，</i>您还要继续吗？', '', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                customClass: 'popup',
                dangerouslyUseHTMLString: true,
                type: 'warning'
            }).then(() => {
                this.$message({
                    type: 'success',
                    message: '删除成功!'
                });
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消'
                });          
            });
        }
    },
    mounted() {
      
    }
  }
</script>

<style lang="scss">
#history {
    height: 95%;
    background: white;
    border-radius: 10px;
    position: relative;
    text-align: left;
    padding: 30px 15%;
    display: flex;
    flex-direction: column;

    .btn {
        text-align: right;
        margin-bottom: 30px;
    }

    .submitted {
        color: #FA6400;
    }

    .nosubmitted {
        color: #666666;
    }
}

</style>