<template>
  <v-container fill-height class="justify-center">
    <v-flex xs12 sm8 md6>
      <v-flex class="d-flex justify-end">
        <v-btn text link :to="{ name:'registrationPage' }">
          Registro
          <v-icon class="ml-5">fa-arrow-right</v-icon>
        </v-btn>
      </v-flex>
      <v-card class="pa-5" :loading="loading" min-width="100%">
        <v-col>
          <CardTitle name="Login" />
          <v-divider />
        </v-col>
        <v-col>
          <v-form class="" v-model="formValid" @submit.prevent="submit">
            <FormLogin v-model="form" />
            <v-btn type="submit" color="primary" block :disabled="!formValid">Logar</v-btn>
          </v-form>
        </v-col>
      </v-card>
    </v-flex>
  </v-container>
</template>
<script>
import { mapActions } from "vuex";
import CardTitle from "../components/CardTitle";
import FormLogin from "../components/FormLogin";
export default {
  name: "LoginPage",
  components: {
    CardTitle,
    FormLogin,
  },
  data: () => ({
    notification: {
      active: false,
      type: null,
      message: null
    },
    loading: false,
    formValid: true,
    form: {
      email: null,
      password: null
    }
  }),
  methods: {
    ...mapActions("loginAndRegistration", ["requestLogin"]),
    async submit() {
      this.loading = true;
      try {
        await this.requestLogin(this.form);
        this.$router.push({ name: "dashboardPage" })
      } catch (error) {
        console.error(error);
      } finally {
        this.loading = false;
      }
    }
  }
};
</script>