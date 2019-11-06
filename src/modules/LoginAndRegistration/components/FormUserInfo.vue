<template>
  <v-flex>
    <v-text-field
      v-model="value.cpf"
      v-mask="['###.###.###-##']"
      label="CPF"
      :rules="[rules.required, rules.cpfLength]"
      required
    />
    <v-text-field v-model="value.name" label="Nome" :rules="[rules.required]" required />
    <v-text-field type="email" v-model="value.email" label="E-mail" :rules="[rules.emailFormat, rules.required]" required />
    <v-text-field
      v-model="value.password"
      type="password"
      label="Senha"
      :rules="[rules.required, rules.tooSmall, rules.oneLowerCase, rules.oneUppercase, rules.oneNumber]"
      required
      hint="1 numero, 1 maiscula, 1 minuscula, 6 caracteres"
    />
  </v-flex>
</template>
<script>
import rules from "../rules"
export default {
  name: "FormUserInfo",
  props: {
    value: {
      type: Object
    }
  },
  data: () => ({
    rules: {
      required: rules.required,
      emailFormat: rules.emailFormat,
      tooSmall: rules.tooSmall,
      oneLowerCase: rules.oneLowerCase,
      oneUppercase: rules.oneUppercase,
      oneNumber: rules.oneNumber,
      cpfLength: rules.cpfLength,
    }
  })
};
</script>