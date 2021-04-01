<template>
  <div id="authorware">
    <div class="template" v-for="(template, index) in templates" :key="index" @click="click(template.title)">
      <img :src="template.src">
      <p>{{ template.title }}</p>
    </div>
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
        templates: [
          {
            src: '',
            title: '云导播台LCPS'
          },
          {
            src: '',
            title: '云非编NCES'
          },
          {
            src: '',
            title: '帧级快剪服务AQES'
          }
        ]
      };
    },
    methods: {
      click(title) {
        this.$router.push({name:'Template',query: {title}})
      }
    },
    mounted() {
      
    }
  }
</script>

<style lang="scss">
#authorware {
  display: flex;

  .template {
    width: 140px;
    height: 180px;
    background: white;
    border-radius: 10px;
    margin-right: 60px;
    margin-bottom: 30px;
    cursor: pointer;

    &:hover {
      box-shadow: 0 0 5px 1px #9e9494;
    }

    p {
      font-size: 13px;
    }
  }
}

</style>