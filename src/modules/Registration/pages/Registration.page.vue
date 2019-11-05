<template>
  <v-container fill-height class="justify-center">
    <v-flex xs12 sm10 md8>
      <v-flex class="d-flex justify-start">
        <v-btn text link :to="{ name:'loginPage' }">
          <v-icon class="mr-5">fa-arrow-left</v-icon>Login
        </v-btn>
      </v-flex>
      <v-card :loading="loading" min-width="100%">
        <v-col class="pa-5">
          <h3 class="headline primary--text pb-3">Registro</h3>
          <v-divider />
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
          <v-alert
            v-show="notification.active"
            :type="notification.type"
            dismissible
            transition="scale-transition"
          >{{notification.message}}</v-alert>
        </v-col>
      </v-card>
    </v-flex>
  </v-container>
</template>
<script>
import { mapActions } from "vuex";
import FormUserAvatar from "../components/FormUserAvatar";
import FormUserInfo from "../components/FormUserInfo";
export default {
  name: "RegisterPage",
  components: {
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
    ...mapActions("register", ["registerNewUser"]),
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