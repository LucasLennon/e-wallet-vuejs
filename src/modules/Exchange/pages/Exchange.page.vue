<template>
  <MainLayout>
    <v-container>
      <Balance :items="currentUser.currency" />
    </v-container>
    <v-container>
      <v-card>
        <v-form
          v-model="valid"
          v-if="currentUser && currentUser.currency"
          @submit.prevent="makeTransaction"
        >
          <ExchangeSend
            :userCurrencyList="currenciesToSend"
            :quantity="sendCurrencyQuantity"
            :currencyType="sendCurrencyType"
            @update:currencyType="value => (sendCurrencyType = value)"
            @update:changeQuantity="value => (sendCurrencyQuantity = value)"
            :key="contentSend + 100"
          />
          <v-divider />
          <ExchangeReceive
            v-if="sendCurrencyType"
            :userCurrencyList="currentUser.currency"
            :listCurrencyTypes="currenciesToReceive"
            :quantity="receiveCurrencyQuantity"
            :currencyType="receiveCurrencyType"
            @update:currencyType="value => (receiveCurrencyType = value)"
            @update:changeQuantity="value => (receiveCurrencyQuantity = value)"
            :key="contentReceive + 1"
          />
          <v-divider />
          <v-row no-gutters class="pa-5" justify="end">
            <v-col cols="12" md="6" class="d-flex justify-end">
              <v-btn
                class="exchangeButton"
                color="success"
                type="submit"
                :disabled="preventExchange()"
                >Trocar</v-btn
              >
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
import Balance from "@/core/components/Balance";
import ExchangeSend from "../components/ExchangeSend";
import ExchangeReceive from "../components/ExchangeReceive";

export default {
  name: "ExchangePage",
  components: {
    MainLayout,
    Balance,
    ExchangeSend,
    ExchangeReceive
  },
  computed: {
    ...mapState({
      currentUser: state => state.loginAndRegistration.user,
      currencyTypes: state => state.currencyTypes,
      dolarInfo: state => state.dolarInfo[state.dolarInfo.length - 1],
      bitcoinInfo: state => state.bitcoinInfo
    }),
    observeChanges() {
      return [
        this.sendCurrencyQuantity,
        this.sendCurrencyType,
        this.receiveCurrencyType
      ];
    },
    currenciesToSend() {
      return this.currentUser.currency.filter(item => item.quantity > 0);
    },
    currenciesToReceive() {
      if (this.sendCurrencyType) {
        return this.currencyTypes.filter(
          item => item.simbolo !== this.sendCurrencyType.simbolo
        );
      }
    }
  },
  data: () => ({
    contentSend: 0,
    contentReceive: 0,
    notification: {
      active: false,
      message: null,
      type: null
    },
    sendCurrencyQuantity: 0,
    receiveCurrencyQuantity: 0,
    sendCurrencyType: null,
    receiveCurrencyType: null,
    valid: false
  }),
  methods: {
    ...mapActions("loginAndRegistration", ["requestUser"]),
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
        await this.requestUser();
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
        this.sendCurrencyType.quantity = this.currentUser.currency.find(
          item => item.simbolo === this.sendCurrencyType.simbolo
        ).quantity;
        this.contentSend += 1;
        this.contentReceive += 1;
        if (this.sendCurrencyType.quantity < 0) {
          this.sendCurrencyType = null;
        }
      }
    },
    defineSendValue(sendValue) {
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
    defineReceiveValue(sendValue) {
      const correctedValue = this.defineSendValue(sendValue);

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
      return true;
    },
    exchangeToDolarValue(value) {
      return value / this.dolarInfo.cotacaoCompra;
    },
    exchangeFromDolarValue(value) {
      return value * this.dolarInfo.cotacaoVenda;
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
      if (this.receiveCurrencyType.simbolo === this.sendCurrencyType.simbolo) {
        return true;
      }
      return false;
    }
  },
  watch: {
    observeChanges: {
      handler: function(value) {
        if (!value.includes(null)) {
          this.defineReceiveValue(this.sendCurrencyQuantity);
        }
      },
      deep: true
    }
  }
};
</script>
