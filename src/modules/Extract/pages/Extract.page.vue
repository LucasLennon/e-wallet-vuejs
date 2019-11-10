<template>
  <MainLayout>
    <v-container>
      <!-- Filters -->
      <v-row></v-row>
      <!-- List -->
      <v-row>
        <v-col cols="12">
          <v-card>
            <ExtractList />
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