<template>
  <div id="production">
      <iframe :src="url"></iframe>
      <RecordingDevice :parameters='parameters'></RecordingDevice>
  </div>
</template>

<script>
  import { RecordingDevice } from '@/components'
  import { mapState, mapMutations } from 'vuex'
  import { getAccessStudent } from '@/api/student'
  import { getAccessTeacher } from '@/api/teacher'
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
          'url'
      ])
    },
    methods: {
        ...mapMutations([
            'CHANGE_URL',
        ]),
    },
    mounted() {
      this.CHANGE_URL('https://www.baidu.com')
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