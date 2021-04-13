<template>
  <div id="allCourses">
    <div class="search">
      <div>
        <label>工具：</label>
        <i v-for="(item, index) in classify" :key="index" :class="item == options.classify ? 'active' : ''" @click="select('classify', item)">{{ item }}</i>
      </div>
      <div>
        <label>上下线：</label>
        <i v-for="(item, index) in ifOnline" :key="index" :class="item == options.ifOnline ? 'active' : ''" @click="select('ifOnline', item)">{{ item }}</i>
      </div>
      <div>
        <label>标签：</label>
        <el-select
            v-model="value3"
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
    <div class="operation">
      <el-button type="primary" plain size="mini" @click="allChoose">全选</el-button>
      <el-button type="primary" plain size="mini">批量复制</el-button>
      <el-button type="primary" plain size="mini">黏贴</el-button>
    </div>
    <div class="content">
      <div class="course" v-for="(course, index) in courses" :key="index">
        <div class="top">
          <el-button size="mini" icon="el-icon-check" class="choice" circle @click="choose($event)"></el-button>
          <el-tag effect="dark" size="mini">新入职</el-tag>
          <p class="title">{{ course.title }}</p>
          <el-tooltip class="item" popper-class="prompt" effect="dark" content="Top Left 提示文字" placement="top">
            <p class="intro">这里是描述这里是描述这里是述这里是描述这描述这里是描述</p>
          </el-tooltip>
        </div>
        <div class="center">
          <p>学习周期：3天 | 8课时<i>奥点教育</i></p>
          <p>创建时间：2020-12-30 12:54:00</p>
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
        <div class="mask">
          复制
        </div>
      </div>
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
  import { getSubjectList } from '@/api/institutioncourse'
  export default {
    data() {
      return {
        classify: ['全部', '云非编', '云导播', '云精剪'],
        ifOnline: ['全部', '上线', '下线'],
        value: [],
        value3: [],
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
        courses: []
      };
    },
    computed: {
      ...mapState([
          'user',
          'options',
      ])
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
      goto(e, address, data) {
        e.stopPropagation()
        this.$router.push({path: address, query: {data}})
      },
      choose(e) {
        e.stopPropagation()
        $(e.target).toggleClass('choose')
      },
      allChoose() {
        if($('.choice>i').hasClass('choose')){
          $('.choice>i').removeClass('choose')
        }else {
          $('.choice>i').addClass('choose')
        }
      },
      refresh() {
        const data = {
          token: this.user.Token
        }
        getSubjectList(data).then(res => {
          if(res.Flag == 100) {
            this.courses = res.data
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
#allCourses {
    height: 95%;
    border-radius: 10px;
    position: relative;
    display: flex;
    flex-direction: column;

    .search {
      padding: 15px 15%;
      margin-bottom: 15px;
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
        width: 120px;

        &.label {
          width: 200px;
        }
      }

      .el-input {
        width: unset;
        margin-right: 30px;
      }
    }

    .operation {
      text-align: right;
      margin-bottom: 15px;
      padding: 0 15%;

      button {
        margin-right: 20px;
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

          .el-button {
            position: absolute;
            top: 10px;
            left: 10px;
            padding: 1px;
            background: rgba($color: #000000, $alpha: 0.5);
            border: none;
            color: white;
            width: 26px;
            height: 26px;

            .choose {
              color: lightblue;
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

          p {
            text-align: left;
            margin-bottom: 5px;
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
          background: white;
          position: absolute;
          bottom: 0;
          left: 0;
          color: lightcoral;
          line-height: 80px;
          cursor: pointer;
          display: none;
          border-radius: 10px;
        }

        &:hover {

          .mask {
            display: block;
          }
        }
      }
    }

    >.bottom {
        height: 70px;
    }
}

</style>