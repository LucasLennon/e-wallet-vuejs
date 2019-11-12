<template>
  <v-row no-gutters align="center" class="pa-5" v-if="currentCurrency">
    <v-col cols="12" sm="6">
      <v-row>
        <v-col cols="12">
          Saldo em Conta:
          <currency-input
            :currency="currentCurrency.simbolo"
            locale="pt-BR"
            :value="currentCurrency.quantity"
            disabled
          />
        </v-col>
        <v-col cols="12">
          <v-select
            v-model="currentCurrency"
            :items="listCurrencyTypes"
            item-text="nomeFormatado"
            :return-object="true"
          />
        </v-col>
      </v-row>
    </v-col>
    <v-col cols="12" sm="6" class="px-5">
      <v-row>
        <h4 class="text-end" style="width: 100%;">Você envia</h4>
      </v-row>
      <v-row>
        <currency-input
          :currency="currentCurrency.simbolo"
          locale="pt-BR"
          :distraction-free="false"
          class="headline text-end"
          v-model="currentQuantity"
          :min="0"
          :max="currentCurrency.quantity"
          style="width: 100%;"
          disabled
        />
      </v-row>
    </v-col>
  </v-row>
</template>
<script>
import { mapState, mapActions } from "vuex";
export default {
  name: "ExchangeSend",
  props: {
    userCurrencyList: {
      type: Array
    },
    listCurrencyTypes: {
      type: Array
    },
    currencyType: {
      type: Object
    },
    quantity: {
      type: Number
    }
  },
  computed: {
    currentQuantity: {
      get() {
        return this.quantity;
      },
      set(value) {
        this.$emit('update:changeQuantity', value)
      }
    },
    currentCurrency: {
      get(){
        return this.currencyType
      },
      set(value){
        this.$emit('update:currencyType', value)
      }
    },
  },
  mounted(){
    this.currentCurrency = this.listCurrencyTypes[0];
  }
};
</script>