<template>
  <div class="password-reset-box">
    <v-card class="elevation-12">
      <v-toolbar dark color="primary">
        <v-icon>mdi-lock-reset</v-icon>
        <v-toolbar-title>{{ $t("forgot_password") }}</v-toolbar-title>
      </v-toolbar>
      <v-card-text>
        <v-form class="mx-0" ref="form">
          <v-text-field
            v-model="resetForm.user_email"
            prepend-icon="mdi-email"
            :label="$t('email')"
            type="email"
            :rules="resetEmailRules"
            required
          />
        </v-form>
        <template v-if="resetError">
          <p class="text-danger text-center">{{ resetError }}</p>
        </template>
        <template v-if="resetSuccess">
          <p class="text-success text-center">{{ $t("check_email") }}</p>
        </template>
      </v-card-text>
      <v-card-actions>
        <!-- If loading, show spinner -->
        <v-btn
          v-if="loading"
          color="primary"
          width="300px"
          class="mx-auto"
          disabled
        >
          <v-progress-circular
            indeterminate
            color="white"
          ></v-progress-circular>
        </v-btn>
        <!-- If reset success, show Return to Login button -->
        <v-btn
          v-else-if="resetSuccess"
          color="primary"
          width="300px"
          class="mx-auto"
          @click="returnToLogin"
        >
          {{ $t("return_to_login") }}
        </v-btn>
        <!-- Else, show Reset Password button -->
        <v-btn
          v-else
          color="primary"
          width="300px"
          class="mx-auto"
          @click="resetPassword"
        >
          {{ $t("reset_password") }}
        </v-btn>
      </v-card-actions>
    </v-card>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Ref } from "vue-property-decorator";

@Component
export default class ForgotPasswordView extends Vue {
  resetForm: any = {
    user_email: "",
  };
  loading = false;
  resetError = "";
  resetSuccess = false;

  resetEmailRules = [
    (v: string) => !!v || this.$t("email_required"),
    (v: string) => /.+@.+/.test(v) || this.$t("email_invalid"),
  ];

  @Ref("form")
  private form!: HTMLFormElement;

  // New method to handle Return to Login button click
  returnToLogin() {
    this.$router.push("/login");
  }

  resetPassword() {
    if (!this.form.validate()) {
      return;
    }
    this.loading = true;
    this.$store
      .dispatch("ex_forget", this.resetForm)
      .then((res: any) => {
        if (res.code === 200) {
          this.resetSuccess = true;
        } else {
          this.resetError = res.msg;
        }
      })
      .catch((err: any) => {
        this.resetError = err.response
          ? err.response.msg
          : "An error occurred.";
      })
      .finally(() => {
        this.loading = false;
      });
  }
}
</script>

<style scoped>
.password-reset-box {
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
.text-success {
  color: green;
}
.text-center {
  text-align: center;
}
</style>
