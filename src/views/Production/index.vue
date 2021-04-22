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
          'recordStatus'
      ])
    },
    watch: {
      recordStatus() {
        if(this.identity == 'manager') {
          const data = {
            token: this.user.Token,
            coursewareId: this.$route.query.data.id,
            projectId: this.$route.query.data.projectId,
            subjectId: this.$route.query.data.subjectId
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
            coursewareId: this.$route.query.coursewareId,
            toolId: this.$route.query.toolId
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