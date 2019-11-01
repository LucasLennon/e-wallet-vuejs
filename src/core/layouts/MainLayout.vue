<template>
    <v-flex class="white">
        <MainDrawer v-model="drawer" />
        <MainAppBar v-model="drawer" />
    </v-flex>
</template>
<script>
import MainDrawer from "../components/MainDrawer";
import MainAppBar from "../components/MainAppBar";
export default {
  name: "MainLayout",
  data(){
    return {
      drawer: false,
    }
  },
  components: {
    MainAppBar,
    MainDrawer
  }
};
</script>