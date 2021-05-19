<template>
  <div id="allCourses">
    <div class="search">
      <div>
        <label>工具：</label>
        <i v-for="(item, index) in classify" :key="index" :class="item == classifying ? 'active' : ''" @click="selectclassify(item)">{{ item }}</i>
      </div>
      <div>
        <label>上下线：</label>
        <i v-for="(item, index) in ifOnline" :key="index" :class="item == online1 ? 'active' : ''" @click="selectifOnline(item)">{{ item }}</i>
      </div>
      <div>
        <label>课程：</label>
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
      <el-button type="primary" plain size="mini" @click="allChoose">全选</el-button>
      <el-button type="primary" plain size="mini">批量复制</el-button>
      <el-button type="primary" plain size="mini">黏贴</el-button>
    </div>
    <div class="content">
      <div class="course" v-for="(course, index) in courses" :key="index">
        <div class="top" :style="{backgroundImage: `url(${course.coverAddr})`}">
          <el-button size="mini" icon="el-icon-check" class="choice" circle @click="choose($event)"></el-button>
          <el-tag effect="dark" size="mini">{{ course.label }}</el-tag>
          <p class="title">{{ course.title }}</p>
          <el-tooltip class="item" popper-class="prompt" effect="dark" content="Top Left 提示文字" placement="top">
            <p class="intro">{{ course.remarks }}</p>
          </el-tooltip>
        </div>
        <div class="center">
          <p>学习周期：{{ course.period }}天 | 8课时</p>
          <p>创建时间：{{ formatDate(course.createtime) }}</p>
        </div>
        <div class="bottom">
            <div>
              <p>已有18051人订阅</p>
              <p>好评度 95%</p>
            </div>
            <!-- <div v-if="course.priceStatus">
              <i class="discount">￥{{ course.priceDiscount }}</i>
              <i class="original">原价￥{{ course.price }}</i>
            </div> -->
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
        layout="total, prev, pager, next, jumper">
      </el-pagination>
    </div>
  </div>
</template>

<script>
  import { mapState } from 'vuex'
  import { getSubjectList } from '@/api/institutioncourse'
  import { getToolList } from '@/api/tool'
  export default {
    data() {
      return {
        classify: ['全部'],
        ifOnline: ['全部', '上线', '下线'],
        classifying: '全部',
        online1: '全部',
        stime: '',
        label: [],
        title: '',
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
        currentPage: 1,
        courses: [],
        tool: []
      };
    },
    computed: {
      ...mapState([
          'user',
      ])
    },
    methods: {
      selectclassify(value) {
        this.classifying = value
        this.search()
      },
      selectifOnline(value) {
        this.online1 = value
        this.search()
      },
      handleCurrentChange(val) {
        this.currentPage = val
        this.search()
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
      reset() {
        this.classifying = '全部'
        this.online1 = '全部'
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
        const tool = this.tool.filter(item => item.title == this.classifying)[0]
        const data = {
          token: this.user.Token,
          page: this.currentPage,
          status: this.online1 == '全部' ? -1 : this.online1 == '上线' ? 0 : 1,
          toolId: tool ? tool.id : -1
        }
        if(this.ifSearch) {
          data.title = this.title
          data.stime = this.stime ? this.stime.getTime()/1000 : ''
          data.label = this.label.join(',')
        }
        getSubjectList(data).then(res => {
          if(res.flag == 100) {
            this.courses = res.data
          }else {
            this.$message.error(res.flagString);
          }
        })
      },
      refresh() {
        const data = {
          token: this.user.Token
        }
        getSubjectList(data).then(res => {
          if(res.flag == 100) {
            this.courses = res.data
          }else {
            this.$message.error(res.flagString);
          }
        })
      },
      formatDate(value) {
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
#allCourses {
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
      background: white;
      text-align: left;

      >div {
        width: 1332px;
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
      width: 1332px;
      margin: 15px auto;

      button {
        margin-right: 20px;
      }
    }

    .content {
      flex: 1;
      display: flex;
      width: 1332px;
      margin: auto;
      flex-wrap: wrap;

      .course {
        border: 1px solid rgb(242, 242, 242);
        border-radius: 10px;
        height: 360px;
        width: 316px;
        font-size: 12px;
        color: #666666;
        margin: 0 8px 15px;
        background: white;
        position: relative;
        cursor: pointer;

        &:hover {
          box-shadow: 0 0 5px 1px #c2b8b8;
        }

        .top {
          background: center/cover;
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
}

</style>