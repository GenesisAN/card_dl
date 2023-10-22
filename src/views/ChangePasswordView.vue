<template>
  <div class="password-change-box">
    <v-card class="elevation-12">
      <v-toolbar dark color="primary">
        <v-icon>mdi-lock-reset</v-icon>
        <v-toolbar-title>{{ $t("change_password") }}</v-toolbar-title>
      </v-toolbar>
      <v-card-text>
        <v-form class="mx-0" ref="form" v-if="!passwordChanged">
          <v-text-field
            v-model="passwordForm.new_password"
            :label="$t('new_password')"
            :rules="newPasswordRules"
            prepend-icon="mdi-lock"
            required
            type="password"
          />
          <v-text-field
            v-model="passwordForm.new_password_confirm"
            prepend-icon="mdi-lock"
            :label="$t('confirm_new_password')"
            type="password"
            :rules="newPasswordConfirmRules"
            required
          />
        </v-form>
        <template v-if="changePasswordError">
          <p class="text-danger text-center">{{ changePasswordError }}</p>
        </template>
        <template v-if="passwordChanged">
          <p class="text-success text-center">
            {{ $t("password_successfully_changed") }}
          </p>
        </template>
      </v-card-text>
      <v-card-actions>
        <v-btn
          v-if="passwordChanged"
          color="primary"
          width="300px"
          class="mx-auto"
          @click="returnToLogin"
        >
          {{ $t("return_to_login") }}
        </v-btn>
        <v-btn
          v-else
          color="primary"
          width="300px"
          class="mx-auto"
          @click="change_password_submit"
        >
          {{ $t("change_password") }}
        </v-btn>
      </v-card-actions>
    </v-card>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Ref } from "vue-property-decorator";
import axios from "axios";

@Component
export default class ChangePasswordView extends Vue {
  passwordForm: any = {
    token: "",
    new_password: "",
    new_password_confirm: "",
  };

  changePasswordError = "";
  passwordChanged = false;
  newPasswordRules = [
    (v: string) => !!v || this.$t("new_password_required"),
    (v: string) => v.length >= 8 || this.$t("password_min_length"),
  ];

  newPasswordConfirmRules = [
    (v: string) => !!v || this.$t("confirm_new_password_required"),
    (v: string) =>
      v === this.passwordForm.new_password ||
      this.$t("confirm_password_not_match"),
  ];

  @Ref("form")
  private form!: HTMLFormElement;

  created() {
    this.passwordForm.token = this.$route.params.token as string; // Type-casting as string
    console.log("Token from URL:", this.passwordForm.token);

    // You can now use the token for any purpose, e.g., API calls
  }
  change_password_submit() {
    if (!this.form.validate()) {
      return;
    }
    this.$store
      .dispatch("ex_changepassword", this.passwordForm)
      .then((res: any) => {
        console.log(res);
        if (res.code === 200) {
          this.passwordChanged = true;
        } else {
          this.changePasswordError = res.msg;
        }
      })
      .catch((err: any) => {
        //this.registerError = err.response.msg;
      });
    // Implement the change password logic here.
    // Call the API endpoint to change the password and handle the response.
    // For now, I'll just log it to the console.
    console.log("Change password submitted!");
  }
  returnToLogin() {
    this.$router.push("/login");
  }
}
</script>

<style scoped>
.password-change-box {
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
