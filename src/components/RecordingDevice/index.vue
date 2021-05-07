<template>
    <div id="recordingDevice">
        <div class="timing" @mousedown="mousedown">
            {{ uploading ? progress + '%' : this.timing }}
        </div>
        <div class="controller">
            <el-tooltip :content="action == '停止' ? '开始' : action == '暂停' ? '继续' : '暂停'" placement="top" effect="light">
                <el-button icon="el-icon-caret-right" circle @click="start" :disabled='isstart'></el-button>
            </el-tooltip>
            <el-tooltip content="停止" placement="top" effect="light">
                <el-button icon="el-icon-s-help" circle @click="end" :disabled='isend'></el-button>
            </el-tooltip>
            <el-tooltip content="上传" placement="top" effect="light">
                <el-button icon="el-icon-upload" circle @click="upload" :disabled='isupload'></el-button>
            </el-tooltip>
            <el-tooltip content="编辑" placement="top" effect="light">
                <el-button icon="el-icon-s-ticket" circle @click="edit" :disabled='isedit' v-if="identity == 'manager'"></el-button>
            </el-tooltip>
        </div>
        <i id="none"></i>
        <div class="video">
            <el-link type="primary" :href='url' target="_blank" :underline="false">视频</el-link>
            <i class="el-icon-close" @click="del"></i>
        </div>
        <Countdown :action='action'></Countdown>
    </div>
</template>

<script>
  import plupload from 'plupload'
  import Countdown from './Countdown'
  import { mapState, mapMutations } from 'vuex'
  import { saveVideoUrlTeacher, createNces } from '@/api/teachercourse'
  import { saveVideoUrlStudent } from '@/api/studentcourse'
  import { getSeekableBlob } from '@/api/ebml.util'
  export default {
    name: 'RecordingDevice',
    components: {
      Countdown
    },
    props: ['parameters'],
    data() {
      return {
        x: 0,
        y: 0,
        time: 0,
        timer: null,
        record: null,
        stream: null,
        new: true,
        url: null,
        file: null,
        uploaderObj: null,
        action: '',
        isstart: false,
        isend: true,
        isedit: true,
        isupload: true,
        uploading: false,
        progress: 0,
        location: ''
      };
    },
    computed: {
        ...mapState([
          'user',
          'identity',
          'subjectId',
          'coursewareID',
          'examId'
        ]),
        timing() {
            var min = this.time/60 > 9 ? parseInt(this.time/60) : '0' + parseInt(this.time/60)
            var sec = this.time%60 > 9 ? this.time%60 : '0' + this.time%60
            return this.time ? min + ' : ' + sec : "-- : --"
        }
    },
    watch: {
        parameters() {
            const that = this
            this.uploaderObj = new plupload.Uploader({ //实例化一个plupload上传对象
                browse_button : 'none',//触发文件选择对话框的按钮，为那个元素id
                runtimes: 'html5,flash,silverlight,html4',
                url: window.EL.upload,
                chunk_size: '5mb',
                max_retries: 3,
                filters: {
                    // Maximum file size
                    max_file_size : '4096mb',
                    // Select the duplicate files are not allowed
                    prevent_duplicates : true
                },
                multipart_params: {
                    access_id       : this.parameters.accessId,
                    expires         : this.parameters.expires,
                    signature       : this.parameters.signature,
                    signature_nonce : this.parameters.signatureOnce
                },
                // Flash settings
                flash_swf_url: 'js/Moxie.swf',
                // Silverlight settings
                silverlight_xap_url: 'js/Moxie.xap',
                init: {
                    Filesadded: function() {
                        that.uploaderObj.start()
                        that.uploading = true
                    },
                    UploadProgress: function(uploader,file) {
                        that.progress = ((file['loaded']/file['size'])*100).toFixed(2)
                    },
                    FileUploaded: function(uploader,file,responseObject) {
                        that.uploading = false
                        const res = JSON.parse(responseObject.response)
                        that.location = res.location
                        if(that.identity == 'manager') {
                            const data = {
                                token: that.user.Token,
                                coursewareId: that.coursewareID,
                                urlAddr: res.location
                            }
                            saveVideoUrlTeacher(data).then(res => {
                                if(res.flag == 100) {
                                    that.$message({
                                        message: '上传成功！',
                                        type: 'success'
                                    });
                                }else {
                                    that.$message.error(res.flagString);
                                }
                            })
                        }else {
                            const data = {
                                token: that.user.Token,
                                examId: that.examId,
                                urlAddr: res.location
                            }
                            saveVideoUrlStudent(data).then(res => {
                                if(res.flag == 100) {
                                    that.$message({
                                        message: '上传成功！',
                                        type: 'success'
                                    });
                                    that.$router.push('history')
                                }else {
                                    that.$message.error(res.flagString);
                                }
                            })
                        }
                    },
                    Error: function(uploader,errObject) {
                        that.$message.error(errObject.message)
                    }
                }
            });
            this.uploaderObj.init(); //初始化
        }
    },
    methods: {
        ...mapMutations([
            'CHANGE_URL',
            'CHANGE_RECORDSTATUS'
        ]),
        mousedown(e) {
            this.x = e.x - $('#recordingDevice').offset().left
            this.y = e.y - $('#recordingDevice').offset().top
            $(document).on('mousemove',this.mousemove)
            $(document).one('mouseup',this.mouseup)
        },
        mousemove(e) {
            let left = e.clientX - this.x
            let top = e.clientY - this.y
            left = left < 0 ? 0 : left > $('html').width() - 230 ? $('html').width() - 230 : left
            top = top < 0 ? 0 : top > $('html').height() - 50 ? $('html').height() - 50 : top
            $('#recordingDevice').css({"left": left, "top": top})
        },
        mouseup() {
            $(document).off('mousemove',this.mousemove)
        },
        start() {
            const that = this
            if($('.el-icon-caret-right').length) {
                if(this.new) {
                    navigator.mediaDevices.getDisplayMedia({ video: true, audio: true })
                        .then(function(stream) {
                            navigator.mediaDevices.getUserMedia({ audio: true }).then(mediastream => {
                                stream.addTrack(mediastream.getTracks()[0])
                                that.new = false
                                that.isedit = true
                                that.isstart = true
                                $('#recordingDevice').addClass('hide')
                                $('.el-icon-caret-right').removeClass('el-icon-caret-right').addClass('el-icon-refresh-right')
                                that.stream = stream
                                that.action = '开始'
                                var options = {
                                    mimeType : 'video/webm;codecs=h264'
                                }
                                that.record = new MediaRecorder(stream, options)
                                that.time = 0
                                setTimeout(function(){
                                    that.record.start()
                                    that.CHANGE_RECORDSTATUS(1)
                                    that.isstart = false
                                    that.isend = false
                                    that.timer = setInterval(function() { that.time++ },1000)
                                },2000)
                                stream.getVideoTracks()[0].onended = () => {
                                    that.record.stop()
                                }
                                that.record.addEventListener("dataavailable",event => {
                                    getSeekableBlob(event.data,function(seekableBlob){
                                        let videoUrl = URL.createObjectURL(seekableBlob, {type: 'video/mp4'})
                                        that.file = new File([seekableBlob], `video${new Date().getTime()}.mp4`, {
                                            type: 'video/mp4'
                                        });
                                        that.url = videoUrl
                                    })
                                })
                            })
                            .catch(function(err) {
                                console.log(err)
                            })
                        })
                        .catch(function(err) {
                            console.log(err)
                        })
                }else {
                    $('.el-icon-caret-right').removeClass('el-icon-caret-right').addClass('el-icon-refresh-right')
                    this.action = '继续'
                    this.isstart = true
                    setTimeout(function(){
                        that.timer = setInterval(function() { that.time++ },1000)
                        that.record.resume()
                        that.isstart = false
                    },2000)
                }
            }else {
                $('.el-icon-refresh-right').removeClass('el-icon-refresh-right').addClass('el-icon-caret-right')
                clearInterval(this.timer)
                this.action = '暂停'
                this.record.pause()
            }
        },
        end() {
            $('#recordingDevice').removeClass('hide')
            $('.el-icon-refresh-right').removeClass('el-icon-refresh-right').addClass('el-icon-caret-right')
            this.stream.getTracks()[0].stop()
            if(this.stream.getTracks()[1]) this.stream.getTracks()[1].stop()
            if(this.stream.getTracks()[2]) this.stream.getTracks()[2].stop()
            clearInterval(this.timer)
            this.CHANGE_RECORDSTATUS(2)
            this.action = '停止'
            this.new = true
            this.isstart = true
            this.isend = true
            this.isedit = true
            this.isupload = false
            $('.video').css({'display': 'block'})
        },
        edit() {
            const data = {
                token: this.user.Token,
                coursewareId: this.coursewareID,
                subjectId: this.subjectId,
                url: this.location
            }
            createNces(data).then(res => {
                if(res.flag == 100) {
                    this.CHANGE_URL('https://' + res.data.pageUrl)
                }else {
                    this.$message.error(res.flagString);
                }
            })
        },
        upload() {
            this.isstart = false
            this.isend = true
            this.isedit = false
            this.isupload = true
            this.uploaderObj.addFile(this.file)
        },
        del() {
            this.isstart = false
            this.isend = true
            this.isedit = true
            this.isupload = true
            this.time = 0
            $('.video').css({'display': 'none'})
        }
    },
    mounted() {

    }
  }
</script>

<style lang="scss">
#recordingDevice {
    position: fixed;
    top: 30px;
    right: 300px;

    &.hide {
        right: 0;
        left: unset !important;

        &:hover {
            right: 180px;
            transition: 0.5s;
        }
    }

    .timing {
        width: 50px;
        height: 50px;
        border-radius: 50%;
        background: linear-gradient(to bottom left, #469dff, #6ac7ff);
        position: relative;
        z-index: 5;
        border: 3px solid white;
        box-shadow: 0 0 2px burlywood;
        display: flex;
        align-items: center;
        justify-content: center;
        color: white;
        font-size: 12px;
        cursor: move;
        user-select: none;
    }

    .controller {
        width: 230px;
        height: 40px;
        border-radius: 20px;
        background: white;
        position: absolute;
        left: 30px;
        top: 5px;
        padding: 0 20px;
        display: flex;
        align-items: center;
        justify-content: space-around;

        .el-button {
            border: unset;
            margin: 0;
        }
    }

    .video {
        width: 150px;
        height: 20px;
        background: rgba($color: white, $alpha: 0.6);
        position: absolute;
        top: 45px;
        left: 50px;
        text-align: left;
        padding: 0 10px;
        display: none;

        i {
            float: right;
            color: #409EFF;
        }
    }
}
</style>
