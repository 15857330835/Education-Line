<template>
  <div id="template">
      <h3>{{ this.title }}</h3>
      <div class="content">
        <div>
            <label>课程标题：</label>
            <el-input v-model="input" placeholder="请输入课程标题"></el-input>
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
            <el-input type="textarea" resize= "none" rows="4" maxlength="500" show-word-limit v-model="input2" placeholder="请输入课程描述"></el-input>
        </div>
        <div>
            <label>学习周期：</label>
            <el-input-number v-model="value" @change="handleChange" :min="1" :max="10" label="描述文字"></el-input-number>  天
        </div>
        <div>
            <label>标签 ：</label>
            <el-select
                v-model="value2"
                multiple
                filterable
                collapse-tags
                style="margin-left: 20px;"
                placeholder="请选择">
                <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
                </el-option>
            </el-select>
        </div>
      </div>
      <div class="btn">
        <el-button @click="create">取消</el-button>
        <el-button type="primary" @click="create">确定</el-button>
      </div>
      <img>
  </div>
</template>

<script>
  export default {
    components: {
    },
    data() {
      return {
        input: '',
        input2: '',
        value: '',
        dialogImageUrl: '',
        dialogVisible: false,
        disabled: false,
        options: [
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
        value2: []
      };
    },
    computed: {
        title() {
            return this.$route.query.data ? '修改课程' : '新建课程'
        }
    },
    methods: {
        create() {

        },
        handleChange() {

        },
        onChange() {
            $('.el-upload').css({'display': 'none'})
        },
        handleRemove() {
            this.$refs.upload.clearFiles()
            $('.el-upload').css({'display': 'inline-block'})
        },
        handlePictureCardPreview(file) {
            this.dialogImageUrl = file.url;
            this.dialogVisible = true;
        }
    },
    mounted() {
      
    }
  }
</script>

<style lang="scss">
#template {
    height: 95%;
    background: white;
    border-radius: 10px;
    position: relative;
    text-align: left;
    padding: 30px 15%;
    display: flex;
    flex-direction: column;

    >h3 {
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
    }

    .btn {
        height: 10%;
        text-align: right;
    }
}

</style>