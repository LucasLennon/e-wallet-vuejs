<template>
  <v-form class="d-sm-flex">
    <v-flex row xs12 md6 class="align-center justify-center">
      <v-avatar color="primary" size="200">
        <v-icon
          size="100"
          v-if="!value.image"
          @click="$refs.image.click()"
          v-ripple="{ center: true }"
          class="white--text"
        >fa-camera</v-icon>
        <v-img v-else @click="$refs.image.click()" v-ripple="{ center: true }" :src="value.image" />
        <input ref="image" @change="addImage" type="file" hidden />
      </v-avatar>
    </v-flex>
    <v-flex xs12 md6>
      <v-text-field
        v-model="value.cpf"
        v-mask="['###.###.###-##']"
        label="CPF"
        :rules="[rules.required]"
        required
      />
      <v-text-field v-model="value.name" label="Nome" :rules="[rules.required]" required />
      <v-text-field v-model="value.email" label="E-mail" :rules="[rules.required]" required />
      <v-text-field
        v-model="value.password"
        type="password"
        label="Password"
        :rules="[rules.required, rules.tooSmall, rules.oneLowerCase, rules.oneUppercase, rules.oneNumber]"
        required
        hint="1 numero, 1 maiscula, 1 minuscula, 6 caracteres"
      />
    </v-flex>
  </v-form>
</template>
<script>
export default {
  name: "FormRegistration",
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
      oneNumber: e => !!e && !!e.match(/[\d]/g) || "Deve conter um numero."
    }
  }),
  methods: {
    addImage(e) {
      var file = e.target.files[0];
      if (file) {
        var reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
          this.value.image = reader.result;
          this.$emit('input', this.value)
        };
      }
    }
  }
};
</script>