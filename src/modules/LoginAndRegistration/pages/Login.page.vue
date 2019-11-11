<template>
  <v-container fill-height class="justify-center">
    <v-flex xs12 sm8 md6 style="position: relative;">
      <v-flex class="d-flex justify-end">
        <v-btn text link :to="{ name:'registrationPage' }">
          Registro
          <v-icon class="ml-5">fa-arrow-right</v-icon>
        </v-btn>
      </v-flex>
      <v-card :loading="loading" min-width="100%">
        <v-flex col class="pa-3">
          <CardTitle name="Login" />
          <v-divider />
        </v-flex>
        <v-flex col class="pa-3">
          <v-form class v-model="formValid" @submit.prevent="submit">
            <FormLogin v-model="form" />
            <v-btn type="submit" color="primary" block :disabled="!formValid">Logar</v-btn>
          </v-form>
        </v-flex>
      </v-card>
      <BaseAlert v-model="notification"/>
    </v-flex>
  </v-container>
</template>
<script>
import { mapActions } from "vuex";
import BaseAlert from "@/core/components/BaseAlert";
import CardTitle from "../components/CardTitle";
import FormLogin from "../components/FormLogin";
export default {
  name: "LoginPage",
  components: {
    BaseAlert,
    CardTitle,
    FormLogin
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
    ...mapActions("loginAndRegistration", ["requestLogin", "requestUser"]),
    async submit() {
      this.loading = true;
      try {
        await this.requestLogin(this.form);
        await this.requestUser();
        this.$router.push({ name: "dashboardPage" });
      } catch (error) {
        this.notification = {
          active: true,
          type: "error",
          message: "Informações invalidas, por favor verifique."
        };
      } finally {
        this.loading = false;
      }
    }
  }
};
</script>