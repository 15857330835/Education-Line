<template>
  <div id="introduce">
      <div>
        <h3>{{ this.title }}</h3>
        <p>{{ this.remarks }}</p>
      </div>
  </div>
</template>

<script>
  export default {
    components: {
    },
    data() {
      return {
        
      };
    },
    computed: {
        title() {
            return this.$route.query.title
        },
        remarks() {
            return this.$route.query.remarks
        }
    },
    methods: {
        
    },
    mounted() {
      
    }
  }
</script>

<style lang="scss">
#introduce {
    height: 95%;
    border-radius: 10px;
    padding: 30px 0;
    width: 1200px;
    margin: auto;

    >div {
        background: white;
        height: 100%;
        border-radius: 10px;
        padding: 30px;
        display: flex;
        align-items: center;
        justify-content: center;
        position: relative;

        h3 {
            position: absolute;
            top: 30px;
            left: 30px;
        }
    }
}

</style>