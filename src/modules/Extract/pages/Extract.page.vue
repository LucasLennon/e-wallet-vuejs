<template>
  <MainLayout>
    <v-container>
      <!-- List -->
      <v-row>
        <v-col cols="12">
          <v-card>
            <ExtractList v-if="transactions && transactions.length > 0" :items="transactions" />
            <p class="display-1 text-center primary--text py-5 ma-0" v-else>
              Nenhuma transação encontrada.
            </p>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </MainLayout>
</template>
<script>
import { mapActions, mapState } from "vuex";
import MainLayout from "@/core/layouts/MainLayout.vue";
import ExtractList from "../components/ExtractList.vue";
export default {
  name: "ExtractPage",
  components: {
    MainLayout,
    ExtractList,
  },
  computed: {
    ...mapState('extract', {
      transactions: state => state.transactions
    })
  },
  mounted(){
    this.requestAllTransactions()
  },
  methods: {
    ...mapActions('extract', [
      'requestAllTransactions'
    ])
  }
};
</script>