<template>
  <v-row no-gutters align="center" class="pa-5" v-if="currentCurrency">
    <v-col cols="12" sm="6">
      <v-row>
        <v-col cols="12">
          Saldo em Conta: <currency-input :currency="currentCurrency.simbolo" locale="pt-BR" :value="maxValue" disabled/>
        </v-col>
        <v-col cols="12">
          <v-select v-model="currentCurrency" :items="currencyTypes" item-text="nomeFormatado" :return-object="true"/>
        </v-col>
      </v-row>
    </v-col>
    <v-col cols="12" sm="6" class="px-5">
      <v-row>
        <h4 class="text-end" style="width: 100%;">Você envia</h4>
      </v-row>
      <v-row>
        <currency-input :currency="currentCurrency.simbolo" locale="pt-BR" :distraction-free="false" class="headline text-end" v-model="currentCurrency.quantity" :min="0" :max="maxValue" style="width: 100%;"/>
      </v-row>
    </v-col>
  </v-row>
</template>
<script>
import { mapState, mapActions } from "vuex";
import { log } from 'util';
export default {
  name: "ExchangeValue",
  props: {
    value: {
      type: Object
    },
    user: {
      type: Object
    }
  },
  computed: {
    ...mapState({
      currencyTypes: state => state.currencyTypes
    }),
    currentCurrency:{
      get(){
        if (this.user) {
          if (!!this.value.quantity === false) {
            this.value.quantity = 0;
          }
          return this.value;
        }
      },
      set(value){
        this.maxValue
        this.$emit('input', value)
      }
    },
    maxValue(){
      let currency = this.user.currency.find(item => item.nomeFormatado === this.currentCurrency.nomeFormatado)
      if (currency) {
        return currency.quantity || 0;
      }
      return 0;
    }
  },
};
</script>