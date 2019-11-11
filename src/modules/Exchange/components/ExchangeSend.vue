<template>
  <v-row no-gutters>
    <!-- Currency of choice -->
    <v-col cols="3">
      <v-select v-model="currentCurrency" :items="currencyTypes" item-text="nomeFormatado" :return-object="true"/>
    </v-col>
    <!-- Your balance on the chosen balance -->
    <v-col cols="3">
    </v-col>
    <!-- How much you want to send -->
    <v-col cols="3">
    </v-col>
  </v-row>
</template>
<script>
import { mapState, mapActions } from "vuex";
export default {
  name: "ExchangeValue",
  data: () => ({
    currentCurrency: {
      simbolo: "BRL",
      nomeFormatado: "Real Brasileiro",
      tipoMoeda: "A",
      quantity: 0
    }
  }),
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