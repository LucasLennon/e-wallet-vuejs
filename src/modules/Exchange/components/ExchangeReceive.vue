<template>
  <v-row no-gutters>
    <v-col cols="12">
    </v-col>
  </v-row>
</template>
<script>
import { mapState, mapActions } from "vuex";
export default {
  name: "ExchangeValue",
  // props: {
  //   value: {
  //     type: Object
  //   }
  // },
  computed: {
    ...mapState({
      currencyTypes: state => state.currencyTypes
    })
  }
};
</script>