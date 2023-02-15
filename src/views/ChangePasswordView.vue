<template>
  <div class="register-box">
    <v-card class="elevation-12">
      <v-toolbar dark color="primary">
        <v-icon>mdi-form-textbox-password</v-icon>
        <v-toolbar-title>{{ $t("change_password") }}</v-toolbar-title>
      </v-toolbar>
      <v-card-text>
        <v-form class="mx-0" ref="form">
          <v-text-field
            v-model="new_password"
            prepend-icon="mdi-lock"
            :label="$t('new_password')"
            type="password"
            :rules="newPasswordRules"
            required
          />
          <v-text-field
            v-model="confirm_new_password"
            prepend-icon="mdi-lock"
            :label="$t('confirm_new_password')"
            type="password"
            :rules="confirmNewPasswordRules"
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
import { Component, Ref, Vue } from "vue-property-decorator";
@Ref("form")
@Component
export default class ChangePasswordView extends Vue {
  token = "";
  new_password = "";
  confirm_new_password = "";
  changePasswordError = "";
  newPasswordRules = [
    (v: string) => !!v || this.$t("npr"),
    (v: string) => v.length >= 8 || this.$t("new_password_min_length"),
  ];
  confirmNewPasswordRules = [
    (v: string) => !!v || this.$t("confirm_new_password_required"),
    (v: string) =>
      v === this.new_password || this.$t("confirm_new_password_not_match"),
  ];
  mounted() {
    this.token = this.$route.params.token;
    this.$t("new_password_required");
    this.$t("confirm_new_password_required");
  }
  @Ref("form")
  private form!: HTMLFormElement;
  change_password_submit() {
    if (!this.form.validate()) {
      return;
    }
    this.$store
      .dispatch("changePassword", {
        token: this.token,
        password: this.new_password,
        confirmPassword: this.confirm_new_password,
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
