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
      <!-- <el-button type="primary" plain size="mini">全选</el-button>
      <el-button type="primary" plain size="mini">批量上线</el-button>
      <el-button type="primary" plain size="mini">批量下线</el-button>
      <el-button type="primary" plain size="mini">批量删除</el-button> -->
    </div>
    <div class="content">
      <el-table
        :data="tableData"
        style="width: 100%"
        height="100%"
        :header-cell-style="{'font-weight': 'bold', 'background-color': '#F8F8F8'}"
        :default-sort = "{prop: 'date', order: 'descending'}"
        >
        <el-table-column align="center" width="150px" prop="title" label="标题"></el-table-column>
        <el-table-column align="center" width="" label="简介">
          <template slot-scope="scope">
            <el-tooltip class="item" popper-class="prompt" effect="dark" :content="scope.row.remarks" placement="bottom">
              <p class="intro">{{ scope.row.remarks }}</p>
            </el-tooltip>
          </template>
        </el-table-column>
        <el-table-column align="center" width="" label="标签">
          <template slot-scope="scope">
            <el-tag type="warning" size="mini" v-for="(item, index) in scope.row.label.split(',')" :key="index">{{ item }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column align="center" width="80px" label="课件时长">
          <template slot-scope="scope">
            <span>{{ time(scope.row.endTime - scope.row.stratTime) }}</span>
          </template>
        </el-table-column>
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
            <el-button type="text" size="mini" @click="play(scope.row.urlAddr)" v-if="scope.row.urlAddr">播放</el-button>
            <el-button type="text" size="mini" @click="make(scope.row.id, scope.row.subjectId)" :disabled='scope.row.id == generateID' v-else>制作</el-button>
            <el-button type="text" size="mini" @click="modify(scope.row.id, scope.row.ncesId, scope.row.subjectId)" :disabled='scope.row.ncesId ? false : true'>修改</el-button>
            <el-button type="text" size="mini" @click="play(scope.row.urlVideo)" v-if="scope.row.urlVideo">成果</el-button>
            <el-button type="text" size="mini" @click="line(scope.row.id, scope.row.status)" :disabled='scope.row.finishStatus ? false : true'>{{ scope.row.status ? '下线' : '上线' }}</el-button>
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
        destroy-on-close
        width="100%">
        <div id="MPSplayer"></div>
      </el-dialog>
    </div>
    <div class="bottom">
      <el-pagination
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        layout="total, prev, pager, next, jumper">
      </el-pagination>
    </div>
    </div>
  </div>
</template>

<script>
  import { mapState, mapMutations } from 'vuex'
  import { getCoursewareList, addCourseware, delCourseware, editNces, updateCoursewareStatus, editCourseware } from '@/api/teachercourse'
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
          'user',
          'generateID'
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
            'CHANGE_PROJECTID',
            'CHANGE_VIDEOTYPE'
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
        const this_ = this
        this.player(url)
        if($('#MPSplayer').length == 0) {
          setTimeout(function(){this_.player(url)}, 1000)
        }
      },
      player(url) {
        // eslint-disable-next-line
        new mpsPlayer({
            container:'MPSplayer',//播放器容器ID，必要参数
            uin: '1011',//用户ID
            appId: 'fumBub1N6zNQxQUx',//播放实例ID
            url,//控制台开通的hls/mp4地址
            width: '100%',//播放器宽度，可用数字、百分比等
            height: '100%',//播放器高度，可用数字、百分比等
            autostart: true,//是否自动播放，默认为false
            controlbardisplay: 'enable',//是否显示控制栏，值为：disable、enable默认为disable。
            isclickplay: false,//是否单击播放，默认为false
            isfullscreen: true,//是否双击全屏，默认为true
            mobilefullscreen: false,//移动端是否全屏，默认为false
            enablehtml5: true,//是否优先使用H5播放器，默认为false
            ieUseH5:true,//boolean ie下是否使用H5（支持win10下ie（ie11）和edge） 默认false
            isloadcount: 1//网络波动卡顿loading图标显示(默认1s后) 
        });
      },
      make(coursewareId, subjectId) {
        const data = {
          token: this.user.Token,
          coursewareId,
          subjectId
        }
        editCourseware(data).then(res => {
          if(res.flag == 100) {
            this.CHANGE_COURSEWAREID(coursewareId)
            this.CHANGE_PROJECTID(res.data.projectId)
            this.CHANGE_RECORD(true)
            this.CHANGE_URL(res.data.project.pageUrl)
            this.$router.push('production')
          }else {
            this.$message.error(res.flagString);
          }
        })
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
            this.CHANGE_VIDEOTYPE(1)
            this.CHANGE_URL(res.data.pageUrl)
            this.$router.push('production')
          }else {
            this.$message.error(res.flagString);
          }
        })
      },
      line(id, status) {
        const data = {
          token: this.user.Token,
          coursewareId: id,
          status: status ? 0 : 1
        }
        let text = status ? '下线' : '上线'
        this.$confirm(`是否${text}该课程？`, '', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          updateCoursewareStatus(data).then(res => {
            if(res.flag == 100) {
              this.refresh()
            }else {
              this.$message.error(res.flagString);
            }
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消'
          });          
        });
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
            this.CHANGE_URL(res.data.project.pageUrl)
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
          status: this.online == '全部' ? -1 : this.online == '上线' ? 1 : 0,
          finishStatus: this.status == '全部' ? -1 : this.status == '已完成' ? 1 : 0
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
        this.$confirm('此操作将永久删除该课程, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          delCourseware(data).then(res => {
            if(res.flag == 100) {
              this.refresh()
            }else {
              this.$message.error(res.flagString);
            }
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });
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
      },
      time(time) {
        var h = Math.floor(time/3600) > 9 ? Math.floor(time/3600) : '0' + Math.floor(time/3600)
        var m = Math.floor(time%3600/60) > 9 ? Math.floor(time%3600/60) : '0' + Math.floor(time%3600/60)
        var s = Math.floor(time%60) > 9 ? Math.floor(time%60) : '0' + Math.floor(time%60)
        return h + ':' + m + ':' + s
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

    .bottom {
      min-height: 30px;
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

            #MPSplayer {
              width: 100%;
              height: 100%;
            }
          }
        }
      }
    }
}

</style>