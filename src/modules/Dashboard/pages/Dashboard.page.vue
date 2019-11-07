<template>
  <MainLayout>
    <v-card class="d-sm-flex flex-wrap">
      <v-flex xs12 class="d-flex align-center px-5">
        <h3>
          Saldo em {{currencyDisplay.nomeFormatado}}
        </h3>
        <v-spacer />
        <v-flex xs4>
          <v-select v-model="currencyDisplay" :items="currencyType" item-text="nomeFormatado" :return-object="true" />
        </v-flex>
      </v-flex>
      <v-flex col v-if="userCurrency">
        <h2>
          {{
            currencyDisplay.simbolo
          }}
          {{
            currentBalance
          }}
        </h2>
      </v-flex>
    </v-card>
  </MainLayout>
</template>
<script>
import { mapActions, mapState } from "vuex";
import MainLayout from "@/core/layouts/MainLayout.vue";
export default {
  name: "HomePage",
  computed: {
    ...mapState('loginAndRegistration', {
      userCurrency: state => (!!state.user && !!state.user.currency) ? state.user.currency: null
    })
  },
  components: {
    MainLayout
  },
  data: () => ({
    currencyDisplay: {
      nomeFormatado: "Real Brasileiro",
      simbolo: "R$",
      tipoMoeda: "A"
    },
    currencyType: [
      {
        nomeFormatado: "Real Brasileiro",
        simbolo: "R$",
        tipoMoeda: "A"
      },
      {
        nomeFormatado: "Teste",
        simbolo: "R$",
        tipoMoeda: "A"
      }
    ],
    currentBalance: 0,
  }),
  methods: {
    changeCurrency(){
      this.currentBalance = this.userCurrency.find(item => item.simbolo === this.currencyDisplay.simbolo).quantity
    }
  },
  watch: {
    currencyDisplay:{
      handler: function (value) {
        if(!!this.userCurrency){
          this.changeCurrency()
        }
      },
      immediate: true
    },
    userCurrency:{
      handler: function (value) {
        if(!!value){
          this.changeCurrency()
        }
      },
      immediate: true
    }
  }
};
</script>