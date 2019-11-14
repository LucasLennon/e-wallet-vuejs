<template>
  <MainLayout>
    <v-container>
      <v-row>
        <v-col cols="12">
          <Balance :loading="!filteredBalance" :items="filteredBalance" />
        </v-col>
      </v-row>
    </v-container>
  </MainLayout>
</template>
<script>
import { mapActions, mapState } from "vuex";
import MainLayout from "@/core/layouts/MainLayout.vue";
import Balance from "@/core/components/Balance";
export default {
  name: "HomePage",
  computed: {
    ...mapState("loginAndRegistration", {
      userCurrencyList: state => state.userCurrencyList
    }),
    filteredBalance() {
      const sort = this.userCurrencyList.sort((a, b) => {
        if (a.quantity < b.quantity) {
          return -1;
        }
        if (a.quantity > b.quantity) {
          return 1;
        }
        // a deve ser igual a b
        return 0;
      });
      return sort.splice(0, 5);
    }
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
  created() {
    this.getBitcoinInfo();
    this.getDolarInfo();
  },
  methods: {
    ...mapActions(["getBitcoinInfo", "getDolarInfo"])
  }
};
</script>
