<template>
  <MainLayout>
    <v-container>
      <v-card>
        <v-form
          v-model="valid"
          v-if="currentUser && currentUser.currency"
          @submit.prevent="makeTransaction"
        >
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
            :listCurrencyTypes="currencyTypes"
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
        <BaseAlert v-model="notification" />
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
    observeChanges() {
      return [
        this.sendCurrencyQuantity,
        this.sendCurrencyType,
        // this.receiveCurrencyQuantity,
        this.receiveCurrencyType
      ];
    },
    currenciesToReceive() {
      if (this.currentUser) {
        return this.currencyTypes.filter(
          item => item.simbolo !== this.sendCurrencyType.simbolo
        );
      }
    }
  },
  data: () => ({
    rerender: 0,
    notification: {
      active: false,
      message: null,
      type: null
    },
    sendCurrencyQuantity: 0,
    sendCurrencyType: null,
    receiveCurrencyQuantity: 0,
    receiveCurrencyType: null,
    valid: false
  }),
  methods: {
    ...mapActions("loginAndRegister", ["requestUser"]),
    ...mapActions("exchange", ["requestTransaction"]),
    async makeTransaction() {
      const transaction = {
        userId: this.currentUser.id,
        type: "Troca de Moeda",
        receive: {
          ...this.receiveCurrencyType,
          quantity: this.receiveCurrencyQuantity
        },
        send: {
          ...this.sendCurrencyType,
          quantity: this.sendCurrencyQuantity
        }
      };
      try {
        await this.requestTransaction(transaction);
        await this.requestUser()
        this.notification = {
          active: true,
          message: "Sucesso na Troca de moeda.",
          type: "success"
        };
      } catch (err) {
        this.notification = {
          active: true,
          message: "Ocorreu um erro, tente novamente.",
          type: "error"
        };
      } finally {
        this.$forceUpdate()
      }
    },
    adjustSendValue(sendValue) {
      if (this.sendCurrencyType.simbolo === "XBC") {
        return this.exchangeFromBitcoinValue(sendValue);
      }
      if (
        this.sendCurrencyType.simbolo === "USD" ||
        this.sendCurrencyType.simbolo === "XBT"
      ) {
        return this.exchangeFromDolarValue(sendValue);
      }
      return sendValue;
    },
    checkReceiveValue(sendValue) {
      const correctedValue = this.adjustSendValue(sendValue);

      if (this.receiveCurrencyType.simbolo === "XBC") {
        this.receiveCurrencyQuantity = this.exchangeToBitcoinValue(
          correctedValue
        );
        return true;
      }
      if (
        this.receiveCurrencyType.simbolo === "USD" ||
        this.receiveCurrencyType.simbolo === "XBT"
      ) {
        this.receiveCurrencyQuantity = this.exchangeToDolarValue(
          correctedValue
        );
        return true;
      }
      this.receiveCurrencyQuantity = correctedValue;
    },
    exchangeToDolarValue(value) {
      return value / this.dolarInfo[this.dolarInfo.length - 1].cotacaoCompra;
    },
    exchangeFromDolarValue(value) {
      return value * this.dolarInfo[this.dolarInfo.length - 1].cotacaoVenda;
    },
    exchangeToBitcoinValue(value) {
      return value / this.bitcoinInfo.high;
    },
    exchangeFromBitcoinValue(value) {
      return value * this.bitcoinInfo.low;
    },
    preventExchange() {
      if (
        this.receiveCurrencyQuantity === 0 ||
        this.sendCurrencyQuantity === 0
      ) {
        return true;
      }
      return false;
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