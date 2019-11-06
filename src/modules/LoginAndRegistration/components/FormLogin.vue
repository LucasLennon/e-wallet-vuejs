<template>
  <v-flex xs12>
    <v-text-field
      type="email"
      v-model="value.email"
      :rules="[rules.required, rules.emailFormat]"
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
import rules from "../rules"
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
      required: rules.required,
      emailFormat: rules.emailFormat,
    }
  })
};
</script>