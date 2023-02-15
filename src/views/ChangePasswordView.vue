<template>
  <div class="register-box">
    <v-card class="elevation-12">
      <v-toolbar dark color="primary">
        <v-toolbar-title>{{ $t("change_password") }}</v-toolbar-title>
      </v-toolbar>
      <v-card-text>
        <v-form class="mx-0" ref="form">
          <v-text-field
            v-model="password"
            prepend-icon="mdi-lock"
            :label="$t('password')"
            type="password"
            :rules="passwordRules"
            required
          />
          <v-text-field
            v-model="confirmPassword"
            prepend-icon="mdi-lock"
            :label="$t('confirm_password')"
            type="password"
            :rules="confirmPasswordRules"
            required
          />
        </v-form>
        <template v-if="changePasswordError">
          <p class="text-danger text-center">{{ changePasswordError }}</p>
        </template>
      </v-card-text>
      <v-card-actions>
        <v-btn
          color="primary"
          width="300px"
          class="mx-auto"
          @click="change_password_submit"
          >{{ $t("change_password") }}</v-btn
        >
      </v-card-actions>
    </v-card>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
@Component
export default class ChangePasswordView extends Vue {
  token = "";
  password = "";
  confirmPassword = "";
  changePasswordError = "";
  passwordRules = [
    (v: string) => !!v || this.$t("password_required"),
    (v: string) => v.length >= 8 || this.$t("password_min_length"),
  ];

  confirmPasswordRules = [
    (v: string) => !!v || this.$t("confirm_password_required"),
    (v: string) => v.length >= 8 || this.$t("confirm_password_min_length"),
    (v: string) => v === this.password || this.$t("confirm_password_not_match"),
  ];
  mounted() {
    this.token = this.$route.params.token;
  }
  change_password_submit() {
    this.$store
      .dispatch("changePassword", {
        token: this.token,
        password: this.password,
        confirmPassword: this.confirmPassword,
      })
      .then(() => {
        this.$router.push("/login");
      })
      .catch((error) => {
        this.changePasswordError = error.response.data.message;
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
