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
    <v-text-field type="email" v-model="value.email" label="E-mail" :rules="[rules.required]" required />
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
export default {
  name: "FormUserInfo",
  props: {
    value: {
      type: Object
    }
  },
  data: () => ({
    rules: {
      required: e => !!e || "Campo vazio",
      tooSmall: e => !!e && e.length > 6 || "Deve ser maior que 6 caracteres.",
      oneLowerCase: e =>
        !!e && !!e.match(/[a-z]/g) || "Deve conter uma letra minuscula.",
      oneUppercase: e =>
        !!e && !!e.match(/[A-Z]/g) || "Deve conter uma letra maiuscula.",
      oneNumber: e => !!e && !!e.match(/[\d]/g) || "Deve conter um numero.",
      cpfLength: e => !!e && e.replace(/\D/g, '').length === 11 || 'CPF está incorreto',
    }
  })
};
</script>