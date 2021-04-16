<template>
  <div id="allCourse">
    <div class="search">
      <div>
        <label>分类：</label>
        <i v-for="(item, index) in classify" :key="index" :class="item == classifying ? 'active' : ''" @click="select(item)">{{ item }}</i>
      </div>  
      <div>
        <label>课程：</label>
        <el-input v-model="title" size="mini" placeholder="请输入内容"></el-input>
        <label>标签：</label>
        <el-select
            v-model="label"
            class="label"
            multiple
            filterable 
            collapse-tags
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
    <div class="content">
      <div class="course" v-for="(course, index) in courses" :key="index" @click="goto($event, course.id)">
        <div class="top">
          <div class="tag" :class="course.state == '通过' ? 'through' : course.state == '未通过' ? 'nothrough' : 'nofinish'" v-if="$route.fullPath == '/course?2'"></div>
          <el-tag effect="dark" size="mini">{{ course.label }}</el-tag>
          <p class="title">{{ course.title }}</p>
          <el-tooltip class="item" popper-class="prompt" effect="dark" :content="course.remarks" placement="top">
            <p class="intro">{{ course.remarks }}</p>
          </el-tooltip>
        </div>
        <div class="center">
          <p>学习周期：{{ course.period }}天 | 8课时<i>奥点教育</i></p>
          <p>创建时间：{{ formatDate(course.createtime) }}</p>
          <div class="schedule" v-if="$route.fullPath == '/course?2'">
            <div v-if="course.state == '未完成'">
              进度：{{ course.schedule }}
            </div>
            <div v-else>
              <i :class="course.score > 60 ? 'through' : 'nothrough'"><i>{{ course.score }}</i>分</i>
              <el-button type="text" v-if="course.score > 60" @click="evaluate($event)"><i class="el-icon-chat-dot-square"></i>评价</el-button>
            </div>
          </div>
        </div>
        <div class="bottom">
            <div>
              <p>已有18051人订阅</p>
              <p>好评度 95%</p>
            </div>
            <div>
              <i class="discount">￥{{ course.priceDiscount }}</i>
              <i class="original">原价￥{{ course.price }}</i>
            </div>
        </div>
        <div class="mask" @click="buy($event, course.id, course.priceDiscount)" v-if="$route.fullPath == '/course?1'">立即购买</div>
        <div class="mask" v-else>马上学习</div>
      </div>
        <el-dialog
          title="课程评价"
          :visible.sync="dialogVisible"
          width="40%">
          <h3>您觉得课程怎么样？</h3>
          <el-rate v-model="value2" show-text></el-rate>
          <el-input type="textarea" resize= "none" rows="6" maxlength="1000" show-word-limit v-model="input2" placeholder="请尽可能详尽描述您的学习经历，例如学习成果、老师讲课风格、课程内容等"></el-input>
          <p>*不可少于15字，评价多于100字将有机会获得200积分奖励哦～</p>
          <span slot="footer" class="dialog-footer">
            <el-button type="primary" @click="dialogVisible = false">提交评价</el-button>
          </span>
        </el-dialog>
    </div>
    <div class="bottom">
      <el-pagination
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        layout="total, prev, pager, next, jumper"
        :total="courses.length">
      </el-pagination>
    </div>
  </div>
</template>

<script>
  import { mapState, mapMutations } from 'vuex'
  import { getSubjectList, signUpSubject, getMySubjectList } from '@/api/studentcourse'
  import { getToolList } from '@/api/tool'
  export default {
    data() {
      return {
        classify: ['全部'],
        classifying: '全部',
        title: '',
        label: [],
        input2: '',
        value2: null,
        ifSearch: false,
        option: [
            {
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
            }
        ],
        dialogVisible: false,
        currentPage: 1,
        courses: [],
        tool: []
      };
    },
    computed: {
      ...mapState([
          'user',
      ]),
      route() {
        return this.$route.fullPath
      }
    },
    watch: {
      route() {
        this.courses = []
        this.refresh()
      }
    },
    methods: {
      ...mapMutations([
            'CHANGE_ACTIVEINDEX',
            'CHANGE_OWN'
      ]),
      select(value) {
        this.classifying = value
        this.search()
      },
      handleCurrentChange(val) {
        this.currentPage = val
        this.search()
      },
      goto(e, id) {
        e.stopPropagation()
        const own = this.$route.fullPath == '/course?2' ? true : false
        this.CHANGE_OWN(own)
        this.CHANGE_ACTIVEINDEX('2')
        this.$router.push({path: 'courseCatalog', query: {id}})
      },
      evaluate(e) {
        e.stopPropagation()
        this.dialogVisible = true
      },
      reset() {
        this.classifying = '全部'
        this.title = ''
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
        const tool = this.tool.filter(item => item.title == this.classifying)[0]
        const data = {
          token: this.user.Token,
          page: this.currentPage,
          toolId: tool ? tool.id : ''
        }
        if(this.ifSearch) {
          data.title = this.title
          data.label = this.label.join(',')
        }
        if(this.$route.fullPath == '/course?1') {
          getSubjectList(data).then(res => {
            if(res.flag == 100) {
              this.courses = res.data
            }else {
              this.$message.error(res.flagString);
            }
          })
        }else {
          getMySubjectList(data).then(res => {
            if(res.flag == 100) {
              this.courses = res.data
            }else {
              this.$message.error(res.flagString);
            }
          })
        }
      },
      refresh() {
        const data = {
          token: this.user.Token
        }
        if(this.$route.fullPath == '/course?1') {
          getSubjectList(data).then(res => {
            if(res.flag == 100) {
              this.courses = res.data
            }else {
              this.$message.error(res.flagString);
            }
          })
        }else {
          getMySubjectList(data).then(res => {
            if(res.flag == 100) {
              this.courses = res.data
            }else {
              this.$message.error(res.flagString);
            }
          })
        }
      },
      buy(e, id, price) {
        e.stopPropagation()
        this.$confirm(`购买此课程<br><i style="color:#FA6400">将花费${price}元</i>，您还要继续吗？`, '', {
          confirmButtonText: '继续',
          cancelButtonText: '取消',
          dangerouslyUseHTMLString: true,
          type: 'warning'
        }).then(() => {
          const data = {
            token: this.user.Token,
            subjectId: id
          }
          signUpSubject(data).then(res => {
            if(res.flag == 100) {
              this.$message({
                type: 'success',
                message: '购买成功!'
              });
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
      const data = {
        token: this.user.Token
      }
      getToolList(data).then(res => {
        if(res.flag == 100) {
          this.tool = res.data
          res.data.forEach(item => {
            this.classify.push(item.title)
          })
        }else {
          this.$message.error(res.flagString);
        }
      })
    }
  }
</script>

<style lang="scss">
#allCourse {
    height: 90%;
    border-radius: 10px;
    position: relative;
    display: flex;
    flex-direction: column;
    overflow: auto;
    
    &::-webkit-scrollbar {
      display: none;
    }

    .search {
      padding: 15px 0;
      margin-bottom: 30px;
      background: white;
      text-align: left;

      >div {
        width: 1200px;
        margin: auto;
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
        width: 220px;

        &.label {
          width: 200px;
        }
      }

      .el-input {
        width: unset;
        margin-right: 30px;
      }
    }

    .content {
      flex: 1;
      display: flex;
      width: 1200px;
      margin: auto;
      flex-wrap: wrap;

      .course {
        border: 1px solid rgb(242, 242, 242);
        border-radius: 10px;
        height: 360px;
        width: 316px;
        font-size: 12px;
        color: #666666;
        margin: 0 42px 15px;
        background: white;
        position: relative;
        cursor: pointer;

        &:hover {
          box-shadow: 0 0 5px 1px #c2b8b8;
        }

        .top {
          background: url('../../assets/img/img.jpeg');
          border-bottom: 1px solid rgb(242, 242, 242);
          height: 208px;
          padding: 160px 20px 0;
          position: relative;
          color: white;
          border-radius: 10px 10px 0 0;

          .tag {
            position: absolute;
            width: 62px;
            height: 65px;
            top: 0;
            left: 0;

            &.through {
              background: url('../../assets/img/通过.png');
            }

            &.nothrough {
              background: url('../../assets/img/未通过.png');
            }

            &.nofinish {
              background: url('../../assets/img/未完成.png');
            }
          }

          span {
            position: absolute;
            top: 10px;
            right: 10px;
            background: rgba($color: #000000, $alpha: 0.5);
            border: none;
            width: 58px;
            height: 28px;
            line-height: 28px;
            border-radius: 8px;
          }

          .title {
            font-size: 16px;
            font-weight: bold;
            text-align: left;
          }

          .intro {
            text-align: left;
            overflow: hidden;
            text-overflow:ellipsis;
            white-space: nowrap;
          }
        }

        .center {
          height: 72px;
          padding: 10px;
          position: relative;

          p {
            text-align: left;
            margin-bottom: 5px;
          }

          .schedule {
            position: absolute;
            top: 8px;
            right: 12px;

            .through {
              display: block;
              color: #019F04;

              i {
                font-size: 20px;
              }
            }

            .nothrough {
              color: #F23030;

              i {
                font-size: 20px;
              }
            }

            .el-button {
              padding: 0;
              padding-top: 3px;
              font-size: 12px;
              color: #666666;
            }
          }
        }

        .bottom {
          text-align: left;
          padding: 10px;
          display: flex;
          line-height: 24px;
          justify-content: space-between;

          i {

            &.original {
              display: block;
              font-size: 12px;
              text-decoration: line-through;
              color: #989898;
            }

            &.discount {
              font-size: 24px;
              color: #FA6400;
            }
          }
        }

        .mask {
          width: 100%;
          height: 80px;
          background: #1890FF;
          position: absolute;
          bottom: 0;
          left: 0;
          color: white;
          line-height: 80px;
          cursor: pointer;
          display: none;
          border-radius: 0 0 10px 10px;
        }

        &:hover {

          .mask {
            display: block;
          }
        }
      }

      .el-dialog {
        border-radius: 10px;

        .el-dialog__header {
          text-align: left;
        }

        .el-dialog__body {

          .el-rate {
            margin: 10px 0;
          }

          p {
            text-align: right;
            color: #FA6400;
            margin-top: 5px;
            font-size: 12px;
          }
        }
      }
    }
}

</style>