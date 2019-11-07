<template>
  <v-app-bar class="pa-3" flat color="white" height="auto">
    <v-app-bar-nav-icon @click="drawerState = !drawerState" class="primary--text" />
    <v-toolbar-title class="primary--text">{{ title }}</v-toolbar-title>
    <v-spacer />
    <!-- <v-btn text height="auto"> -->
    <template v-if="currentUser">
      <v-avatar color="primary" class="align-self-end" v-ripple="{ center: true }">
        <v-icon color="white" v-if="!currentUser.image">fa-user</v-icon>
        <img v-else :src="currentUser.image" :alt="currentUser.name" />
      </v-avatar>
    </template>
    <!-- </v-btn> -->
  </v-app-bar>
</template>
<script>
import { mapState } from "vuex";
export default {
  name: "MainAppBar",
  props: {
    value: {
      type: Boolean,
      default: false,
      required: true
    }
  },
  computed: {
    ...mapState('loginAndRegistration', {
      currentUser: state => state.user
    }),
    drawerState: {
      get() {
        return this.value;
      },
      set(value) {
        this.$emit("input", value);
      }
    },
    title() {
      return this.$router.history.current.meta.title;
    }
  }
};
</script>