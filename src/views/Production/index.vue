<template>
  <div id="production">
      <iframe id="iframeWindow" :src="url"></iframe>
      <div id="mask" v-if="record"></div>
      <RecordingDevice :parameters='parameters'></RecordingDevice>
  </div>
</template>

<script>
  import { RecordingDevice } from '@/components'
  import { mapState, mapMutations } from 'vuex'
  import { getAccessStudent } from '@/api/student'
  import { getAccessTeacher } from '@/api/teacher'
  import { startVideoTeacher, endVideoTeacher, saveProjectUrl } from '@/api/teachercourse'
  import { startVideoStudent, endVideoStudent, grade, saveVideoUrl } from '@/api/studentcourse'
  export default {
    components: {
        RecordingDevice
    },
    data() {
      return {
        parameters: null
      };
    },
    computed: {
        ...mapState([
          'user',
          'identity',
          'url',
          'record',
          'recordStatus',
          'coursewareID',
          'projectId',
          'subjectId',
          'toolId',
          'examId',
          'videoType'
      ])
    },
    watch: {
      recordStatus() {
        if(this.identity == 'manager') {
          const data = {
            token: this.user.Token,
            coursewareId: this.coursewareID,
            projectId: this.projectId,
            subjectId: this.subjectId
          }
          if(this.recordStatus == 1) {
            startVideoTeacher(data).then(res => {
              if(res.flag !== 100) {
                this.$message.error(res.flagString);
              }else {
                $('#mask').css({'display': 'none'})
              }
            })
          }else if (this.recordStatus == 2) {
            endVideoTeacher(data).then(res => {
              if(res.flag !== 100) {
                this.$message.error(res.flagString);
              }else {
                const data = {
                  id: this.coursewareID,
                  type: this.videoType
                }
                document.getElementById('iframeWindow').contentWindow.postMessage(data,'*')
              }
            })
          }
        }else {
          const data1 = {
            token: this.user.Token,
            examId: this.examId,
            projectId: this.projectId,
            subjectId: this.subjectId
          }
          if(this.recordStatus == 1) {
            startVideoStudent(data1).then(res => {
              if(res.flag !== 100) {
                this.$message.error(res.flagString);
              }else {
                $('#mask').css({'display': 'none'})
              }
            })
          }else if (this.recordStatus == 2) {
            endVideoStudent(data1).then(res => {
              if(res.flag !== 100) {
                this.$message.error(res.flagString);
              }else {
                const data = {
                  id: this.coursewareID,
                  examId: this.examId
                }
                document.getElementById('iframeWindow').contentWindow.postMessage(data,'*')
                const data2 = {
                  token: this.user.Token,
                  examId: this.examId,
                }
                grade(data2).then(res => {
                  if(res.flag !== 100) {
                    this.$message.error(res.flagString)
                    this.$router.push('history')
                  }else {
                    this.$message({
                      type: 'success',
                      message: `视频生成中,请等待一定时间后刷新页面...`
                    });
                    this.$router.push('history')
                  }
                })
              }
            })
          }
        }
      }
    },
    methods: {
      ...mapMutations([
            'CHANGE_GENERATEID'
      ]),
      updateHandler(e) {
        e.returnValue=("您是否确认离开此页面-您输入的数据可能不会被保存");
      },
    },
    mounted() {
      window.addEventListener( "message",(e)=>{
        if(e.data == '提交') {
          this.CHANGE_GENERATEID(this.coursewareID)
          this.$router.push({path: 'courseware', query: {data: this.subjectId}})
        }else if(e.data == 'ID') {
          const data = {
            id: this.coursewareID,
            type: this.videoType
          }
          if(this.identity == 'human') data.examId = this.examId
          document.getElementById('iframeWindow').contentWindow.postMessage(data,'*')
        }else if(e.data.type == 'AQES'){
          if(this.identity == 'manager') {
            const data = {
              token: this.user.Token,
              coursewareID: this.coursewareID,
              url: 'http://' + e.data.url
            }
            saveProjectUrl(data).then(res => {
              if(res.flag !== 100) {
                this.$message.error(res.flagString);
              }
            })
          }else {
            const data = {
              token: this.user.Token,
              examId: this.examId,
              urlAddr: 'http://' + e.data.url
            }
            saveVideoUrl(data).then(res => {
              if(res.flag !== 100) {
                this.$message.error(res.flagString);
              }
            })
          }
        }
      },	false)
      const data = {
        token: this.user.Token,
      }
      if(this.identity == 'manager') {
        getAccessTeacher(data).then(res => {
          if(res.flag == 100) {
            this.parameters = res.data
          }else {
            this.$message.error(res.flagString);
          }
        })
      }else {
        getAccessStudent(data).then(res => {
          if(res.flag == 100) {
            this.parameters = res.data
          }else {
            this.$message.error(res.flagString);
          }
        })
      }
      window.addEventListener('beforeunload', this.updateHandler)
    },
    destroyed() {
      window.removeEventListener('beforeunload', this.updateHandler)
    }
  }
</script>

<style lang="scss">
#production {
    width: 100vw;
    height: 100vh;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 100;
    background: white;

    iframe {
      width: 100%;
      height: 100%;
    }

    #mask {
      width: 100%;
      height: 100%;
      position: absolute;
      left: 0;
      top: 0;
      background: rgba($color: #000000, $alpha: 0.6);
    }
}

</style>