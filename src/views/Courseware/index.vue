<template>
  <div id="courseware">
    <div id="content">
    <div class="search">
      <div>
        <label>上下线：</label>
        <i v-for="(item, index) in ifOnline" :key="index" :class="item == online ? 'active' : ''" @click="selectifOnline(item)">{{ item }}</i>
      </div>
      <div>
        <label>状态：</label>
        <i v-for="(item, index) in state" :key="index" :class="item == status ? 'active' : ''" @click="selectstate(item)">{{ item }}</i>
      </div>
      <div>
        <label>课件：</label>
        <el-input v-model="title" size="mini" placeholder="请输入内容"></el-input>
        <label>创建时间：</label>
        <el-date-picker
          v-model="stime"
          size="mini"
          type="datetime"
          placeholder="选择日期时间">
        </el-date-picker>
        <label>标签：</label>
        <el-select
            v-model="label"
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
            :value="item.label">
            </el-option>
        </el-select>
        <el-button type="primary" size="mini" @click="query">查询</el-button>
        <el-button size="mini" @click="reset">重置</el-button>
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
        <el-table-column align="center" width="200px" label="创建时间" sortable>
          <template slot-scope="scope">
            <span>{{ formatDate(scope.row.createtime) }}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" width="70px" label="状态">
          <template slot-scope="scope">
            <span :class="scope.row.finishStatus ? 'done' : 'undone'">{{ scope.row.finishStatus ? '完成' : '未完成' }}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" width="200px" label="操作">
          <template slot-scope="scope">
            <el-button type="text" size="mini" @click="play(scope.row.urlAddr)">播放</el-button>
            <el-button type="text" size="mini" @click="modify(scope.row.id, scope.row.ncesId, scope.row.subjectId)" :disabled='scope.row.ncesId ? false : true'>修改</el-button>
            <el-button type="text" size="mini" @click="play(scope.row.urlVideo)">成果</el-button>
            <el-button type="text" size="mini" @click="line" :disabled='scope.row.finishStatus ? false : true'>{{ scope.row.status ? '下线' : '上线' }}</el-button>
            <el-button type="text" size="mini" @click="del(scope.row.id, scope.row.projectId, scope.row.subjectId)" :disabled='scope.row.status ? true : false'>删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-dialog title="创建课件" :visible.sync="dialogFormVisible" class="create">
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
      <el-dialog
        class="play"
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
    <div class="bottom">
      <el-pagination
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        layout="total, prev, pager, next, jumper"
        :total="tableData.length">
      </el-pagination>
    </div>
    </div>
  </div>
</template>

<script>
  import { mapState, mapMutations } from 'vuex'
  import { getCoursewareList, addCourseware, delCourseware, editNces } from '@/api/teachercourse'
  export default {
    data() {
      return {
        ifOnline: ['全部', '上线', '下线'],
        state: ['全部', '已完成', '未完成'],
        online: '全部',
        status: '全部',
        title: '',
        stime: '',
        input: '',
        label: [],
        ifSearch: false,
        dialogVisible: false,
        url: '',
        option: [{
                value: '1',
                label: '新入职'
            }, {
                value: '2',
                label: '晚会'
            }, {
                value: '3',
                label: '体育'
            }, {
                value: '4',
                label: '电竞'
            }, {
                value: '5',
                label: '培训'
            }],
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
          'user'
      ]),
      courseId() {
        return this.$route.query.data
      }
    },
    methods: {
      ...mapMutations([
            'CHANGE_COURSEWAREID',
            'CHANGE_URL',
            'CHANGE_RECORD',
            'CHANGE_SUBJECTID',
            'CHANGE_PROJECTID'
      ]),
      selectstate(value) {
        this.status = value
        this.search()
      },
      selectifOnline(value) {
        this.online = value
        this.search()
      },
      handleCurrentChange(val) {
        this.currentPage = val
        this.search()
      },
      play(url) {
        this.dialogVisible = true
        this.url = url
      },
      modify(id, ncesId, subjectId) {
        const data = {
          token: this.user.Token,
          ncesId,
          subjectId
        }
        editNces(data).then(res => {
          if(res.flag == 100) {
            this.CHANGE_RECORD(false)
            this.CHANGE_COURSEWAREID(id)
            this.CHANGE_URL('https://' + res.data.pageUrl)
            this.$router.push('production')
          }else {
            this.$message.error(res.flagString);
          }
        })
      },
      line() {

      },
      production() {
        this.dialogFormVisible = true
      },
      create() {
        const data = {...this.form}
        data.token = this.user.Token
        data.subjectId = this.courseId
        data.label = data.label.join(',')
        addCourseware(data).then(res => {
          if(res.flag == 100) {
            this.dialogFormVisible = false
            this.CHANGE_COURSEWAREID(res.data.id)
            this.CHANGE_PROJECTID(res.data.projectId)
            this.CHANGE_RECORD(true)
            this.CHANGE_URL('https://' + res.data.project.pageUrl)
            this.$router.push('production')
          }else {
            this.$message.error(res.flagString);
          }
        })
      },
      reset() {
        this.online = '全部'
        this.status = '全部'
        this.title = ''
        this.stime = ''
        this.label = []
        this.currentPage = 1
        this.ifSearch = false
        this.search()
      },
      query() {
        this.ifSearch = true
        this.search()
      },
      search() {
        const data = {
          token: this.user.Token,
          subjectId: this.courseId,
          page: this.currentPage,
          status: this.online == '全部' ? '' : this.online == '上线' ? 1 : 0,
          finishStatus: this.status == '全部' ? '' : this.status == '已完成' ? 1 : 0
        }
        if(this.ifSearch) {
          data.title = this.title
          data.stime = this.stime ? this.stime.getTime()/1000 : ''
          data.label = this.label.join(',')
        }
        getCoursewareList(data).then(res => {
          if(res.flag == 100) {
            this.tableData = res.data
          }else {
            this.$message.error(res.flagString);
          }
        })
      },
      refresh() {
        const data = {
          token: this.user.Token,
          subjectId: this.courseId
        }
        getCoursewareList(data).then(res => {
          if(res.flag == 100) {
            this.tableData = res.data
          }else {
            this.$message.error(res.flagString);
          }
        })
      },
      del(id, projectId, subjectId) {
        const data = {
          token: this.user.Token,
          id,
          projectId,
          subjectId
        }
        delCourseware(data).then(res => {
          if(res.flag == 100) {
            this.refresh()
          }else {
            this.$message.error(res.flagString);
          }
        })
      },
      formatDate (value) {
        if (typeof (value) == 'undefined') {
            return ''
        } else {
            let date = new Date(parseInt(value * 1000))
            let y = date.getFullYear()
            let MM = date.getMonth() + 1
            MM = MM < 10 ? ('0' + MM) : MM
            let d = date.getDate()
            d = d < 10 ? ('0' + d) : d
            let h = date.getHours()
            h = h < 10 ? ('0' + h) : h
            let m = date.getMinutes()
            m = m < 10 ? ('0' + m) : m
            let s = date.getSeconds()
            s = s < 10 ? ('0' + s) : s
            return y + '-' + MM + '-' + d + ' ' + h + ':' + m + ':' + s
        }
      }
    },
    mounted() {
      this.refresh()
      this.CHANGE_SUBJECTID(this.courseId)
    }
  }
</script>

<style lang="scss">
#courseware {
    height: 95%;
    background: white;

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

      .create {

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

      .play {

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
    }
}

</style>