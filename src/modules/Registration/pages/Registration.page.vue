<template>
  <v-container
    fill-height
    class="justify-center"
  >
    <v-flex
      xs12
      sm10
      md8
    >
      <v-flex class="d-flex justify-start">
        <v-btn
          text
          link
          :to="{ name:'loginPage' }"
        >
          <v-icon class="mr-5">
            fa-arrow-left
          </v-icon>Login
        </v-btn>
      </v-flex>
      <v-card
        :loading="loading"
        min-width="100%"
      >
        <v-col class="pa-5">
          <FormRegistration v-model="form"/>
        </v-col>
      </v-card>
    </v-flex>
  </v-container>
</template>
<script>
import FormRegistration from "../components/FormRegistration";
export default {
  name: "RegisterPage",
  components: {
    FormRegistration
  },
  data: () => ({
    loading: null,
    form: {
      cpf: null,
      name: null,
      email: null,
      image: null,
      password: null
    }
  })
};
</script>