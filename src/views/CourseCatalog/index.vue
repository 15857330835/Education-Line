<template>
  <div id="courseCatalog">
      <div class="head">
          <div class="title">
              <h2>{{ courseInfo.title }}</h2>
              <el-tag effect="dark" size="mini">{{ courseInfo.label }}</el-tag>
              <el-button type="info" v-if="own">已订阅</el-button>
          </div>
          <div class="details">
              <p><i>最近在学  2003人</i><i>累计订阅 218215人</i><i>好评度100%</i><i>8课时</i><i>学习周期{{ courseInfo.period }}天</i></p>
          </div>
          <el-menu :default-active="this.activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect">
            <el-menu-item index="1">课程概述</el-menu-item>
            <el-menu-item index="2">目录</el-menu-item>
            <el-menu-item index="3">评论（0）</el-menu-item>
          </el-menu>
      </div>
      <div class="content"> 
        <div class="overview" v-if="activeIndex == 1">
          <label>简介：</label>
          <p>{{ courseInfo.remarks }}</p>
        </div>
        <div class="directory" v-else-if="activeIndex == 2">
          <div class="block" v-for="(item, index) in coursewares" :key="index">
            <div class="img"></div>
            <div class="introduce">
              <h3>{{ index + 1 > 9 ? (index + 1 + ' ' + item.title) : ('0' + (index + 1 + ' ' + item.title))}}
                <i :class="item.state == '已通过' ? 'through' : item.state == '未通过' ? 'nothrough' : 'nofinish'" v-if="own">{{ item.status }}</i>
              </h3>
              <p>{{ item.remarks }}</p>
            </div>
            <div class="video">
              <div class="title">
                <i class="el-icon-video-play"></i>
                <h4>{{ item.title }}</h4>
                <p>({{ time(item.endTime - item.stratTime) }})</p>
              </div>
              <div>
                <el-button plain @click="play(item.urlAddr)">播放课件</el-button>
                <el-button plain @click="play(item.urlVideo)" v-if="own">成果</el-button>
                <el-button plain @click="assess(item.id, item.projectId)" v-if="own">考核</el-button>
                <el-button plain v-if="own" @click="history(item.id, item.projectId)">历史记录</el-button>
              </div>
            </div>
          </div>
          <el-dialog
            :visible.sync="dialogVisible"
            destroy-on-close
            width="100%">
            <div id="MPSplayer"></div>
          </el-dialog>
        </div>
        <div class="comments" v-else>
          <div class="summary">
            <div>好评度<i>95%</i></div>
            <el-radio-group v-model="radio">
              <el-radio :label="1">全部评价（）</el-radio>
              <el-radio :label="2">好评（）</el-radio>
              <el-radio :label="3">中评（）</el-radio>
              <el-radio :label="4">差评（）</el-radio>
            </el-radio-group>
          </div>
          <div class="evaluations">
            <div class="evaluation" v-for="(item, index) in evaluations" :key="index">
              <div class="avatar"><el-avatar src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"></el-avatar></div>
              <div class="substance">
                <div>
                  <h4>用户名</h4>
                  <el-rate
                    v-model="value"
                    disabled
                    show-score
                    text-color="#ff9900"
                    score-template="{value}">
                  </el-rate>
                  <i>2021-04-02 12:00</i>
                </div>
                <i>已学习 21小时时评价</i>
                <p>干货满满，卢老师讲课的节奏很赞，不容易犯困，干货很多，练习也很多，就是需要多实操！实践出真知！干货满满，卢老师讲课的节奏很赞，不容易犯困，干货很多，练习也很多，就是需要多实操！实践出真知！干货满满，卢老师讲课的节奏很赞，不容易犯困，干货很多，练习也很多，就是需要多实操！实践出真知！</p>
              </div>
            </div>
          </div>
        </div>
      </div>
  </div>
</template>

<script>
  import { mapState, mapMutations } from 'vuex'
  import { getSubjectInfo, getCoursewareList, addExam } from '@/api/studentcourse'
  export default {
    components: {
    },
    data() {
      return {
        courseInfo: '',
        coursewares: [],
        radio: 3,
        value: 3.7,
        dialogVisible: false,
        url: '',
        evaluations: [
          {
            avatar: ''
          },
          {
            avatar: ''
          },
          {
            avatar: ''
          }
        ]
      };
    },
    computed: {
      ...mapState([
          'user',
          'own',
          'activeIndex',
      ])
    },
    methods: {
      ...mapMutations([
            'CHANGE_ACTIVEINDEX',
            'CHANGE_COURSEWAREID',
            'CHANGE_RECORD',
            'CHANGE_URL',
            'CHANGE_SUBJECTID',
            'CHANGE_PROJECTID',
            'CHANGE_EXAMID',
            'CHANGE_PARENTPROJECTID'
      ]),
      handleSelect(key) {
          this.CHANGE_ACTIVEINDEX(key)
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
      assess(id, parentProjectId) {
        const data = {
          token: this.user.Token,
          subjectId: this.$route.query.id,
          coursewareId: id,
          parentProjectId
        }
        addExam(data).then(res => {
          if(res.flag == 100) {
            this.CHANGE_RECORD(true)
            this.CHANGE_COURSEWAREID(id)
            this.CHANGE_PROJECTID(res.data.projectId)
            this.CHANGE_PARENTPROJECTID(parentProjectId)
            this.CHANGE_EXAMID(res.data.id)
            this.CHANGE_URL(res.data.project.pageUrl)
            this.$router.push('production')
          }else {
            this.$message.error(res.flagString);
          }
        })
      },
      history(id, parentProjectId) {
        this.CHANGE_COURSEWAREID(id)
        this.CHANGE_PARENTPROJECTID(parentProjectId)
        this.$router.push('history')
      },
      time(time) {
        var h = Math.floor(time/3600) > 9 ? Math.floor(time/3600) : '0' + Math.floor(time/3600)
        var m = Math.floor(time%3600/60) > 9 ? Math.floor(time%3600/60) : '0' + Math.floor(time%3600/60)
        var s = Math.floor(time%60) > 9 ? Math.floor(time%60) : '0' + Math.floor(time%60)
        return h + ':' + m + ':' + s
      }
    },
    mounted() {
      const data = {
        token: this.user.Token,
        id: this.$route.query.id
      }
      const data1 = {
        token: this.user.Token,
        subjectId: this.$route.query.id
      }
      getSubjectInfo(data).then(res => {
        if(res.flag == 100) {
          this.courseInfo = res.data
          this.CHANGE_SUBJECTID(res.data.id)
        }else {
          this.$message.error(res.flagString);
        }
      })
      getCoursewareList(data1).then(res => {
        if(res.flag == 100) {
          this.coursewares = res.data
        }else {
          this.$message.error(res.flagString);
        }
      })
    }
  }
</script>

<style lang="scss">
#courseCatalog {
    height: 95%;
    border-radius: 10px;
    position: relative;
    display: flex;
    flex-direction: column;
    background: white;
    
    .head {
        padding: 30px 0 0;
        width: 1332px;
        margin: auto;
        text-align: left;
        position: relative;

        .title {
            display: flex;
            margin-bottom: 13px;
            line-height: 27px;
            position: relative;

            span {
              margin: 3.5px 13px;
            }
            
            .el-button {
              position: absolute;
              z-index: 5;
              right: 40px;
              top: 10px;
              background: #C8C8C8;
              border: none;
            }
        }

        .details {
          margin-bottom: 30px;

          i {
            margin-right: 30px;
          }
        }

        .el-menu {
            display: flex;
            justify-content: center;

            .is-active {
              color: #1890FF;
              font-weight: bold;
            }
        }
    }

    .content {
      flex: 1;
      width: 1332px;
      margin: 30px auto;
      overflow: auto;

      &::-webkit-scrollbar {
        display: none;
      }

      .overview {
        text-align: left;
        display: flex;

        label {
          flex: 1;
          color: #666666;
        }

        p {
          width: 95%;
          color: #333333;
        }
      }

      .directory {

        .block {
          width: 90%;
          margin: auto;
          margin-bottom: 30px;

          .img {
            display: inline-block;
            width: 20%;
            height: 100px;
            background: url('../../assets/img/img.jpeg');
          }

          .introduce {
            display: inline-block;
            width: 80%;
            height: 100px;
            vertical-align: top;
            text-align: left;
            padding-left: 30px;

            h3 {
              margin-bottom: 14px;

              i {
                margin-left: 5px;
                font-size: 12px;
                font-weight: normal;

                &.through {
                  color: #019F04;
                }

                &.nothrough {
                  color: #FF4B4B;
                }

                &.nofinish {
                  color: #737373;
                }
              }
            }

            p {
              font-size: 12px;
            }
          }

          .video {
            width: 100%;
            height: 60px;
            background: #F8F8F8;
            margin-top: 30px;
            padding: 0 30px;
            display: flex;
            justify-content: space-between;
            align-items: center;

            .title {
              display: flex;
              line-height: 28px;

              i {
                font-size: 28px;
              }

              h4 {
                padding: 0 10px;
              }
            }
          }
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

      .comments {

        .summary {
          display: flex;
          justify-content: space-between;
          align-items: center;

          i {
            color: #F78900;
            margin-left: 10px;
            font-size: 30px;
          }
        }

        .evaluations {

          .evaluation {
            margin-top: 30px;
            padding: 30px;
            border-top: 1px solid #EEEEEE;
            display: flex;

            .substance {
              margin-left: 20px;
              text-align: left;
              font-size: 12px;

              >div {
                display: flex;
                position: relative;

                h4 {
                  margin-right: 10px;
                  line-height: 20px;
                }

                >i {
                  position: absolute;
                  right: 0;
                  line-height: 20px;
                  color: #898989;
                }
              }

              >i {
                display: block;
                color: #898989;
                margin: 5px 0 15px;
              }
            }
          }
        }
      }
    }
}

</style>