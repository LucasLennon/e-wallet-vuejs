<template>
  <v-card>
    <v-card-title class="primary white--text">
      <h3>Saldo</h3>
    </v-card-title>
    <v-list>
      <v-list-item :key="key" v-for="(item, key) of items.slice(0, maxItems)">
        <v-row class="align-center" no-gutters>
          <v-col>
            <p class="pa-0 ma-0">{{item.nomeFormatado}}</p>
          </v-col>
          <v-col>
            <input
              class="headling text-end font-weight-bold"
              v-currency="{currency: item.simbolo, locale: 'pt-BR'}"
              v-model="item.quantity"
              style="width: 100%;"
              disabled
            />
          </v-col>
        </v-row>
      </v-list-item>
    </v-list>
    <v-divider />
    <v-card-actions class="pa-0">
      <v-row class="ma-0">
        <v-col align-self="center">Total in Bitcoin: {{totalInBitcoin}}</v-col>
        <v-col class="d-flex justify-end">
          <v-btn text class="secondary--text">
            Moedas
            <v-icon class="ml-5">fa-caret-right</v-icon>
          </v-btn>
        </v-col>
      </v-row>
    </v-card-actions>
  </v-card>
</template>
<script>
export default {
  name: "Balance",
  props: {
    items: {
      type: Array,
      required: true
    },
    maxItems: {
      type: Number,
      default: 4
    }
  }
};
</script>