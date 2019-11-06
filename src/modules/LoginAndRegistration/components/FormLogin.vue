<template>
  <v-flex xs12>
    <v-text-field
      type="email"
      v-model="value.email"
      :rules="[rules.required]"
      label="E-mail"
      required
    />
    <v-text-field
      type="password"
      v-model="value.password"
      :rules="[rules.required]"
      label="Senha"
      required
    />
  </v-flex>
</template>
<script>
export default {
  name: "FormLogin",
  props: {
    value: {
      type: Object,
      required: true
    }
  },
  data: () => ({
    rules: {
      required: e => !!e || "Campo vazio"
    }
  })
};
</script>