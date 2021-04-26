<template>
  <div id="production">
      <iframe :src="url"></iframe>
      <RecordingDevice :parameters='parameters' v-if="record"></RecordingDevice>
  </div>
</template>

<script>
  import { RecordingDevice } from '@/components'
  import { mapState } from 'vuex'
  import { getAccessStudent } from '@/api/student'
  import { getAccessTeacher } from '@/api/teacher'
  import { startVideoTeacher, endVideoTeacher } from '@/api/teachercourse'
  import { startVideoStudent, endVideoStudent } from '@/api/studentcourse'
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
          'examId'
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
              }
            })
          }else if (this.recordStatus == 2) {
            endVideoTeacher(data).then(res => {
              if(res.flag !== 100) {
                this.$message.error(res.flagString);
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
              }
            })
          }else if (this.recordStatus == 2) {
            endVideoStudent(data1).then(res => {
              if(res.flag !== 100) {
                this.$message.error(res.flagString);
              }
            })
          }
        }
      }
    },
    methods: {

    },
    mounted() {
      window.addEventListener( "message",(e)=>{
        console.log(e.data)
        this.$router.push({path: 'courseware', query: {data: this.subjectId}})
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
}

</style>