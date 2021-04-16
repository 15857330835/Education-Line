<template>
  <div id="assess">
    <div id="content">
    <el-menu :default-active="state" class="el-menu-demo" mode="horizontal" @select="handleSelect">
      <el-menu-item index="course">课程</el-menu-item>
      <el-menu-item index="courseware">课件</el-menu-item>
    </el-menu>
    <div class="search">
      <div>
        <label>状态：</label>
        <i v-for="(item, index) in status" :key="index" :class="item == status1 ? 'active' : ''" @click="select(item)">{{ item }}</i>
      </div>
      <div>
        <label>姓名：</label>
        <el-input v-model="input" size="mini" placeholder="请输入内容"></el-input>
        <div style="display: inline-block" v-if="state == 'courseware'">
          <label>标题：</label>
          <el-input v-model="input" size="mini" placeholder="请输入内容"></el-input>
        </div>
        <label>提交时间：</label>
        <el-date-picker
          v-model="value2"
          size="mini"
          type="datetime"
          placeholder="选择日期时间"
          align="right">
        </el-date-picker>
        <el-button type="primary" plain round size="mini">查询</el-button>
        <el-button type="primary" plain round size="mini">重置</el-button>
      </div>
    </div>
    <div class="content">
      <el-table
        v-if="state == 'course'"
        :data="tableData"
        style="width: 100%"
        :header-cell-style="{'font-weight': 'bold', 'background-color': '#F8F8F8'}"
        :default-sort = "{prop: 'date', order: 'descending'}"
        >
        <el-table-column align="center" prop="name" label="姓名"></el-table-column>
        <el-table-column align="center" prop="inspectionTime" label="考核时长"></el-table-column>
        <el-table-column align="center" prop="submitTime" label="提交时间" sortable></el-table-column>
        <el-table-column align="center" label="状态">
          <template slot-scope="scope">
            <span :class="scope.row.state == '已通过' ? 'through' : scope.row.state == '未通过' ? 'nothrough' : 'nofinish'">{{ scope.row.state }}</span>
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
        :header-cell-style="{'font-weight': 'bold', 'background-color': '#F8F8F8'}"
        :default-sort = "{prop: 'date', order: 'descending'}"
        >
        <el-table-column align="center" prop="name" label="姓名"></el-table-column>
        <el-table-column align="center" prop="title" label="标题"></el-table-column>
        <el-table-column align="center" prop="inspectionTime" label="考核次数"></el-table-column>
        <el-table-column align="center" label="提交时间" sortable>
          <template slot-scope="scope">
            <span>{{ scope.row.submitTime }}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" label="状态">
          <template slot-scope="scope">
            <span :class="scope.row.state == '已通过' ? 'through' : scope.row.state == '未通过' ? 'nothrough' : 'nofinish'">{{ scope.row.state }}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" label="操作">
          <el-button type="text" size="mini" @click="handleEdit">批阅</el-button>
          <el-button type="text" size="mini" @click="handleEdit">成果</el-button>
        </el-table-column>
      </el-table>
    </div>
    <div class="bottom">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="this.currentPage"
        :page-sizes="[4, 6, 8, 10]"
        :page-size="10"
        layout="total, sizes, prev, pager, next, jumper"
        :total="50">
      </el-pagination>
    </div>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        status: ['全部', '已通过', '未通过', '未完成'],
        status1: '全部',
        state: 'course',
        input: '',
        value2: '',
        coursePage: 1,
        coursewarePage: 1,
        tableData: [{
          name: '陈振兴',
          title: 'title',
          inspectionTime: '30:12',
          submitTime: '2020-02-21',
          state: '已通过',
          score: '36'
        },
        {
          name: '陈振兴',
          title: 'title',
          inspectionTime: '30:12',
          submitTime: '2020-02-21',
          state: '未通过',
          score: '80'
        },
        {
          name: '陈振兴',
          title: 'title',
          inspectionTime: '30:12',
          submitTime: '2020-02-21',
          state: '未完成',
          score: '30'
        }
        ]
      };
    },
    computed: {
      currentPage() {
        return this.state == 'course' ? this.coursePage : this.coursewarePage
      }
    },
    methods: {
      select(value) {
        this.status1 = value
      },
      handleSelect(key) {
        this.state = key
      },
      handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
      },
      handleCurrentChange(val) {
        this.state == 'course' ? this.coursePage = val : this.coursewarePage = val
      },
      handleEdit() {

      }
    },
    mounted() {
      
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
        width: 120px;
      }

      .el-input {
        width: 128px;
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
    }

    .bottom {
        height: 70px;
    }
}

</style>