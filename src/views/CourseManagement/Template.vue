<template>
  <div id="template">
      <div id="content">
      <h3>{{ modify ? '修改课程' : '新建课程' }}</h3>
      <div class="content">
        <div>
            <label>课程标题：</label>
            <el-input v-model="title" placeholder="请输入课程标题"></el-input>
        </div>
        <div>
            <label style="height: 100px">上传图片：</label>
            <el-upload
                action="#"
                class="upload"
                ref="upload"
                :on-change="onChange"
                list-type="picture-card"
                :auto-upload="false">
                <i slot="default" class="el-icon-plus"></i>
                <div slot="file" slot-scope="{file}">
                    <img
                        class="el-upload-list__item-thumbnail"
                        :src="file.url" alt=""
                    >
                    <span class="el-upload-list__item-actions">
                        <span
                        class="el-upload-list__item-preview"
                        @click="handlePictureCardPreview(file)"
                        >
                        <i class="el-icon-zoom-in"></i>
                        </span>
                        <span
                        v-if="!disabled"
                        class="el-upload-list__item-delete"
                        @click="handleRemove(file)"
                        >
                        <i class="el-icon-delete"></i>
                        </span>
                    </span>
                </div>
            </el-upload>
            <el-dialog :visible.sync="dialogVisible">
                <img width="100%" :src="dialogImageUrl" alt="">
            </el-dialog>
            <div class="text">
                <p>尺寸推荐：316*208px</p>
                <p>分辨率推荐：72</p>
                <p>格式推荐：.jpg/.png</p>
            </div>
        </div>
        <div>
            <label style="height: 96px">描述：</label>
            <el-input type="textarea" resize= "none" rows="4" maxlength="500" show-word-limit v-model="remarks" placeholder="请输入课程描述"></el-input>
        </div>
        <div>
            <label>学习周期：</label>
            <el-input-number v-model="period" :min="1" :max="10" label="描述文字"></el-input-number>天
            <label>工具：</label>
            <el-select v-model="toolId" placeholder="请选择">
                <el-option
                v-for="item in tool"
                :key="item.id"
                :label="item.title"
                :value="item.id">
                </el-option>
            </el-select>
        </div>
        <div class="price">
            <label>价格展示：</label>
            <el-switch v-model="priceStatus" active-color="#13ce66" inactive-color="#ff4949"></el-switch>
            <label>课程原价：</label>
            <el-input v-model="price"></el-input>元
            <label>折扣价：</label>
            <el-input v-model="priceDiscount"></el-input>元
        </div>
        <div>
            <label>标签 ：</label>
            <el-select
                v-model="label"
                multiple
                filterable
                collapse-tags
                allow-create
                style="margin-left: 20px;"
                placeholder="请选择">
                <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.label">
                </el-option>
            </el-select>
        </div>
      </div>
      <div class="btn">
        <el-button @click="cancel">取消</el-button>
        <el-button type="primary" @click="modify ? change() : create()">确定</el-button>
      </div>
      </div>
  </div>
</template>

<script>
  import { mapState } from 'vuex'
  import { addSubject, getSubjectInfo, updateSubject, uploadPic } from '@/api/teachercourse'
  import { getToolList } from '@/api/tool'
  export default {
    components: {
    },
    data() {
      return {
        title: '',
        remarks: '',
        price: '',
        priceDiscount: '',
        period: '',
        coverAddr: '',
        dialogImageUrl: '',
        dialogVisible: false,
        disabled: false,
        options: [
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
        tool: [],
        label: [],
        toolId: [],
        priceStatus: true
      };
    },
    computed: {
        ...mapState([
            'user',
            'modify'
        ])
    },
    methods: {
        cancel() {
            this.$router.go(-1)
        },
        create() {
            const data = {
                token: this.user.Token,
                title: this.title,
                coverAddr: this.coverAddr,
                remarks: this.remarks,
                period: this.period,
                toolId: this.toolId,
                priceStatus: this.priceStatus ? 0 : 1,
                price: this.price,
                priceDiscount: this.priceDiscount,
                label: this.label.join(',')
            }
            addSubject(data).then(res => {
                if(res.flag == 100) {
                    this.$router.go(-1)
                }else {
                    this.$message.error(res.flagString);
                }
            })
        },
        change() {
            const data = {
                token: this.user.Token,
                id: this.$route.query.id,
                title: this.title,
                coverAddr: this.coverAddr,
                remarks: this.remarks,
                period: this.period,
                toolId: this.toolId,
                priceStatus: this.priceStatus ? 0 : 1,
                price: this.price,
                priceDiscount: this.priceDiscount,
                label: this.label.join(',')
            }
            updateSubject(data).then(res => {
                if(res.flag == 100) {
                    this.$router.go(-1)
                }else {
                    this.$message.error(res.flagString);
                }
            })
        },
        onChange(file) {
            $('.el-upload').css({'display': 'none'})
            const data = new FormData()
            data.append('token', this.user.Token)
            data.append('pic', file.raw)
            uploadPic(data).then(res => {
              if(res.flag == 100) {
                this.coverAddr = res.url
              }else {
                this.$message.error(res.flagString);
              }
            })
        },
        handleRemove() {
            this.$refs.upload.clearFiles()
            this.coverAddr = ''
            $('.el-upload').css({'display': 'inline-block'})
        },
        handlePictureCardPreview(file) {
            this.dialogImageUrl = file.url;
            this.dialogVisible = true;
        }
    },
    mounted() {
      const data = {
        token: this.user.Token
      }
      getToolList(data).then(res => {
        if(res.flag == 100) {
          this.tool = res.data
        }else {
            this.$message.error(res.flagString);
        }
      })
      if(this.modify) {
        const data = {
            token: this.user.Token,
            id: this.$route.query.id
        }
        getSubjectInfo(data).then(res => {
            if(res.flag == 100) {
                this.title = res.data.title,
                this.coverAddr = res.data.coverAddr,
                this.remarks = res.data.remarks,
                this.period = res.data.period,
                this.toolId = res.data.toolId,
                this.priceStatus = res.data.priceStatus ? false : true,
                this.price = res.data.price,
                this.priceDiscount = res.data.priceDiscount,
                this.label= res.data.label.split(',')
            }else {
                this.$message.error(res.flagString);
            }
        })
      }
    }
  }
</script>

<style lang="scss">
#template {
    height: 95%;
    background: white;
    text-align: left;

    h3 {
        height: 10%;
    }

    .content {
        flex: 1;

        >div {
            margin-bottom: 50px;

            label {
                display: inline-block;
                width: 100px;
                text-align: right;
            }

            >.el-input {
                width: 500px;
                margin-left: 20px;
            }

            >.el-input-number {
                margin-left: 20px;
                margin-right: 10px;
            }

            >.el-textarea {
                width: 500px;
                margin-left: 20px;
            }

            >.el-select {
                margin-right: 10px;
            }

            &.price {

                >.el-switch {
                    margin-left: 20px;
                    margin-right: 200px;
                }

                >.el-input {
                    width: 100px;
                    margin-right: 10px;
                }
            }
        }

        .upload {
            display: inline-block;
            margin-left: 20px;

            .el-upload {
                width: 100px;
                height: 100px;
                line-height: 100px;
            }

            .el-upload-list__item {
                width: 100px;
                height: 100px;
            }
        }

        .text {
            display: inline-block;
            vertical-align: bottom;
            height: 100px;
            margin-left: 20px;
            color: #666666;
            padding-top: 20px;
        }
    }

    .btn {
        height: 10%;
        text-align: right;
    }
}

</style>