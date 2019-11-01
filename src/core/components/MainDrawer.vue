<template>
  <v-navigation-drawer color="primary" v-on="$listeners" v-bind="[$props]" absolute>
    <v-list-item>
      <v-flex py-5 xs12 class="justify-center">
        <h1 class="text-center white--text display-1"> E-Wallet </h1>
      </v-flex>
    </v-list-item>
    <v-list-item :key="key" v-for="(item, key) of drawerItens">
      <v-btn class="justify-start" block exact-active-class="white--text" text link :to='{ name: item.name }'>
        <v-icon class="mr-5">
          {{item.icon}}
        </v-icon>
        {{item.title}}
      </v-btn>
    </v-list-item>
  </v-navigation-drawer>
</template>
<script>
import { mapState } from "vuex";
export default {
  name: "MainDrawer",
  props: {
    value: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    ...mapState({
      drawerItens: state => state.drawerItens,
    }),
    drawerState: {
      get(){
        return this.value
      },
      set(value){
        this.$emit('input', value)
      }
    }
  },
};
</script>