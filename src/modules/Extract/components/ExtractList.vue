<template>
  <v-data-table :headers="headers" :items="items" :items-per-page="5">
    <template v-slot:item.created_at="{ item }">
      {{
        new Date(item.created_at).toLocaleString("pt-BR", {
          dateStyle: "short"
        })
      }}
    </template>
    <template v-slot:item.send="{ item }">
      <v-row
        v-if="item && item.send && item.send.quantity && item.send.quantity"
        justify="end"
      >
        <p class="headling text-end font-weight-bold ma-0">
          {{
            new Intl.NumberFormat("pt-BR", {
              style: "currency",
              currency: item.send.simbolo
            }).format(item.send.quantity)
          }}
        </p>
        <v-icon class="ml-3" color="error">fa-arrow-down</v-icon>
      </v-row>
    </template>
    <template v-slot:item.receive="{ item }">
      <v-row
        v-if="
          item && item.receive && item.receive.quantity && item.receive.quantity
        "
        justify="end"
      >
        <p class="headling text-end font-weight-bold ma-0">
          {{
            new Intl.NumberFormat("pt-BR", {
              style: "currency",
              currency: item.receive.simbolo
            }).format(item.receive.quantity)
          }}
        </p>
        <!-- <input type="text" v-model="item.receive.simbolo"> -->
        <v-icon class="ml-3" color="secondary">fa-arrow-up</v-icon>
      </v-row>
    </template>
  </v-data-table>
</template>
<script>
export default {
  name: "ExtractList",
  props: {
    items: {
      type: Array
    }
  },
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
        value: "receive"
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
