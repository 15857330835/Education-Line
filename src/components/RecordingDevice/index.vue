<template>
    <div id="recordingDevice">
        <div class="timing" @mousedown="mousedown" @mouseup="mouseup">
            {{ this.timing }}
        </div>
        <div class="controller">
            <i class="el-icon-caret-right" @click="start"></i>
            <i class="el-icon-s-help" @click="end"></i>
            <i class="el-icon-s-finance"></i>
            <i class="el-icon-s-ticket"></i>
            <i class="el-icon-upload"></i>
        </div>
    </div>
</template>

<script>
  export default {
    name: 'RecordingDevice',
    data() {
      return {
        x: 0,
        y: 0,
        time: 0,
        timer: null,
        record: null,
        stream: null,
        new: true
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
                            that.record = new MediaRecorder(stream)
                            that.record.start()
                            that.time = 0
                            that.timer = setInterval(function() { that.time++ },1000)
                            stream.getVideoTracks()[0].onended = () => {
                                that.record.stop()
                            }
                            that.record.addEventListener("dataavailable",event => {
                                let videoUrl = URL.createObjectURL(event.data, {type: 'video/ogg'})
                                console.log(videoUrl)
                            })
                        })
                        .catch(function(err) {
                            console.log(err)
                        })
                }else {
                    $('.el-icon-caret-right').removeClass('el-icon-caret-right').addClass('el-icon-refresh-right')
                    this.timer = setInterval(function() { that.time++ },1000)
                    that.record.resume()
                }
            }else {
                $('.el-icon-refresh-right').removeClass('el-icon-refresh-right').addClass('el-icon-caret-right')
                clearInterval(this.timer)
                that.record.pause()
            }
        },
        end() {
            $('#recordingDevice').removeClass('hide')
            $('.el-icon-refresh-right').removeClass('el-icon-refresh-right').addClass('el-icon-caret-right')
            this.stream.getTracks()[0].stop()
            clearInterval(this.timer)
            this.new = true
        }
    },
    mounted() {
        
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
        width: 200px;
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

        i {
            cursor: pointer;
            padding: 8px;
        }
    }
}
</style>
