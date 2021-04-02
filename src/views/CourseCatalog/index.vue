<template>
  <div id="courseCatalog">
      <div class="head">
          <div class="title">
              <h2>新入职员工考核</h2>
              <el-tag effect="dark" size="mini">新入职</el-tag>
              <i>奥点教育</i>
              <el-button type="info">信息按钮</el-button>
          </div>
          <div class="details">
              <p><i>最近在学  2003人</i><i>累计订阅 218215人</i><i>好评度100%</i><i>8课时</i><i>学习周期3天</i></p>
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
          <p>《财政学》：也称《政府经济学》，它是经济学中的一个分支。其研究对象是政府经济行为的规律。它主要回答政府为什么要介入人们的经济生活、是怎样介入、介入之后对人们的经济行为会产生什么样的影响以及应该怎样介入等基本问题。它通常包括基础理论、财政支出、财政收入、财政政策和财政体制等四个方面的内容。财政学是财经类专业的学生必修的专业基础课程之一。</p>
        </div>
        <div class="directory" v-else-if="activeIndex == 2">
          <div class="block" v-for="(item, index) in coursewares" :key="index">
            <div class="img"></div>
            <div class="introduce">
              <h3>{{ index + 1 > 9 ? (index + 1 + item.title) : ('0' + (index + 1 + item.title))}}
                <i :class="item.state == '已通过' ? 'through' : item.state == '未通过' ? 'nothrough' : 'nofinish'" v-if="$route.fullPath == '/courseCatalog?2'">{{ item.state }}</i>
              </h3>
              <p>{{ item.text }}</p>
            </div>
            <div class="video">
              <div class="title">
                <i class="el-icon-video-play"></i>
                <h4>{{ item.title }}</h4>
                <p>({{ item.time }})</p>
              </div>
              <div>
                <el-button plain>播放课件</el-button>
                <el-button plain v-if="$route.fullPath == '/courseCatalog?2'">成果</el-button>
                <el-button plain v-if="$route.fullPath == '/courseCatalog?2'">考核</el-button>
                <el-button plain v-if="$route.fullPath == '/courseCatalog?2'" @click="history">历史记录</el-button>
              </div>
            </div>
          </div>
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
  export default {
    components: {
    },
    data() {
      return {
        coursewares: [
          {
            title: '课件',
            state: '已通过',
            text: '这是课件介绍这是课件介绍这是课件介绍这是课件介绍这是课件介绍这是课件介绍这是课件介绍这是课件介绍这是课件介绍这是课件介绍',
            img: '',
            time: '8分20秒'
          },
          {
            title: '课件',
            state: '未通过',
            text: '这是课件介绍这是课件介绍这是课件介绍这是课件介绍这是课件介绍这是课件介绍这是课件介绍这是课件介绍这是课件介绍这是课件介绍',
            img: '',
            time: '8分20秒'
          },
          {
            title: '课件',
            state: '未完成',
            text: '这是课件介绍这是课件介绍这是课件介绍这是课件介绍这是课件介绍这是课件介绍这是课件介绍这是课件介绍这是课件介绍这是课件介绍',
            img: '',
            time: '8分20秒'
          }
        ],
        radio: 3,
        value: 3.7,
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
          'activeIndex',
      ])
    },
    methods: {
      ...mapMutations([
            'CHANGE_ACTIVEINDEX',
      ]),
      handleSelect(key) {
          this.CHANGE_ACTIVEINDEX(key)
      },
      history() {
        this.$router.push('history')
      }
    },
    mounted() {
      
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
    
    .head {
        padding: 30px 15% 0;
        background: white;
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

            i {
              color: #1890FF;
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
      background: white;
      padding: 30px 15% 0;

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