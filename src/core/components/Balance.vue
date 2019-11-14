<template>
  <v-card v-if="items">
    <v-card-title class="primary white--text">
      <h3>Saldos por moeda</h3>
    </v-card-title>
    <v-list>
      <template v-for="(item, key) of listItems">
        <v-list-item v-if="item.quantity > 0" :key="key">
          <v-row class="align-center" no-gutters>
            <v-col>
              <p class="pa-0 ma-0">{{item.nomeFormatado}}</p>
            </v-col>
            <v-col>
              <currency-input
                class="headling text-end font-weight-bold"
                v-currency="{currency: item.simbolo, locale: 'pt-BR'}"
                :value="item.quantity"
                style="width: 100%;"
                disabled
              />
            </v-col>
          </v-row>
        </v-list-item>
      </template>
    </v-list>
  </v-card>
</template>
<script>
export default {
  name: "Balance",
  props: {
    items: {
      type: Array,
    },
    maxItems: {
      type: Number,
      default: 4
    }
  },
  computed: {
    listItems(){
      return this.items.slice(0, this.maxItems)
    }
  },
  data:() => ({
    totalInBitcoin: 0,
  }),
};
</script>