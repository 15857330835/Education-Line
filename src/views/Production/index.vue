<template>
  <div id="production">
      <iframe src="http://www.baidu.com"></iframe>
      <RecordingDevice></RecordingDevice>
  </div>
</template>

<script>
  import { RecordingDevice } from '@/components'
  export default {
    components: {
        RecordingDevice
    },
    data() {
      return {
        
      };
    },
    computed: {
        
    },
    methods: {
        
    },
    mounted() {
      
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