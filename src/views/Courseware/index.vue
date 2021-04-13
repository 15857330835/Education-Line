<template>
  <div id="courseware">
    <div class="search">
      <div>
        <label>上下线：</label>
        <i v-for="(item, index) in ifOnline" :key="index" :class="item == options.ifOnline ? 'active' : ''" @click="select('ifOnline', item)">{{ item }}</i>
      </div>
      <div>
        <label>状态：</label>
        <i v-for="(item, index) in state" :key="index" :class="item == options.state ? 'active' : ''" @click="select('state', item)">{{ item }}</i>
      </div>
      <div>
        <label>标签：</label>
        <el-select
            v-model="value4"
            class="label"
            multiple
            filterable 
            collapse-tags
            allow-create
            default-first-option
            size="mini"
            style="margin-left: 20px;"
            placeholder="请选择">
            <el-option
            v-for="item in option"
            :key="item.value"
            :label="item.label"
            :value="item.value">
            </el-option>
        </el-select>
      </div>
    </div>
    <div class="operation">
      <el-button type="primary" plain size="mini" @click="production">制作课件</el-button>
      <el-button type="primary" plain size="mini">全选</el-button>
      <el-button type="primary" plain size="mini">批量上线</el-button>
      <el-button type="primary" plain size="mini">批量下线</el-button>
      <el-button type="primary" plain size="mini">批量删除</el-button>
    </div>
    <div class="content">
      <el-table
        :data="tableData"
        style="width: 100%"
        :header-cell-style="{'font-weight': 'bold', 'background-color': '#F8F8F8'}"
        :default-sort = "{prop: 'date', order: 'descending'}"
        >
        <el-table-column align="center" width="150px" prop="title" label="标题"></el-table-column>
        <el-table-column align="center" width="" label="简介">
          <template slot-scope="scope">
            <el-tooltip class="item" popper-class="prompt" effect="dark" :content="scope.row.remarks" placement="top">
              <p class="intro">{{ scope.row.remarks }}</p>
            </el-tooltip>
          </template>
        </el-table-column>
        <el-table-column align="center" width="" label="标签">
          <template slot-scope="scope">
            <el-tag type="warning" size="mini" v-for="(item, index) in scope.row.label.split(',')" :key="index">{{ item }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column align="center" width="80px" prop="learnTime" label="课件时长"></el-table-column>
        <el-table-column align="center" width="200px" prop="createtime" label="创建时间" sortable></el-table-column>
        <el-table-column align="center" width="70px" label="状态">
          <template slot-scope="scope">
            <span :class="scope.row.finishStatus ? 'done' : 'undone'">{{ scope.row.finishStatus ? '完成' : '未完成' }}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" width="200px" label="操作">
          <template slot-scope="scope">
            <el-button type="text" size="mini" @click="handleEdit">播放</el-button>
            <el-button type="text" size="mini" @click="handleEdit" :disabled='scope.row.status ? true : false'>修改</el-button>
            <el-button type="text" size="mini" @click="handleEdit">成果</el-button>
            <el-button type="text" size="mini" @click="handleEdit" :disabled='scope.row.finishStatus ? false : true'>{{ scope.row.status ? '下线' : '上线' }}</el-button>
            <el-button type="text" size="mini" @click="del(scope.row.id)" :disabled='scope.row.status ? true : false'>删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-dialog title="创建课件" :visible.sync="dialogFormVisible">
        <el-form :model="form">
          <el-form-item label="课件名称：" :label-width="formLabelWidth">
            <el-input v-model="form.title" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="课件简介：" :label-width="formLabelWidth">
            <el-input v-model="form.remarks" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="课件标签：" :label-width="formLabelWidth">
            <el-select
              v-model="form.label"
              multiple
              collapse-tags
              filterable
              allow-create
              default-first-option
              style="margin-left: 20px;"
              placeholder="请选择">
              <el-option
                v-for="item in option"
                :key="item.value"
                :label="item.label"
                :value="item.label">
              </el-option>
            </el-select>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="create">确 定</el-button>
        </div>
      </el-dialog>
    </div>
    <div class="bottom">
      <el-pagination
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        layout="total, prev, pager, next, jumper"
        :total="tableData.length">
      </el-pagination>
    </div>
  </div>
</template>

<script>
  import { mapState, mapMutations } from 'vuex'
  import { getCoursewareList, addCourseware, delCourseware } from '@/api/teachercourse'
  export default {
    data() {
      return {
        ifOnline: ['全部', '上线', '下线'],
        state: ['全部', '已完成', '未完成'],
        input: '',
        value4: [],
        option: [
            {
                value: '选项1',
                label: '黄金糕'
            }, {
                value: '选项2',
                label: '双皮奶'
            }, {
                value: '选项3',
                label: '蚵仔煎'
            }, {
                value: '选项4',
                label: '龙须面'
            }, {
                value: '选项5',
                label: '北京烤鸭'
            }
        ],
        currentPage: 1,
        tableData: [],
        dialogFormVisible: false,
        form: {
          title: '',
          remarks: '',
          label: ''
        },
        formLabelWidth: '30%'
      };
    },
    computed: {
      ...mapState([
          'user',
          'options',
      ]),
      courseId() {
        return this.$route.query.data
      }
    },
    methods: {
      ...mapMutations([
            'CHANGE_OPTIONS',
      ]),
      select(key, value) {
        this.CHANGE_OPTIONS([key, value])
      },
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
      },
      handleEdit() {

      },
      production() {
        this.dialogFormVisible = true
      },
      create() {
        this.form.token = this.user.Token
        this.form.subjectId = this.courseId
        this.form.label = this.form.label.join(',')
        addCourseware(this.form).then(res => {
          if(res.Flag == 100) {
            this.dialogFormVisible = false
            this.$router.push('production')
          }
        })
      },
      refresh() {
        const data = {
          token: this.user.Token,
          subjectId: this.courseId
        }
        getCoursewareList(data).then(res => {
          if(res.Flag == 100) {
            this.tableData = res.data
          }
        })
      },
      del(id) {
        const data = {
          token: this.user.Token,
          id
        }
        delCourseware(data).then(res => {
          if(res.Flag == 100) {
            this.refresh()
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
#courseware {
    height: 95%;
    background: white;
    border-radius: 10px;
    position: relative;
    padding: 30px 15%;
    display: flex;
    flex-direction: column;

    .search {
      margin-bottom: 30px;
      text-align: left;

      >div {
        margin-bottom: 15px;

        >i {
          padding: 0 15px;
          cursor: pointer;

          &.active {
            color: #1890FF;
          }
        }
      }

      label {
        line-height: 40px;
      }

      .el-select {
        width: 120px;

        &.label {
          width: 200px;
        }
      }

      .el-input {
        width: unset;
        margin-right: 10px;
      }
    }

    .operation {
      text-align: right;
      margin-bottom: 30px;

      button {
        margin-right: 10px;
      }
    }

    .content {
      flex: 1;
      display: flex;

      .intro {
        overflow: hidden;
        text-overflow:ellipsis;
        white-space: nowrap;
      }

      .el-tag {
        margin-right: 5px;
      }

      .done {
        color: #FA6400;
      }

      .undone {
        color: #686868;
      }

      .el-dialog {
        width: 30%;
        border-radius: 10px;
        text-align: left;

        .el-input {
          width: 220px;
        }

        .el-select {
          margin-left: 0 !important;
        }
      }
    }
}

</style>