<template>
  <div id="setup">
      <div>
        <h3>数据配置</h3>
        <div>
          <label>XX接口地址：</label>
          <el-input placeholder="请输入内容" v-model="connectAddr">
            <template slot="prepend">Http://</template>
          </el-input>
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
        <h3>工具介绍</h3>
        <div>
            <label>标题：</label>
            <el-input v-model="title" placeholder="请输入课程标题"></el-input>
        </div>
        <div>
            <label style="height: 96px">工具介绍：</label>
            <el-input type="textarea" resize= "none" rows="4" maxlength="500" show-word-limit v-model="remarks" placeholder="请输入课程描述"></el-input>
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
  import { addTool, getToolInfo, updateTool, uploadPic } from '@/api/tool'
  export default {
    components: {
    },
    data() {
      return {
        connectAddr: '',
        title: '',
        remarks: '',
        coverAddr: '',
        dialogImageUrl: '',
        dialogVisible: false,
        disabled: false,
      };
    },
    computed: {
      ...mapState([
        'user',
        'modify'
      ]),
    },
    methods: {
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
        },
        cancel() {
            this.$router.go(-1)
        },
        create() {
            const data = {
              token: this.user.Token,
              title: this.title,
              connectAddr: 'http://' + this.connectAddr,
              coverAddr: this.coverAddr,
              remarks: this.remarks
            }
            addTool(data).then(res => {
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
              connectAddr: 'http://' + this.connectAddr,
              coverAddr: this.coverAddr,
              remarks: this.remarks
          }
          updateTool(data).then(res => {
              if(res.flag == 100) {
                this.$router.go(-1)
              }else {
                this.$message.error(res.flagString);
              }
          })
        }
    },
    mounted() {
      if(this.modify) {
        const data = {
          token: this.user.Token,
          id: this.$route.query.id
        }
        getToolInfo(data).then(res => {
        if(res.flag == 100) {
          this.title = res.data.title
          this.remarks = res.data.remarks
          this.coverAddr = res.data.coverAddr
          this.connectAddr = res.data.connectAddr.replace('http://', '')
        }else {
          this.$message.error(res.flagString);
        }
      })
      }
    }
  }
</script>

<style lang="scss">
#setup {
    height: 95%;
    border-radius: 10px;
    background: white;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    >div {
        width: 800px;
        height: 800px;
        border: 1px solid #DFDFDF;
        border-radius: 5px;
        text-align: left;

        h3 {
          background: #F9F9F9;
          padding: 10px 20px;
          border: 1px solid #DFDFDF;
        }

        >div {
          padding: 30px;

          label {
              display: inline-block;
              width: 100px;
              text-align: right;
          }

          >.el-input {
              width: 500px;
              margin-left: 20px;
          }

          >.el-textarea {
              width: 500px;
              margin-left: 20px;
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

        .btn {
          padding-left: 150px;
        }
    }
}

</style>