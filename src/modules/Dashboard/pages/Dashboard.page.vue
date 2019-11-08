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
          <Balance v-if="userCurrency" :items="userCurrency" />
          
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
      userCurrency: state =>
        !!state.user && !!state.user.currency ? state.user.currency : null
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
  methods: {
    changeCurrency() {
      const currencyType = this.userCurrency.find(
        item => item.simbolo === this.currencyDisplay.simbolo
      );
      if (!!currencyType) {
        this.currentBalance = currencyType.quantity;
      } else {
        this.currentBalance = 0;
      }
    }
  },
  watch: {
    currencyDisplay: {
      handler: function(value) {
        if (!!this.userCurrency) {
          this.changeCurrency();
        }
      },
      immediate: true
    },
    userCurrency: {
      handler: function(value) {
        if (!!value) {
          this.changeCurrency();
        }
      },
      immediate: true
    }
  }
};
</script>