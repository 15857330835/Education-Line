<template>
    <div id="recordingDevice">
        <div class="timing" @mousedown="mousedown">
            {{ this.timing }}
        </div>
        <div class="controller">
            <el-button icon="el-icon-caret-right" circle @click="start" :disabled='isstart'></el-button>
            <el-button icon="el-icon-s-help" circle @click="end" :disabled='isend'></el-button>
            <el-button icon="el-icon-s-finance" circle :disabled='issubtitles'></el-button>
            <el-button icon="el-icon-s-ticket" circle @click="edit" :disabled='isedit'></el-button>
            <el-button icon="el-icon-upload" circle @click="upload" :disabled='isupload'></el-button>
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
  export default {
    name: 'RecordingDevice',
    components: {
      Countdown
    },
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
        issubtitles: true,
        isedit: true,
        isupload: true,
      };
    },
    computed: {
        timing() {
            var min = this.time/60 > 9 ? parseInt(this.time/60) : '0' + parseInt(this.time/60)
            var sec = this.time%60 > 9 ? this.time%60 : '0' + this.time%60
            return this.time ? min + ' : ' + sec : "-- : --"
        }
    },
    methods: {
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
                            that.new = false
                            $('#recordingDevice').addClass('hide')
                            $('.el-icon-caret-right').removeClass('el-icon-caret-right').addClass('el-icon-refresh-right')
                            that.stream = stream
                            that.action = '开始'
                            that.record = new MediaRecorder(stream)
                            that.time = 0
                            setTimeout(function(){
                                that.record.start()
                                that.isend = false
                                that.timer = setInterval(function() { that.time++ },1000)
                            },2000)
                            stream.getVideoTracks()[0].onended = () => {
                                that.record.stop()
                            }
                            that.record.addEventListener("dataavailable",event => {
                                let videoUrl = URL.createObjectURL(event.data, {type: 'video/mp4'})
                                that.file = new File([event.data], '111.webm', {
                                    type: 'video/webm'
                                });
                                that.url = videoUrl
                            })
                        })
                        .catch(function(err) {
                            console.log(err)
                        })
                }else {
                    $('.el-icon-caret-right').removeClass('el-icon-caret-right').addClass('el-icon-refresh-right')
                    this.action = '继续'
                    setTimeout(function(){
                        that.timer = setInterval(function() { that.time++ },1000)
                        that.record.resume()
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
            clearInterval(this.timer)
            this.new = true
            this.isstart = true
            this.isend = true
            this.issubtitles = false
            this.isedit = false
            this.isupload = false
            $('.video').css({'display': 'block'})
        },
        edit() {
            
        },
        upload() {
            this.isstart = false
            this.isend = true
            this.issubtitles = true
            this.isedit = true
            this.isupload = true
            this.uploaderObj.addFile(this.file)
        },
        del() {
            this.isstart = false
            this.isend = true
            this.issubtitles = true
            this.isedit = true
            this.isupload = true
            this.time = 0
            $('.video').css({'display': 'none'})
        }
    },
    mounted() {
        const that = this
        this.uploaderObj = new plupload.Uploader({ //实例化一个plupload上传对象
            browse_button : 'none',//触发文件选择对话框的按钮，为那个元素id
            runtimes: 'html5,flash,silverlight,html4',
            url: 'http://upload.dvr.aodianyun.com/v2/DVR.FormUpload',
            chunk_size: '5mb',
            max_retries: 3,
            filters: {
                // Maximum file size
                max_file_size : '4096mb',
                // Select the duplicate files are not allowed
                prevent_duplicates : true
            },
            multipart_params: {
                access_id       : '110009843585',
                expires         : 1699771990,
                signature       : 'ccc94a218c6c3543bef3f857fd1413f0',
                signature_nonce : '5bea74d65cdf0'
            },
            // Flash settings
            flash_swf_url: 'js/Moxie.swf',
            // Silverlight settings
            silverlight_xap_url: 'js/Moxie.xap',
            init: {
                Filesadded: function() {
                    that.uploaderObj.start()
                },
                // FileFiltered: function(uploader,file){
                // //上传前回调，可进行参数过滤
                // },
                // UploadProgress: function(uploader,file){
                // //上传过程中，触发
                // },
                // QueueChanged: function(uploader,file){
                
                // },
                // FileUploaded: function(uploader,file,responseObject){
                // //上传完成回调
                // //responseObject.status 是http code
                // //responseObject.response = {Flag = 100,FlagStrgin = "成功",fileName = "文件名",location = "URL地址"}
                // },
                // ChunkUploaded: function(uploader,file,responseObject){
                // //上片上传回调
                // },
                // FilesRemoved: function(uploader,file){
                // //删除操作回调
                // }
            }
        });
        this.uploaderObj.init(); //初始化
    }
  }
</script>

<style lang="scss">
#recordingDevice {
    position: fixed;

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
