<template>
  <div id="allCourse">
    <div class="search">
      <div>
        <label>分类：</label>
        <i v-for="(item, index) in classify" :key="index" :class="item == options.classify ? 'active' : ''" @click="select('classify', item)">{{ item }}</i>
      </div>  
      <div>
        <label>标签：</label>
        <el-select
            v-model="value"
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
            :value="item.value">
            </el-option>
        </el-select>
      </div>
    </div>
    <div class="content">
      <div class="course" v-for="(course, index) in courses" :key="index" @click="goto($event, $route.fullPath == '/course?2' ? 'courseCatalog?2' : 'courseCatalog?1')">
        <div class="top">
          <div class="tag" :class="course.state == '通过' ? 'through' : course.state == '未通过' ? 'nothrough' : 'nofinish'" v-if="$route.fullPath == '/course?2'"></div>
          <el-tag effect="dark" size="mini">新入职</el-tag>
          <p class="title">111</p>
          <el-tooltip class="item" popper-class="prompt" effect="dark" content="Top Left 提示文字" placement="top">
            <p class="intro">这里是描述这里是描述这里是述这里是描述这描述这里是描述</p>
          </el-tooltip>
        </div>
        <div class="center">
          <p>学习周期：3天 | 8课时<i>奥点教育</i></p>
          <p>创建时间：2020-12-30 12:54:00</p>
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
              <i class="discount">￥50</i>
              <i class="original">原价￥80</i>
            </div>
        </div>
        <div class="mask" @click="buy($event)">立即购买</div>
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
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage4"
        :page-sizes="[10, 20, 50, 100]"
        :page-size="100"
        layout="total, sizes, prev, pager, next, jumper"
        :total="400">
      </el-pagination>
    </div>
  </div>
</template>

<script>
  import { mapState, mapMutations } from 'vuex'
  export default {
    data() {
      return {
        classify: ['全部', '云非编', '云导播', '云精剪'],
        value: [],
        input2: '',
        value2: null,
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
        dialogVisible: false,
        currentPage4: 4,
        courses: [
          {
            title: 111,
            state: '通过',
            schedule: '1',
            score: 90
          },
          {
            title: 111,
            state: '未通过',
            schedule: '1',
            score: 30
          },
          {
            title: 111,
            state: '未完成',
            schedule: '6/7',
            score: 0
          }
        ]
      };
    },
    computed: {
      ...mapState([
          'options',
      ])
    },
    methods: {
      ...mapMutations([
            'CHANGE_OPTIONS',
            'CHANGE_ACTIVEINDEX'
      ]),
      select(key, value) {
        this.CHANGE_OPTIONS([key, value])
      },
      handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
      },
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
      },
      goto(e, address) {
        e.stopPropagation()
        this.CHANGE_ACTIVEINDEX('2')
        this.$router.push(address)
      },
      evaluate(e) {
        e.stopPropagation()
        this.dialogVisible = true
      },
      buy(e) {
        e.stopPropagation()
        this.$confirm('购买此课程<br><i style="color:#FA6400">将花费780元</i>，您还要继续吗？', '', {
          confirmButtonText: '继续',
          cancelButtonText: '取消',
          dangerouslyUseHTMLString: true,
          type: 'warning'
        }).then(() => {
          this.$message({
            type: 'success',
            message: '购买成功!'
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
#allCourse {
    height: 95%;
    border-radius: 10px;
    position: relative;
    display: flex;
    flex-direction: column;

    .search {
      padding: 15px 15%;
      margin-bottom: 30px;
      background: white;
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
      padding: 0 15%;

      .course {
        border: 1px solid rgb(242, 242, 242);
        border-radius: 10px;
        height: 360px;
        width: 316px;
        font-size: 12px;
        color: #666666;
        margin-right: 30px;
        background: white;
        position: relative;

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

    >.bottom {
        height: 70px;
    }
}

</style>