<template>
  <v-app>
    <v-app-bar app>
      <div>
        <h1 class="display-1 font-weight-bold">CardDL</h1>
      </div>
      <v-btn
        href="https://github.com/vuetifyjs/vuetify/releases/latest"
        target="_blank"
        text
      >
        <span>Gallery</span>
      </v-btn>
      <v-btn
        href="https://github.com/vuetifyjs/vuetify/releases/latest"
        target="_blank"
        text
      >
        <span>Upload</span>
      </v-btn>
      <v-btn
        href="https://github.com/vuetifyjs/vuetify/releases/latest"
        target="_blank"
        text
      >
        <span class="mr-2">Support</span>
        <v-icon>mdi-professional-hexagon</v-icon>
      </v-btn>
      <v-btn @click="about" target="_blank" text>
        <span>About</span>
      </v-btn>
      <v-spacer></v-spacer>

      <v-btn target="_blank" text @click="login">
        <span>Login</span>
      </v-btn>
      <v-btn target="_blank" text @click="register">
        <span class="mr-2">Register</span>
        <v-icon>mdi-open-in-new</v-icon>
      </v-btn>
    </v-app-bar>

    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  name: "App",

  data: () => ({
    //
  }),
  methods: {
    login() {
      this.$router.push("/login");
    },
    about() {
      this.$router.push("/about");
    },
    register() {
      this.$router.push("/register");
    },
  },
});
</script>
