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
      <div class="course" v-for="(course, index) in courses" :key="index" @click="goto($event, 'courseCatalog')">
        <div class="top">
          <el-tag effect="dark" size="mini">新入职</el-tag>
          <p class="title">111</p>
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
            <div>
              <p>已有18051人订阅</p>
              <p>好评度 95%</p>
            </div>
            <div>
              <i class="original">￥80</i>
              <i class="discount">￥50</i>
            </div>
          </div>
        </div>
        <div class="mask" @click="buy($event)">立即购买</div>
      </div>
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
        delState: false,
        currentPage4: 4,
        courses: [
          {
            title: 111
          },
          {
            title: 111
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
        this.$router.push(address)
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
        border-radius: 5px;
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

          span {
            position: absolute;
            top: 10px;
            right: 10px;
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

          >div {
            display: flex;
            line-height: 24px;
            justify-content: space-between;
          }

          i {
            line-height: 48px;

            &.original {
              font-size: 16px;
              text-decoration: line-through;
              color: #c3c5c7;
            }

            &.discount {
              font-size: 24px;
              color: red;
            }
          }
        }

        .mask {
          width: 100%;
          height: 80px;
          background: lightblue;
          position: absolute;
          bottom: 0;
          left: 0;
          color: white;
          line-height: 80px;
          cursor: pointer;
          display: none;
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