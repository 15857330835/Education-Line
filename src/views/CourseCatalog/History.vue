<template>
  <div id="history">
    <div id="content">
      <div class="btn">
          <el-button type="primary" size="small" @click="assess">开始考核</el-button>
          <el-button type="primary" size="small" @click="submit">提交</el-button>
      </div>
      <el-table
          :data="tableData"
          style="width: 100%"
          :header-cell-style="{'font-weight': 'bold', 'border-top': '1px solid #EEEEEE'}"
          :default-sort = "{prop: 'date', order: 'descending'}"
          >
          <el-table-column width="30">
            <template slot-scope="scope">
              <el-radio v-model="radio" :label="scope.row.id"></el-radio>
            </template>
          </el-table-column>
          <el-table-column align="center" width="50" prop="id" label="ID"></el-table-column>
          <el-table-column align="center" prop="title" label="标题"></el-table-column>
          <el-table-column align="center" prop="createtime" label="开始时间" sortable></el-table-column>
          <el-table-column align="center" prop="endTime" label="结束时间" sortable></el-table-column>
          <el-table-column align="center" label="状态">
            <template slot-scope="scope">
              <span :class="scope.row.status == '1' ? 'submitted' : 'nosubmitted'">{{ scope.row.status }}</span>
            </template>
          </el-table-column>
          <el-table-column align="center" label="操作">
            <template slot-scope="scope">
              <el-button type="text" size="mini" @click="handleEdit(scope.row.urlAddr)">成果</el-button>
              <el-button type="text" size="mini" @click="del">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-dialog
          :visible.sync="dialogVisible"
          width="100%">
          <video
            style="width: 100%; height: 100%"
            autoplay
            playsinline
            controls
            :src="url"
          ></video>
        </el-dialog>
      </div>
  </div>
</template>

<script>
  import { mapState, mapMutations } from 'vuex'
  import { getExamList, addExam, submitExam } from '@/api/studentcourse'
  export default {
    components: {
    },
    data() {
      return {
        tableData: [],
        radio: '1',
        dialogVisible: false,
        url: ''
      };
    },
    computed: {
        ...mapState([
          'user',
          'coursewareID',
          'toolId'
      ])
    },
    methods: {
        ...mapMutations([
              'CHANGE_URL'
        ]),
        assess() {
          const data = {
            token: this.user.Token,
            subjectId: this.tableData[0].subjectId,
            coursewareId: this.coursewareID,
            title: 'test'
          }
          addExam(data).then(res => {
            if(res.flag == 100) {
              this.CHANGE_URL('https://' + res.data.project.pageUrl)
              this.$router.push('production')
            }else {
              this.$message.error(res.flagString);
            }
          })
        },
        submit() {
          const data = {
            token: this.user.Token,
            examId: this.radio
          }
          submitExam(data).then(res => {
            if(res.flag == 100) {
              this.$message({
                  message: '上传成功！',
                  type: 'success'
              });
            }else {
              this.$message.error(res.flagString);
            }
          })
        },
        handleEdit(url) {
          this.dialogVisible = true
          this.url = url
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
      const data = {
        token: this.user.Token,
        coursewareId: this.coursewareID
      }
      getExamList(data).then(res => {
        if(res.flag == 100) {
          this.tableData = res.data
        }else {
          this.$message.error(res.flagString);
        }
      })
    }
  }
</script>

<style lang="scss">
#history {
    height: 95%;
    background: white;

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

    .el-dialog {
      margin: 0 !important;
      height: 100%;

      .el-dialog__header {
        text-align: left;
      }

      .el-dialog__body {
        height: 90%;
      }
    }
}

</style>