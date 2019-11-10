<template>
  <MainLayout>
    <v-row>
      <v-col cols="12" md="6" lg="6">
        <v-col>
          <!-- <v-row>
            <v-col cols="6">
              <v-btn>Botao</v-btn>
            </v-col>
            <v-col cols="6">
              <v-btn>Botao</v-btn>
            </v-col>
          </v-row>-->
          <Balance :items="userCurrencyList" />
          
        </v-col>
      </v-col>
    </v-row>
  </MainLayout>
</template>
<script>
import { mapActions, mapState } from "vuex";
import MainLayout from "@/core/layouts/MainLayout.vue";
import Balance from "../components/Balance";
export default {
  name: "HomePage",
  computed: {
    ...mapState("loginAndRegistration", {
      userCurrencyList: state => state.userCurrencyList
    })
  },
  components: {
    MainLayout,
    Balance
  },
  data: () => ({
    currencyType: [
      {
        nomeFormatado: "Real Brasileiro",
        simbolo: "BRL",
        tipoMoeda: "A"
      },
      {
        nomeFormatado: "Dolar Americano",
        simbolo: "USD",
        tipoMoeda: "A"
      }
    ],
    currentBalance: 0,
    totalInBitcoin: 0
  }),
};
</script>