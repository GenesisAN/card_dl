<template>
  <div class="register-box">
    <v-card class="elevation-12">
      <v-toolbar dark color="primary">
        <v-icon>mdi-account-edit</v-icon>
        <v-toolbar-title>{{ $t("user_register") }}</v-toolbar-title>
      </v-toolbar>
      <v-card-text>
        <v-form class="mx-0" ref="form">
          <v-text-field
            v-model="regform.nickname"
            prepend-icon="mdi-account"
            :label="$t('nickname')"
            type="email"
            :rules="nicknameRules"
            required
          />
          <v-text-field
            v-model="regform.user_email"
            prepend-icon="mdi-email"
            :label="$t('email')"
            type="email"
            :rules="regEmailRules"
            required
          />
          <v-text-field
            v-model="regform.password"
            prepend-icon="mdi-lock"
            :label="$t('password')"
            type="password"
            :rules="regPasswordRules"
            required
          />
          <v-text-field
            v-model="regform.password_confirm"
            prepend-icon="mdi-lock"
            :label="$t('confirm_password')"
            type="password"
            :rules="regConfirmPasswordRules"
            required
          />
        </v-form>
        <template v-if="registerError">
          <p class="text-danger text-center">{{ registerError }}</p>
        </template>
      </v-card-text>
      <v-card-actions>
        <v-btn
          color="primary"
          width="300px"
          class="mx-auto"
          @click="register_submit"
          >{{ $t("register") }}</v-btn
        >
      </v-card-actions>
    </v-card>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Ref } from "vue-property-decorator";
import axios from "axios";
import request from "@/uitls/request";
@Ref("form")
@Component
export default class RegisterView extends Vue {
  regform: any = {
    nickname: "",
    user_email: "",
    password: "",
    password_confirm: "",
  };

  registerError = "";
  nicknameRules = [
    (v: string) => !!v || this.$t("nickname_required"),
    (v: string) => v.length >= 2 || this.$t("nickname_min_length"),
  ];
  regEmailRules = [
    (v: string) => !!v || this.$t("email_required"),
    (v: string) => /.+@.+/.test(v) || this.$t("email_invalid"),
  ];

  regPasswordRules = [
    (v: string) => !!v || this.$t("password_required"),
    (v: string) => v.length >= 8 || this.$t("password_min_length"),
  ];

  regConfirmPasswordRules = [
    (v: string) => !!v || this.$t("confirm_password_required"),
    (v: string) =>
      v === this.regform.password || this.$t("confirm_password_not_match"),
  ];
  @Ref("form")
  private form!: HTMLFormElement;
  register_submit() {
    if (!this.form.validate()) {
      return;
    }
    this.$store
      .dispatch("ex_register", this.regform)
      .then((res: any) => {
        console.log(res);
        if (res.code === 0) {
          this.$router.push("/");
        } else {
          this.registerError = res.msg;
        }
      })
      .catch((err: any) => {
        this.registerError = err.response.msg;
      });
  }
}
</script>
<style scoped>
.register-box {
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
