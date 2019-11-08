<template>
  <v-flex class="grey lighten-3">
    <MainDrawer v-model="drawer" />
    <MainAppBar v-model="drawer" />
    <slot />
  </v-flex>
</template>
<script>
import { mapActions, mapState } from "vuex";
import MainDrawer from "../components/MainDrawer";
import MainAppBar from "../components/MainAppBar";
export default {
  name: "MainLayout",
  computed: {
    ...mapState('loginAndRegistration', {
      currentUser: state => state.user
    }),
  },
  data() {
    return {
      drawer: false
    };
  },
  components: {
    MainAppBar,
    MainDrawer
  },
  created(){
  if (!this.currentUser) {
      this.requestUser()
    }
  },
  methods: {
    ...mapActions('loginAndRegistration', [
      'requestUser'
    ])
  }
};
</script>