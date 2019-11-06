<template>
  <v-container fill-height class="justify-center">
    <v-flex xs12 sm10 md8 style="position: relative;">
      <v-flex class="d-flex justify-start">
        <v-btn text link :to="{ name:'loginPage' }">
          <v-icon class="mr-5">fa-arrow-left</v-icon>Login
        </v-btn>
      </v-flex>
      <v-card class="pa-5" :loading="loading" min-width="100%">
        <v-col>
          <CardTitle name="Registro" />
          <v-divider />
        </v-col>
        <v-col>
          <v-form v-model="formValid" @submit.prevent="submit">
            <v-flex class="d-sm-flex">
              <v-flex col xs12 md6>
                <FormUserAvatar v-model="form.image" />
              </v-flex>
              <v-flex col xs12 md6>
                <FormUserInfo v-model="form" />
                <v-btn type="submit" color="primary" block :disabled="!formValid">Registrar</v-btn>
              </v-flex>
            </v-flex>
          </v-form>
        </v-col>
      </v-card>
      <BaseAlert
        v-model="notification"
      />
    </v-flex>
  </v-container>
</template>
<script>
import { mapActions } from "vuex";
import BaseAlert from "@/core/components/BaseAlert";
import CardTitle from "../components/CardTitle";
import FormUserAvatar from "../components/FormUserAvatar";
import FormUserInfo from "../components/FormUserInfo";
export default {
  name: "RegistrationPage",
  components: {
    BaseAlert,
    CardTitle,
    FormUserAvatar,
    FormUserInfo
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
      cpf: null,
      name: null,
      email: null,
      image: null,
      password: null
    }
  }),
  methods: {
    ...mapActions("loginAndRegistration", ["registerNewUser"]),
    async submit() {
      this.loading = true;
      try {
        await this.registerNewUser(this.form);
        this.notification = {
          active: true,
          type: "success",
          message: "Cadastro Completo!"
        };
      } catch (error) {
        this.notification = {
          active: true,
          type: "error",
          message: "Informações invalidas, por favor tente alterar seu email."
        };
      } finally {
        this.loading = false;
      }
    }
  }
};
</script>