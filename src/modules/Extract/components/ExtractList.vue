<template>
  <v-data-table :headers="headers" :items="items" :items-per-page="5">
    <template v-slot:item.created_at="{ item }">
      {{
      new Date(item.created_at).toLocaleString('pt-BR', { dateStyle: 'short' })
      }}
    </template>
    <template v-slot:item.send="{ item }">
      <v-row v-if="item && item.send.quantity && item.send.quantity" justify="end">
        <currency-input
          class="headling text-end font-weight-bold"
          v-currency="{currency: item.send.simbolo, locale: 'pt-BR'}"
          v-model="item.send.quantity"
          style="width: auto;"
          disabled
        />
        <v-icon class="ml-3" color="error">fa-arrow-down</v-icon>
      </v-row>
    </template>
    <template v-slot:item.received="{ item }">
      <v-row v-if="item && item.received.quantity && item.received.quantity" justify="end">
        <currency-input
          class="headling text-end font-weight-bold"
          v-currency="{currency: item.received.simbolo, locale: 'pt-BR'}"
          v-model="item.received.quantity"
          style="width: auto;"
          disabled
        />
        <v-icon class="ml-3" color="secondary">fa-arrow-up</v-icon>
      </v-row>
    </template>
  </v-data-table>
  <!-- <v-list>
    <v-list-item>
      <v-row>
        <v-col cols="12" sm="3" md="2" align-self="center">
          <p
            class="ma-0 caption"
          >Data {{new Date().toLocaleString('pt-BR', { dateStyle: 'short' })}}</p>
        </v-col>
        <v-col cols="12" sm="3" md="4">Compra de Bitcoin</v-col>
        <v-col cols="6" sm="3" md="3" class="text-center text-md-end">
          <v-icon class="mr-5" color="error">fa-arrow-down</v-icon>
          <span>R$ 100.000,00</span>
        </v-col>
        <v-col cols="6" sm="3" md="3" class="text-center text-md-end">
          <v-icon class="mr-5" color="secondary">fa-arrow-up</v-icon>
          <span>B 1</span>
        </v-col>
      </v-row>
    </v-list-item>
  </v-list>-->
</template>
<script>
export default {
  name: "ExtractList",
  //   props: {
  //     items: {
  //       type: Array
  //     }
  //   },
  data: () => ({
    headers: [
      {
        text: "Data",
        align: "left",
        sortable: true,
        value: "created_at"
      },
      {
        text: "Tipo de Ação",
        align: "left",
        sortable: true,
        value: "type"
      },
      {
        text: "Enviado",
        align: "right",
        sortable: true,
        value: "send"
      },
      {
        text: "Recebido",
        align: "right",
        sortable: true,
        value: "received"
      }
    ],
    items: [
      {
        type: "Troca",
        created_at: new Date().toISOString(),
        send: {
          simbolo: "BRL",
          nomeFormatado: "Real Brasileiro",
          tipoMoeda: "A",
          quantity: 37829.98984
        },
        received: {
          simbolo: "BRL",
          nomeFormatado: "Real Brasileiro",
          tipoMoeda: "A",
          quantity: 37829.98984
        }
      },
      {
        type: "Recebimento",
        created_at: new Date().toISOString(),
        send: {
          //   simbolo: "BRL",
          //   nomeFormatado: "Real Brasileiro",
          //   tipoMoeda: "A",
          //   quantity: 37829.98984
        },
        received: {
          simbolo: "BRL",
          nomeFormatado: "Real Brasileiro",
          tipoMoeda: "A",
          quantity: 37829.98984
        }
      }
    ],
    methods: {
      parseValue(value) {
        return this.$parseCurrency(value);
      }
    }
  })
};
</script>