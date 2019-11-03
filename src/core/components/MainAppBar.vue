<template>
  <v-app-bar class="pa-3" flat color="white" height="auto">
    <v-app-bar-nav-icon @click="drawerState = !drawerState" class="primary--text" />
    <v-toolbar-title class="primary--text">{{ title }}</v-toolbar-title>
    <v-spacer />
    <!-- <v-btn text height="auto"> -->
    <v-avatar color="primary" class="align-self-end" v-ripple="{ center: true }">
      <v-icon color="white" v-if="!user.image">fa-user</v-icon>
      <img v-else :src="user.image" :alt="user.name" />
    </v-avatar>
    <!-- </v-btn> -->
  </v-app-bar>
</template>
<script>
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
    drawerState: {
      get() {
        return this.value;
      },
      set(value) {
        this.$emit("input", value);
      }
    },
    user() {
      return {
        image: "https://scontent.fbfh3-3.fna.fbcdn.net/v/t1.0-1/p160x160/26239279_1674575349231913_1901660412605220150_n.jpg?_nc_cat=104&_nc_oc=AQnWcNDHG704v33NSdgjGxt0iGSiIZ-13yldEZuo_nzL2xg0TdbjF6egHtjL-SZFitk&_nc_ht=scontent.fbfh3-3.fna&oh=9bd931a066c2b7311856f88da21661f6&oe=5E597C6D",
        name: "Lucas"
      };
    },
    title() {
      return this.$router.history.current.meta.title;
    }
  }
};
</script>