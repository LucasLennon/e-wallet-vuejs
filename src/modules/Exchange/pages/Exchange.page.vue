<template>
  <MainLayout>
    <v-container>
      <v-card>
        <v-form v-model="valid" v-if="currentUser && currentUser.currency">
          <ExchangeSend
            :userCurrencyList="currentUser.currency"
            :quantity="sendCurrencyQuantity"
            :currencyType="sendCurrencyType"
            @update:currencyType="(value) => sendCurrencyType = value"
            @update:changeQuantity="(value) => sendCurrencyQuantity = value"
          />
          <v-divider />
          <ExchangeReceive
            :userCurrencyList="currentUser.currency"
            :listCurrencyTypes="currenciesToReceive"
            :quantity="receiveCurrencyQuantity"
            :currencyType="receiveCurrencyType"
            @update:currencyType="(value) => receiveCurrencyType = value"
            @update:changeQuantity="(value) => receiveCurrencyQuantity = value"
          />
          <v-divider />
          <v-row no-gutters class="pa-5" justify="end">
            <v-col cols="12" md="6" class="d-flex justify-end">
              <v-btn color="success" type="submit" :disabled="preventExchange()">Trocar</v-btn>
            </v-col>
          </v-row>
        </v-form>
      </v-card>
    </v-container>
  </MainLayout>
</template>
<script>
import { mapState, mapActions } from "vuex";
import MainLayout from "@/core/layouts/MainLayout.vue";
import ExchangeSend from "../components/ExchangeSend";
import ExchangeReceive from "../components/ExchangeReceive";

export default {
  name: "ExchangePage",
  components: {
    MainLayout,
    ExchangeSend,
    ExchangeReceive
  },
  computed: {
    ...mapState({
      currentUser: state => state.loginAndRegistration.user,
      currencyTypes: state => state.currencyTypes,
      dolarInfo: state => state.dolarInfo,
      bitcoinInfo: state => state.bitcoinInfo
    }),
    // currenciesToSend(){
    //   if (this.currentUser) {
    //     return this.currentUser.currency.filter(item => !!item.quantity);
    //   }
    // },
    observeChanges(){
      return [
        this.sendCurrencyQuantity,
        this.sendCurrencyType,
        this.receiveCurrencyQuantity,
        this.receiveCurrencyType
      ]
    },
    currenciesToReceive(){
      if (this.currentUser) {
        return this.currencyTypes.filter(item => item.simbolo !== this.sendCurrencyType.simbolo)
      }
    }
  },
  data: () => ({
    sendCurrencyQuantity: 0,
    sendCurrencyType: null,
    receiveCurrencyQuantity: 0,
    receiveCurrencyType: null,
    valid: false
  }),
  methods: {
    ...mapActions("exchange", ["requestTransaction"]),
    async makeTransaction() {
      const transaction = {
        userId: currentUser.id,
        type: "Troca de Moeda",
        receive: this.receive,
        send: this.send
      };
    },
    checkReceiveValue(value) {
    
      if (this.receiveCurrencyType.simbolo === "XBC") {
        this.receiveCurrencyQuantity = this.exchangeToBitcoinValue(
          value
        );
      }
      if (
        this.receiveCurrencyType.simbolo === "USD" ||
        this.receiveCurrencyType.simbolo === "XBT"
      ) {
        this.receiveCurrencyQuantity = this.exchangeToDolarValue(
          value
        );
      }
    },
    // checkSendValue(value){
    //   if (this.send.simbolo === "XBC") {
    //     this.send.quantity = this.exchangeFromBitcoinValue(value.quantity)
    //   }
    //   if (this.send.simbolo === "USD" || this.send.simbolo === "XBT") {
    //     this.send.quantity = this.exchangeFromDolarValue(value.quantity)
    //   }
    // },
    exchangeToDolarValue(value) {
      return value / this.dolarInfo[this.dolarInfo.length - 1].cotacaoCompra;
    },
    exchangeFromDolarValue(value) {
      return this.dolarInfo[this.dolarInfo.length - 1].cotacaoCompra / value;
    },
    exchangeToBitcoinValue(value) {
      return value / this.bitcoinInfo.buy;
    },
    exchangeFromBitcoinValue(value) {
      return this.bitcoinInfo.sell / value;
    },
    preventExchange(){
      if (this.receiveCurrencyQuantity === 0 || this.sendCurrencyQuantity === 0) {
        return true
      }
      return false
    }
  },
  watch: {
    observeChanges: {
      handler: function(value) {
        this.checkReceiveValue(this.sendCurrencyQuantity);
      },
      deep: true
    }
  }
};
</script>