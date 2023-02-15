<template>
  <div class="login_box">
    <v-card class="elevation-12">
      <v-toolbar dark color="primary">
        <v-icon>mdi-account</v-icon>
        <v-toolbar-title>{{ $t("user_login") }}</v-toolbar-title>
      </v-toolbar>
      <v-card-text>
        <v-form class="mx-0" ref="form">
          <v-text-field
            v-model="email"
            prepend-icon="mdi-email"
            name="email"
            :label="$t('email')"
            type="text"
            :rules="emailRules"
            required
          ></v-text-field>
          <v-text-field
            id="password"
            v-model="password"
            prepend-icon="mdi-lock"
            name="password"
            :label="$t('password')"
            type="password"
            :rules="passwordRules"
            required
          ></v-text-field>
          <div style="text-align: right">
            <a @click="$router.push('/')">{{ $t("forgot_password") }}</a>
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
          @click="login_submit"
          >{{ $t("login") }}</v-btn
        >
      </v-card-actions>
    </v-card>
  </div>
</template>
<script lang="ts">
import { Component, Vue, Ref } from "vue-property-decorator";
import { mapActions, mapState } from "vuex";
import axios from "axios";
@Ref("form")
@Component
export default class LoginView extends Vue {
  email = "";
  password = "";
  passwordError = "";
  emailRules = [
    (v: string) => !!v || this.$t("email_required"),
    (v: string) => /.+@.+/.test(v) || this.$t("email_invalid"),
  ];
  showLogin = false;
  passwordRules = [
    (v: string) => !!v || this.$t("password_required"),
    (v: string) => v.length >= 8 || this.$t("password_min_length"),
  ];
  @Ref("form")
  private form!: HTMLFormElement;
  login_submit() {
    if (!this.form.validate()) {
      return;
    }
    axios
      .post("http://localhost:3000/api/v1/user/login", {
        user_email: this.email,
        password: this.password,
      })
      .then((res) => {
        if (res.data.code === 0) {
          this.$store.dispatch("setupUserInfo", res.data.data);
          this.$store.dispatch("setLogin", true);
          this.$router.push("/");
        } else {
          this.passwordError = res.data.msg;
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }
}
</script>
<style scoped>
.login_box {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
}
.elevation-12 {
  width: 400px;
}
.text-danger {
  color: red;
}
.text-center {
  text-align: center;
}
</style>
