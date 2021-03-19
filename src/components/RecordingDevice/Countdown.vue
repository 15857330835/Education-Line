<template>
    <div id="countdown">
        {{ action }}
    </div>
</template>

<script>
  export default {
    name: 'Countdown',
    data() {
      return {

      };
    },
    props: ['action'],
    watch: {
        action: function() {
            $('#countdown').fadeIn(1000)
            $('#countdown').fadeOut(1000)
        }
    },
    computed: {

    },
    methods: {

    }
  }
</script>

<style lang="scss">
#countdown {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    margin: auto;
    width: 200px;
    height: 200px;
    border-radius: 50%;
    text-align: center;
    padding-top: 75px;
    background: white;
    font-size: 50px;
    display: none;
}
</style>
