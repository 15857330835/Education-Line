<template>
  <div id="account">
    <div class="search">
      <label>登录账号：</label>
      <el-input v-model="input" placeholder="请输入内容"></el-input>
      <label>姓名：</label>
      <el-input v-model="input" placeholder="请输入内容"></el-input>
      <label>角色：</label>
      <el-input v-model="input" placeholder="请输入内容"></el-input>
      <label>状态：</label>
      <el-input v-model="input" placeholder="请输入内容"></el-input>
      <el-button type="primary">查询</el-button>
      <el-button>重置</el-button>
    </div>
    <div class="operation">
      <el-button type="primary">新增账号</el-button>
    </div>
    <div class="content">
      <el-table
        :data="tableData"
        style="width: 100%"
        :default-sort = "{prop: 'date', order: 'descending'}"
        >
        <el-table-column prop="ID" label="ID"></el-table-column>
        <el-table-column prop="name" label="姓名"></el-table-column>
        <el-table-column prop="accout" label="登录账号"></el-table-column>
        <el-table-column prop="role" label="角色"></el-table-column>
        <el-table-column prop="state" label="状态"></el-table-column>
        <el-table-column label="操作">
          <el-button type="text" size="mini" @click="handleEdit">查看</el-button>
          <el-button type="text" size="mini" @click="handleEdit">编辑</el-button>
          <el-button type="text" size="mini" @click="handleEdit">禁用</el-button>
          <el-button type="text" size="mini" @click="handleEdit">删除</el-button>
          <el-button type="text" size="mini" @click="handleEdit">重置密码</el-button>
        </el-table-column>
      </el-table>
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
  export default {
    data() {
      return {
        input: '',
        value2: '',
        currentPage4: 4,
        pickerOptions: {
          shortcuts: [{
            text: '今天',
            onClick(picker) {
              picker.$emit('pick', new Date());
            }
          }, {
            text: '昨天',
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24);
              picker.$emit('pick', date);
            }
          }, {
            text: '一周前',
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit('pick', date);
            }
          }]
        },
        tableData: [{
          ID: 'title',
          name: '简介',
          accout: '30:12',
          role: '陈振兴',
          state: '已完成'
        }
        ]
      };
    },
    methods: {
      handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
      },
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
      },
      handleEdit() {

      }
    },
    mounted() {
      
    }
  }
</script>

<style lang="scss">
#account {
    height: 90%;
    background: white;
    border-radius: 10px;
    position: relative;
    padding: 30px;
    display: flex;
    flex-direction: column;

    .search {
      display: flex;
      margin-bottom: 30px;

      label {
        line-height: 40px;
      }

      .el-input {
        width: unset;
        margin-right: 30px;
      }
    }

    .operation {
      text-align: left;
      margin-bottom: 30px;

      button {
        margin-right: 20px;
      }
    }

    .content {
      flex: 1;
      display: flex;
    }
}


</style>