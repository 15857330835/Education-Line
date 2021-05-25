<template>
  <div id="account">
    <div id="content">
    <div class="search">
      <div>
        <label>角色：</label>
        <i v-for="(item, index) in roles" :key="index" :class="item == role ? 'active' : ''" @click="selectrole(item)">{{ item }}</i>
      </div>
      <div>
        <label>状态：</label>
        <i v-for="(item, index) in use" :key="index" :class="item == using ? 'active' : ''" @click="selectusing(item)">{{ item }}</i>
      </div>
      <div>
        <label>账号：</label>
        <el-input v-model="username" size="mini" placeholder="请输入内容"></el-input>
        <label>姓名：</label>
        <el-input v-model="name" size="mini" placeholder="请输入内容"></el-input>
        <el-button type="primary" size="mini" @click="query">查询</el-button>
        <el-button size="mini" @click="reset">重置</el-button>
      </div>
    </div>
    <div class="operation">
      <el-button type="primary" size="mini" @click="create">新增账号</el-button>
      <!-- <el-button plain size="mini">批量删除</el-button> -->
    </div>
    <div class="content">
      <el-table
        :data="tableDatas"
        style="width: 100%"
        height="100%"
        :header-cell-style="{'font-weight': 'bold', 'background-color': '#F8F8F8'}"
        :default-sort = "{prop: 'date', order: 'descending'}"
        >
        <el-table-column align="center" prop="id" label="ID"></el-table-column>
        <el-table-column align="center" prop="name" label="姓名"></el-table-column>
        <el-table-column align="center" prop="username" label="登录账号"></el-table-column>
        <el-table-column align="center" label="角色">
          <template slot-scope="scope">
            {{ scope.row.type == 1 ? '老师' : '学生' }}
          </template>
        </el-table-column>
        <el-table-column align="center" label="工具权限">
          <template slot-scope="scope">
            <el-tag type="info" size="mini" v-for="(item, index) in scope.row.power" :key="index">{{ item.title }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column align="center" label="状态">
          <template slot-scope="scope">
            {{ scope.row.status ? '禁用' : '启用' }}
          </template>
        </el-table-column>
        <el-table-column align="center" width="250" label="操作">
          <template slot-scope="scope">
            <el-button type="text" size="mini" @click="view(scope.row)">查看</el-button>
            <el-button type="text" size="mini" @click="edit(scope.row)" :disabled='scope.row.status ? false : true' v-if="scope.row.type == 1">编辑</el-button>
            <el-button type="text" size="mini" @click="ifUse(scope.row.id, scope.row.status)" :class="scope.row.status ? 'enable' : 'disable'">{{ scope.row.status ? '启用' : '禁用' }}</el-button>
            <el-button type="text" size="mini" @click="Initialize(scope.row.id)" :disabled='scope.row.status ? false : true'>重置密码</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-dialog title="新增账号" :visible.sync="dialogFormVisible1">
        <el-form :model="form1">
          <el-form-item label="姓名：" :label-width="formLabelWidth">
            <el-input v-model="form1.name" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="角色：" :label-width="formLabelWidth">
            <el-select v-model="form1.type" placeholder="请选择">
              <el-option
                v-for="item in types"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="工具权限：" :label-width="formLabelWidth" v-if="form1.type == 1">
            <el-select
              v-model="form1.power"
              multiple
              collapse-tags
              style="margin-left: 20px;"
              placeholder="请选择">
              <el-option
                v-for="item in opt"
                :key="item.id"
                :label="item.title"
                :value="item.id">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="登录账号：" :label-width="formLabelWidth">
            <el-input v-model="form1.username" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="登录密码：" :label-width="formLabelWidth">
            <el-input v-model="form1.passwd" autocomplete="off" show-password></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible1 = false">取 消</el-button>
          <el-button type="primary" @click="add">确 定</el-button>
        </div>
      </el-dialog>
      <el-dialog
        title="查看"
        class="view"
        :visible.sync="dialogVisible"
        width="30%"
        >
        <div><label>姓名：</label><span>{{ this.row.name }}</span></div>
        <div><label>角色：</label><span>{{ this.row.type == 1 ? '老师' : '学生' }}</span></div>
        <div v-if="this.row.type == 1"><label>工具权限：</label><el-tag type="info" size="mini" v-for="(item, index) in this.row.power" :key="index">{{ item.title }}</el-tag></div>
        <div><label>登录账户：</label><span>{{ this.row.username }}</span></div>
        <div><label>状态：</label><span :class="this.row.status ? 'disable' : 'enable'">{{ this.row.status ? '禁用' : '启用' }}</span></div>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
        </span>
      </el-dialog>
      <el-dialog
        title="编辑"
        class="view"
        :visible.sync="dialogVisible1"
        width="30%"
        >
        <div><label>工具权限：</label>
            <el-select
              v-model="power"
              multiple
              collapse-tags
              style="margin-left: 20px;"
              placeholder="请选择">
              <el-option
                v-for="item in opt"
                :key="item.id"
                :label="item.title"
                :value="item.id">
              </el-option>
            </el-select>
        </div>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible1 = false">取 消</el-button>
          <el-button type="primary" @click="modify">确 定</el-button>
        </span>
      </el-dialog>
    </div>
    <div class="bottom">
      <el-pagination
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        layout="total, prev, pager, next, jumper">
      </el-pagination>
    </div>
    </div>
  </div>
</template>

<script>
  import { mapState } from 'vuex'
  import { getAccountList, addAccount, updateStatus, updatePassword, updatePower } from '@/api/account'
  import { getToolList } from '@/api/tool'
  export default {
    data() {
      return {
        roles: ['全部', '老师', '学生'],
        use: ['全部', '启用', '禁用'],
        role: '全部',
        using: '全部',
        username: '',
        name: '',
        ifSearch: false,
        currentPage: 1,
        dialogFormVisible1: false,
        dialogVisible: false,
        dialogVisible1: false,
        form1: {
          name: '',
          type: '',
          power: [],
          username: '',
          passwd: ''
        },
        row: [],
        id: '',
        power: '',
        types: [{
          value: '2',
          label: '学生'
        },{
          value: '1',
          label: '老师'
        }],
        opt: [],
        formLabelWidth: '30%',
        tableDatas: []
      };
    },
    computed: {
      ...mapState([
          'user',
      ])
    },
    methods: {
      selectrole(value) {
        this.role = value
        this.search()
      },
      selectusing(value) {
        this.using = value
        this.search()
      },
      handleCurrentChange(val) {
        this.currentPage = val
        this.search()
      },
      create() {
        this.dialogFormVisible1 = true
      },
      add() {
        this.form1.token = this.user.Token
        addAccount(this.form1).then(res => {
          if(res.flag == 100) {
            this.dialogFormVisible1 = false
            this.reset()
          }else {
            this.$message.error(res.flagString);
          }
        })
      },
      query() {
        this.ifSearch = true
        this.search()
      },
      reset() {
        this.role = '全部'
        this.using = '全部'
        this.username = ''
        this.name = ''
        this.currentPage = 1
        this.ifSearch = false
        this.search()
      },
      refresh() {
        const data = {
          token: this.user.Token,
          page: this.currentPage
        }
        getAccountList(data).then(res => {
          if(res.flag == 100) {
            this.tableDatas = res.data
          }else {
            this.$message.error(res.flagString);
          }
        })
      },
      search() {
        const data = {
          token: this.user.Token,
          page: this.currentPage,
          status: this.using == '全部' ? -1 : this.using == '启用' ? 0 : 1,
          type: this.role == '全部' ? -1 : this.role == '老师' ? 1 : 2
        }
        if(this.ifSearch) {
          data.username = this.username
          data.name = this.name
        }
        getAccountList(data).then(res => {
          if(res.flag == 100) {
            this.tableDatas = res.data
          }else {
            this.$message.error(res.flagString);
          }
        })
      },
      view(row) {
        this.dialogVisible = true
        this.row = row
      },
      edit(row) {
          this.dialogVisible1 = true
          let arr = []
          row.power.forEach(item => arr.push(item.id))
          this.id = row.id
          this.power = arr
      },
      modify() {
          const data = {
            id: this.id,
            token: this.user.Token,
            power: this.power
          }
          updatePower(data).then(res => {
            if(res.flag == 100) {
              this.dialogVisible1 = false
              this.refresh()
            }else {
              this.$message.error(res.flagString);
            }
          })
      },
      ifUse(id, status) {
        const data = {
          id,
          token: this.user.Token,
          status: status ? 0 : 1
        }
        updateStatus(data).then(res => {
          if(res.flag == 100) {
            this.refresh()
          }else {
            this.$message.error(res.flagString);
          }
        })
      },
      Initialize(id) {
        const data = {
          id,
          token: this.user.Token,
        }
        updatePassword(data).then(res => {
          if(res.flag == 100) {
            this.refresh()
          }else {
            this.$message.error(res.flagString);
          }
        })
      }
    },
    mounted() {
      this.refresh()
      const data = {
        token: this.user.Token
      }
      getToolList(data).then(res => {
        if(res.flag == 100) {
          this.opt =  res.data
        }else {
          this.$message.error(res.flagString);
        }
      })
    }
  }
</script>

<style lang="scss">
#account {
    height: 95%;
    background: white;

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

      .el-table {

        &::before {
          display: none;
        }
      }

      .el-dialog {
        width: 30%;
        border-radius: 10px;
        text-align: left;

        .el-input {
          width: 220px;
        }

        .el-select {
          margin-left: 0 !important;
        }
      }

      .view {

        .el-dialog__body {
          padding-left: 20%;

          >div {
            margin: 10px 0;

            label {
              display: inline-block;
              width: 100px;
            }
          }
        }
      }

      .disable {
        color: #E02020;
      }

      .enable {
        color: #008D26;
      }
    }
}


</style>