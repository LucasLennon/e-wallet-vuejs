<template>
  <v-navigation-drawer color="primary" v-on="$listeners" v-bind="[$props]" absolute :temporary="true">

    <v-list-item>

      <DrawerLogo />
      
    </v-list-item>
    
    <v-list-item :key="key" v-for="(item, key) of drawerItens">
      <v-btn
        class="justify-start"
        block
        exact-active-class="white--text"
        text
        link
        :to="{ name: item.name }"
      >
        <v-icon class="mr-5">{{ item.icon }}</v-icon>
        {{ item.title }}
      </v-btn>
    </v-list-item>

    <template v-slot:append>
      <v-list-item class="pb-5">
        <v-btn
          class="justify-center"
          color="primary--text"
          block
          link
          @click="logout"
        >Logout</v-btn>
      </v-list-item>
    </template>
  </v-navigation-drawer>
</template>
<script>
import DrawerLogo from "./DrawerLogo";
import { mapState, mapActions } from "vuex";
export default {
  name: "MainDrawer",
  components: {
    DrawerLogo
  },
  props: {
    value: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    ...mapState({
      drawerItens: state => state.drawerItens
    }),
    drawerState: {
      get() {
        return this.value;
      },
      set(value) {
        this.$emit("input", value);
      }
    }
  },
  methods: {
    ...mapActions('loginAndRegistration', ['requestLogout']),
    logout(){
      this.requestLogout()
      this.$router.push({ name: "loginPage" })
    }
  }
};
</script>