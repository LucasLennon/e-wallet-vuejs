<template>
  <MainLayout>
    <v-container>
      <v-card>
        <v-form v-model="valid">
          <ExchangeSend v-model="send" />
          <ExchangeReceive v-model="receive" />
          <v-row no-gutters class="pa-5" justify="end">
            <v-col cols="12" md="6" class="d-flex justify-end">
              <v-btn color="success" type="submit">Trocar</v-btn>
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
      dolarInfo: state => state.dolarInfo,
      bitcoinInfo: state => state.bitcoinInfo
    })
  },
  data: () => ({
    send: {
      simbolo: "BRL",
      nomeFormatado: "Real Brasileiro",
      tipoMoeda: "A",
      quantity: 0
    },
    receive: {
      simbolo: "XBC",
      nomeFormatado: "BitCoin",
      tipoMoeda: "A",
      quantity: 0
    },
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
      //   await requestTransaction(transaction)
    }
  }
};
</script>