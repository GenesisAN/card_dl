<template>
  <div class="login_box">
    <v-card class="elevation-12">
      <v-toolbar dark color="primary">
        <v-toolbar-title>Login</v-toolbar-title>
      </v-toolbar>
      <v-card-text>
        <v-form class="mx-0">
          <v-text-field
            prepend-icon="mdi-account"
            name="email"
            label="E-mail"
            type="text"
            :rules="rules"
          ></v-text-field>
          <v-text-field
            id="password"
            prepend-icon="mdi-lock"
            name="password"
            label="Password"
            type="password"
          ></v-text-field>
        </v-form>
      </v-card-text>
      <v-card-actions>
        <v-btn color="primary" width="300px" class="mx-auto">Login</v-btn>
      </v-card-actions>
    </v-card>
  </div>
</template>

<script>
export default {
  name: "LoginView",
  data: () => ({
    rules: [
      (value) => !!value || "Required.",
      (value) => (value || "").length <= 32 || "Max 32 characters",
      (value) => {
        const pattern =
          /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return pattern.test(value) || "Invalid e-mail.";
      },
    ],
  }),
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
</style>
