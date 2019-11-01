<template>
  <v-app-bar flat color="white">
    <v-app-bar-nav-icon @click="drawerState = !drawerState" class="primary--text"></v-app-bar-nav-icon>
    <v-toolbar-title class="primary--text">
      {{title}}
    </v-toolbar-title>
  </v-app-bar>
</template>
<script>
export default {
  name: "MainAppBar",
  props: {
    value: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    drawerState: {
      get(){
        return this.value
      },
      set(value){
        this.$emit('input', value)
      }
    },
    title(){
      return this.$router.history.current.meta.title
    }
  }
};
</script>