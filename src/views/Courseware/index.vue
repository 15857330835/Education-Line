<template>
  <div id="courseware">
    <div class="search">
      <div>
        <label>上下线：</label>
        <i v-for="(item, index) in ifOnline" :key="index" :class="item == options.ifOnline ? 'active' : ''" @click="select('ifOnline', item)">{{ item }}</i>
      </div>
      <div>
        <label>状态：</label>
        <i v-for="(item, index) in state" :key="index" :class="item == options.state ? 'active' : ''" @click="select('state', item)">{{ item }}</i>
      </div>
      <div>
        <label>标签：</label>
        <el-select
            v-model="value4"
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
      <el-button type="primary" plain size="mini">制作课件</el-button>
      <el-button type="primary" plain size="mini">全选</el-button>
      <el-button type="primary" plain size="mini">批量上线</el-button>
      <el-button type="primary" plain size="mini">批量下线</el-button>
      <el-button type="primary" plain size="mini">批量删除</el-button>
    </div>
    <div class="content">
      <el-table
        :data="tableData"
        style="width: 100%"
        :header-cell-style="{'font-weight': 'bold', 'background-color': '#F8F8F8'}"
        :default-sort = "{prop: 'date', order: 'descending'}"
        >
        <el-table-column align="center" width="150px" prop="title" label="标题"></el-table-column>
        <el-table-column align="center" width="" label="简介">
          <template slot-scope="scope">
            <el-tooltip class="item" popper-class="prompt" effect="dark" :content="scope.row.introduction" placement="top">
              <p class="intro">{{ scope.row.introduction }}</p>
            </el-tooltip>
          </template>
        </el-table-column>
        <el-table-column align="center" width="" label="标签">
          <template slot-scope="scope">
            <el-tag type="warning" size="mini" v-for="(item, index) in scope.row.label" :key="index">{{ item }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column align="center" width="80px" prop="coursewareTime" label="课件时长"></el-table-column>
        <el-table-column align="center" width="200px" prop="creationTime" label="创建时间" sortable></el-table-column>
        <el-table-column align="center" width="70px" label="状态">
          <template slot-scope="scope">
            <span :class="scope.row.state == '已完成' ? 'done' : 'undone'">{{ scope.row.state }}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" width="200px" label="操作">
          <el-button type="text" size="mini" @click="handleEdit">播放</el-button>
          <el-button type="text" size="mini" @click="handleEdit">修改</el-button>
          <el-button type="text" size="mini" @click="handleEdit">成果</el-button>
          <el-button type="text" size="mini" @click="handleEdit">上线</el-button>
          <el-button type="text" size="mini" @click="handleEdit">删除</el-button>
        </el-table-column>
      </el-table>
    </div>
    <div class="bottom">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage4"
        :page-sizes="[4, 6, 8, 10]"
        :page-size="10"
        layout="total, sizes, prev, pager, next, jumper"
        :total="50">
      </el-pagination>
    </div>
  </div>
</template>

<script>
  import { mapState, mapMutations } from 'vuex'
  export default {
    data() {
      return {
        ifOnline: ['全部', '上线', '下线'],
        state: ['全部', '已完成', '未完成'],
        input: '',
        value4: [],
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
        currentPage4: 4,
        tableData: [{
          title: 'title',
          introduction: '这里是描述这里是描述这里是述这里是描述这描述这里是描述',
          label: ['新入职', '体育'],
          coursewareTime: '30:12',
          creationTime: '2020-02-21 09:56:55',
          state: '已完成'
        },
        {
          title: 'title',
          introduction: '这里是描述这里是描述这里是述这里是描述这描述这里是描述',
          label: ['新入职', '体育'],
          coursewareTime: '30:12',
          creationTime: '2020-02-21 09:56:55',
          state: '未完成'
        },
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
      handleEdit() {

      }
    },
    mounted() {
      
    }
  }
</script>

<style lang="scss">
#courseware {
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

      .el-select {
        width: 120px;

        &.label {
          width: 200px;
        }
      }

      .el-input {
        width: unset;
        margin-right: 10px;
      }
    }

    .operation {
      text-align: right;
      margin-bottom: 30px;

      button {
        margin-right: 10px;
      }
    }

    .content {
      flex: 1;
      display: flex;

      .intro {
        overflow: hidden;
        text-overflow:ellipsis;
        white-space: nowrap;
      }

      .el-tag {
        margin-right: 5px;
      }

      .done {
        color: #FA6400;
      }

      .undone {
        color: #686868;
      }
    }
}

</style>