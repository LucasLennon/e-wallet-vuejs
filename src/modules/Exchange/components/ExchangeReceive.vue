<template>
  <v-row no-gutters align="center" class="pa-5">
    <v-col cols="12" sm="6">
      <v-row>
        <!-- <v-col cols="12" v-if="currentCurrency">
          Saldo em Conta:
          <currency-input
            v-if="userBalanceOnCurrency"
            :currency="userBalanceOnCurrency.simbolo"
            locale="pt-BR"
            :value="userBalanceOnCurrency.quantity"
            disabled
          />
          <currency-input
            v-else
            :currency="currentCurrency.simbolo"
            locale="pt-BR"
            :value="0"
            disabled
          />
        </v-col> -->
        <v-col cols="12">
          <v-select
            v-model="currentCurrency"
            :items="listCurrencyTypes"
            item-text="nomeFormatado"
            placeholder="Escolha uma moeda"
            :return-object="true"
          />
        </v-col>
      </v-row>
    </v-col>
    <v-col cols="12" sm="6" class="px-5" v-if="currentCurrency">
      <v-row>
        <h4 class="text-end" style="width: 100%;">Você recebe</h4>
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
  name: "ExchangeReceive",
  props: {
    userCurrencyList: {
      type: Array,
      default: () => []
    },
    listCurrencyTypes: {
      type: Array,
      default: () => []
    },
    currencyType: {
      type: Object
    },
    quantity: {
      type: Number
    }
  },
  computed: {
    userBalanceOnCurrency() {
      return this.userCurrencyList.find(
        item => item.simbolo === this.currentCurrency.simbolo
      );
    },
    currentQuantity: {
      get() {
        return this.quantity;
      },
      set(value) {
        this.$emit("update:changeQuantity", value);
      }
    },
    currentCurrency: {
      get() {
        return this.currencyType;
      },
      set(value) {
        this.$emit("update:currencyType", value);
      }
    }
  }
};
</script>
