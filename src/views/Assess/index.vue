<template>
  <div id="assess">
    <div id="content">
    <el-menu :default-active="state" class="el-menu-demo" mode="horizontal" @select="handleSelect">
      <!-- <el-menu-item index="course">课程</el-menu-item> -->
      <el-menu-item index="courseware">课件</el-menu-item>
    </el-menu>
    <div class="search">
      <!-- <div>
        <label>状态：</label>
        <i v-for="(item, index) in status" :key="index" :class="item == status1 ? 'active' : ''" @click="select(item)">{{ item }}</i>
      </div> -->
      <div>
        <label>姓名：</label>
        <el-input v-model="studentName" size="mini" placeholder="请输入内容"></el-input>
        <div style="display: inline-block" v-if="state == 'courseware'">
          <label>标题：</label>
          <el-input v-model="title" size="mini" placeholder="请输入内容"></el-input>
        </div>
        <label>提交时间：</label>
        <el-date-picker
          v-model="submitTime"
          size="mini"
          type="datetime"
          placeholder="选择日期时间"
          align="right">
        </el-date-picker>
        <el-button type="primary" plain round size="mini" @click="query">查询</el-button>
        <el-button type="primary" plain round size="mini" @click="reset">重置</el-button>
      </div>
    </div>
    <div class="content">
      <el-table
        v-if="state == 'course'"
        :data="tableData"
        style="width: 100%"
        height="100%"
        :header-cell-style="{'font-weight': 'bold', 'background-color': '#F8F8F8'}"
        :default-sort = "{prop: 'date', order: 'descending'}"
        >
        <el-table-column align="center" prop="studentName" label="姓名"></el-table-column>
        <el-table-column align="center" prop="stratTime" label="考核时长"></el-table-column>
        <el-table-column align="center" prop="submitTime" label="提交时间" sortable></el-table-column>
        <el-table-column align="center" label="状态">
          <template slot-scope="scope">
            <span :class="scope.row.state == '已通过' ? 'through' : scope.row.state == '未通过' ? 'nothrough' : 'nofinish'">{{ scope.row.submitStatus }}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" label="分数">
          <template slot-scope="scope">
            <span :class="scope.row.score > 60 ? 'pass' : 'nopass'">{{ scope.row.score }}</span>
          </template>
        </el-table-column>
      </el-table>
      <el-table
        v-else
        :data="tableData"
        style="width: 100%"
        height="100%"
        :header-cell-style="{'font-weight': 'bold', 'background-color': '#F8F8F8'}"
        :default-sort = "{prop: 'date', order: 'descending'}"
        >
        <el-table-column align="center" prop="studentName" label="姓名"></el-table-column>
        <el-table-column align="center" prop="title" label="标题"></el-table-column>
        <!-- <el-table-column align="center" prop="inspectionTime" label="考核次数"></el-table-column> -->
        <el-table-column align="center" label="提交时间" sortable>
          <template slot-scope="scope">
            <span>{{ formatDate(scope.row.submitTime) }}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" prop="score" label="分数">
          <!-- <template slot-scope="scope">
            <span :class="scope.row.state == '已通过' ? 'through' : scope.row.state == '未通过' ? 'nothrough' : 'nofinish'">{{ scope.row.submitStatus }}</span>
          </template> -->
        </el-table-column>
        <el-table-column align="center" label="操作">
          <template slot-scope="scope">
            <!-- <el-button type="text" size="mini" @click="handleEdit">批阅</el-button> -->
            <el-button type="text" size="mini" @click="play(scope.row.urlAddr)" v-if="scope.row.urlAddr">成果</el-button>
          </template>
        </el-table-column>
      </el-table>
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
        :current-page="this.currentPage"
        layout="total, prev, pager, next, jumper">
      </el-pagination>
    </div>
    </div>
  </div>
</template>

<script>
  import { mapState } from 'vuex'
  import { getExamList } from '@/api/teachercourse'
  export default {
    data() {
      return {
        status: ['全部', '已通过', '未通过', '未完成'],
        status1: '全部',
        state: 'courseware',
        studentName: '',
        title: '',
        submitTime: '',
        ifSearch: false,
        coursePage: 1,
        coursewarePage: 1,
        dialogVisible: false,
        tableData: []
      };
    },
    computed: {
      ...mapState([
          'user'
      ]),
      currentPage() {
        return this.state == 'course' ? this.coursePage : this.coursewarePage
      },
      courseId() {
        return this.$route.query.data
      }
    },
    methods: {
      select(value) {
        this.status1 = value
        this.search()
      },
      handleSelect(key) {
        this.state = key
        this.refresh()
      },
      handleCurrentChange(val) {
        this.state == 'course' ? this.coursePage = val : this.coursewarePage = val
        this.search()
      },
      handleEdit() {

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
      reset() {
        this.status1 = '全部'
        this.studentName = ''
        this.title = ''
        this.submitTime = ''
        this.coursePage = 1
        this.coursewarePage = 1
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
          status: this.status1 == '全部' ? '' : this.status1 == '已通过' ? 1 : this.status1 == '已通过' ? 2 : 3,
        }
        if(this.ifSearch) {
          data.studentName = this.studentName
          data.submitTime = this.submitTime ? this.submitTime.getTime()/1000 : ''
        }
        getExamList(data).then(res => {
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
        getExamList(data).then(res => {
          if(res.flag == 100) {
            this.tableData = res.data
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
    }
  }
</script>

<style lang="scss">
#assess {
    height: 95%;
    background: white;

    .el-menu {
      margin-bottom: 30px;
      display: flex;
      justify-content: center;
    }

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
        width: unset;
      }

      .el-input {
        width: unset;
        height: 30px;
        margin-right: 30px;
      }
    }

    .content {
      flex: 1;
      display: flex;

      .pass {
        color: #1890FF;
      }

      .nopass {
        color: #B0B0B0;
      }

      .through {
        color: #FA6400;
      }

      .nothrough {
        color: #E02020;
      }

      .nofinish {
        color: #686868;
      }

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

    .bottom {
        height: 40px;
    }
}

</style>