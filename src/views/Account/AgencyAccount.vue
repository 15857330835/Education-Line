<template>
  <div id="agencyAccount">
    <div class="search">
      <div>
        <label>状态：</label>
        <i v-for="(item, index) in use" :key="index" :class="item == options.use ? 'active' : ''" @click="select('use', item)">{{ item }}</i>
      </div>
      <div>
        <label>账号：</label>
        <el-input v-model="input" size="mini" placeholder="请输入内容"></el-input>
        <label>机构：</label>
        <el-input v-model="input1" size="mini" placeholder="请输入内容"></el-input>
        <label>工具权限：</label>
        <el-select v-model="input2" size="mini" placeholder="请选择">
          <el-option
            v-for="item in opt"
            :key="item.id"
            :label="item.title"
            :value="item.id">
          </el-option>
        </el-select>
        <el-button type="primary" size="mini">查询</el-button>
        <el-button size="mini" @click="reset">重置</el-button>
      </div>
    </div>
    <div class="operation">
      <el-button type="primary" size="mini" @click="create">新增账号</el-button>
      <!-- <el-button plain size="mini">批量删除</el-button> -->
    </div>
    <div class="content">
      <el-table
        :data="this.tableData"
        style="width: 100%"
        :header-cell-style="{'font-weight': 'bold', 'background-color': '#F8F8F8'}"
        :default-sort = "{prop: 'date', order: 'descending'}"
        >
        <el-table-column align="center" prop="id" label="ID"></el-table-column>
        <el-table-column align="center" prop="name" label="机构"></el-table-column>
        <el-table-column align="center" prop="username" label="登录账号"></el-table-column>
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
            <el-button type="text" size="mini" @click="handleEdit" :disabled='scope.row.status ? false : true'>编辑</el-button>
            <el-button type="text" size="mini" @click="ifUse(scope.row.id, scope.row.status)" :class="scope.row.status ? 'enable' : 'disable'">{{ scope.row.status ? '启用' : '禁用' }}</el-button>
            <el-button type="text" size="mini" @click="del(scope.row.id)" :disabled='scope.row.status ? false : true'>删除</el-button>
            <el-button type="text" size="mini" @click="Initialize(scope.row.id)" :disabled='scope.row.status ? false : true'>重置密码</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-dialog title="新增账号" :visible.sync="dialogFormVisible">
        <el-form :model="form">
          <el-form-item label="机构：" :label-width="formLabelWidth">
            <el-input v-model="form.name" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="工具权限：" :label-width="formLabelWidth">
            <el-select
              v-model="form.power"
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
            <el-input v-model="form.username" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="登录密码：" :label-width="formLabelWidth">
            <el-input v-model="form.passwd" autocomplete="off" show-password></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="add">确 定</el-button>
        </div>
      </el-dialog>
      <el-dialog
        title="查看"
        class="view"
        :visible.sync="dialogVisible"
        width="30%"
        >
        <div><label>机构：</label><span>{{ this.row.name }}</span></div>
        <div><label>工具权限：</label><el-tag type="info" size="mini" v-for="(item, index) in this.row.power" :key="index">{{ item.title }}</el-tag></div>
        <div><label>登录账户：</label><span>{{ this.row.username }}</span></div>
        <div><label>状态：</label><span :class="this.row.status ? 'disable' : 'enable'">{{ this.row.status ? '禁用' : '启用' }}</span></div>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
        </span>
      </el-dialog>
    </div>
    <div class="bottom">
      <el-pagination
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        layout="total, prev, pager, next, jumper"
        :total="tableDatas.length">
      </el-pagination>
    </div>
  </div>
</template>

<script>
  import { mapState, mapMutations } from 'vuex'
  import { getCompanyList, updateStatus, addCompany, delCompany, updatePassword } from '@/api/institution'
  import { getToolList } from '@/api/tool'
  export default {
    data() {
      return {
        role: ['全部', '老师', '学生'],
        use: ['全部', '启用', '禁用'],
        input: '',
        input1: '',
        input2: '',
        currentPage: 1,
        dialogFormVisible: false,
        dialogVisible: false,
        form: {
          name: '',
          power: '',
          username: '',
          passwd: ''
        },
        row: [],
        opt: [],
        formLabelWidth: '30%',
        tableDatas: []
      };
    },
    computed: {
      ...mapState([
          'user',
          'identity',
          'options',
      ]),
      tableData() {
        const arr = this.chunk(this.tableDatas, 10)
        return arr[this.currentPage - 1]
      }
    },
    methods: {
      ...mapMutations([
            'CHANGE_OPTIONS',
      ]),
      select(key, value) {
        this.CHANGE_OPTIONS([key, value])
      },
      handleCurrentChange(val) {
        this.currentPage = val
      },
      create() {
        this.dialogFormVisible = true
      },
      add() {
        this.form.token = this.user.Token
        addCompany(this.form).then(res => {
            if(res.Flag == 100) {
                this.dialogFormVisible = false
                this.refresh()
            }
        })
      },
      handleEdit() {

      },
      reset() {
        this.input = ''
        this.input1 = ''
        this.input2 = ''
      },
      refresh() {
        const data = {
          token: this.user.Token
        }
        getCompanyList(data).then(res => {
            this.tableDatas = res.data
        })
      },
      chunk(arr, size) {
        var objArr = new Array();
        var index = 0;
        var objArrLen = arr.length/size;
        for(var i=0;i<objArrLen;i++){
          var arrTemp = new Array();
          for(var j=0;j<size;j++){
              arrTemp[j] = arr[index++];
              if(index==arr.length){
                  break;
              }
          }
          objArr[i] = arrTemp;
        }
        return objArr;
      },
      view(row) {
        this.dialogVisible = true
        this.row = row
      },
      ifUse(id, status) {
        const data = {
          id,
          token: this.user.Token,
          status: status ? 0 : 1
        }
        updateStatus(data).then(res => {
          if(res.Flag == 100) {
            this.refresh()
          }
        })
      },
      del(id) {
        const data = {
          id,
          token: this.user.Token,
        }
        delCompany(data).then(res => {
          if(res.Flag == 100) {
            this.refresh()
          }
        })
      },
      Initialize(id) {
        const data = {
          id,
          token: this.user.Token,
        }
        updatePassword(data).then(res => {
          if(res.Flag == 100) {
            this.refresh()
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
        this.opt =  res.data
      })
    }
  }
</script>

<style lang="scss">
#agencyAccount {
    height: 95%;
    background: white;
    border-radius: 10px;
    position: relative;
    padding: 30px 15%;
    display: flex;
    flex-direction: column;

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
          padding-left: 30%;

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