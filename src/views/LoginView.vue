<template>
  <div class="login_box">
    <v-card class="elevation-12">
      <v-toolbar dark color="primary">
        <v-toolbar-title>{{ $t("login") }}</v-toolbar-title>
      </v-toolbar>
      <v-card-text>
        <v-form class="mx-0" ref="$form">
          <v-text-field
            v-model="email"
            prepend-icon="mdi-account"
            name="email"
            :label="$t('email')"
            type="text"
            :rules="emailRules"
          ></v-text-field>
          <v-text-field
            id="password"
            v-model="password"
            prepend-icon="mdi-lock"
            name="password"
            :label="$t('password')"
            type="password"
            :rules="passwordRules"
          ></v-text-field>
          <div style="text-align: right">
            <a @click="$router.push('/')">{{ $t("forget_password") }}</a>
          </div>
          <template v-if="passwordError">
            <p class="text-danger text-center">{{ passwordError }}</p>
          </template>
        </v-form>
      </v-card-text>
      <v-card-actions>
        <v-btn
          color="primary"
          width="300px"
          class="mx-auto"
          @click="loginsubmit"
          >Login</v-btn
        >
      </v-card-actions>
    </v-card>
  </div>
</template>
<script>
import axios from "axios";
import Vue from "vue";

export default {
  name: "LoginView",
  data: () => ({
    email: "",
    password: "",
    passwordError: "",
    emailRules: [
      (value) => !!value || "Required.",
      (value) => {
        const pattern =
          /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return pattern.test(value) || "Invalid e-mail.";
      },
    ],
    passwordRules: [
      (value) => !!value || "Required.",
      (value) => (value || "").length >= 8 || "Min 8 characters",
    ],
  }),

  methods: {
    loginsubmit() {
      if (!this.$refs.$form.validate()) {
        return;
      }
      axios
        .post("http://localhost:3000/api/v1/user/login", {
          user_email: this.email,
          password: this.password,
        })
        .then((res) => {
          if (res.data.code === 0) {
            this.$router.push("/");
          } else {
            this.passwordError = res.data.msg;
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
};
</script>
<style scoped>
.login_box {
  position: absolute;
  width: 400px;
  height: 200px;
  left: 50%;
  top: 40%;
  margin-top: -100px;
  margin-left: -150px;
  padding: 20px;
}
.text-danger {
  color: red;
}
.text-center {
  text-align: center;
}
</style>
