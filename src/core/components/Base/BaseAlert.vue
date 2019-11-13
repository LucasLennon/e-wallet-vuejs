<template>
  <v-alert
    class="alert--absolute"
    v-model="value.active"
    v-show="value.active"
    :type="value.type"
    dismissible
    transition="scroll-y-reverse-transition"
    width="100%"
  >{{value.message}}</v-alert>
</template>
<script lang="js">
export default {
  name: "BaseAlert",
  props:{
    value: {
      type: Object
    }
  }
}
</script>
<style lang="scss">
  .alert--absolute{
    position: absolute;
  }
</style>