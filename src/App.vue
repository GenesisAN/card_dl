<template>
  <v-app>
    <v-app-bar app>
      <div>
        <h1 class="display-1 font-weight-bold">CardDL</h1>
      </div>
      <v-btn @click="$router.push('/')" target="_blank" text>
        <span>{{ $t("gallery") }}</span>
      </v-btn>
      <v-btn
        href="https://github.com/vuetifyjs/vuetify/releases/latest"
        target="_blank"
        text
      >
        <span>{{ $t("upload") }}</span>
      </v-btn>
      <v-btn
        href="https://github.com/vuetifyjs/vuetify/releases/latest"
        target="_blank"
        text
      >
        <span class="mr-2">{{ $t("support") }}</span>
        <v-icon>mdi-professional-hexagon</v-icon>
      </v-btn>
      <v-btn @click="about" target="_blank" text>
        <span>{{ $t("about") }}</span>
      </v-btn>
      <v-spacer></v-spacer>

      <v-btn target="_blank" text @click="login">
        <span>{{ $t("login") }}</span>
      </v-btn>
      <v-btn target="_blank" text @click="register">
        <span class="mr-2">{{ $t("register") }}</span>
        <v-icon>mdi-open-in-new</v-icon>
      </v-btn>
      <v-dialog v-model="dialog" width="500">
        <template v-slot:activator="{ on, attrs }">
          <v-btn icon v-bind="attrs" v-on="on">
            <v-icon> mdi-cog </v-icon>
          </v-btn>
        </template>
        <v-card>
          <v-card-title class="text-h5 grey lighten-2">
            Web Setting
          </v-card-title>
          <v-col>
            <v-container fluid>
              <v-row align="center">
                <v-col cols="6">
                  <v-subheader> Language </v-subheader>
                </v-col>
                <v-col cols="6">
                  <v-select
                    v-model="set_lange"
                    :items="states"
                    label="Select Language"
                    menu-props="auto"
                  ></v-select>
                </v-col>
              </v-row>
            </v-container>
          </v-col>

          <v-divider></v-divider>

          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="primary" text @click="changlange"> Setting </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
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
    dialog: false,
    set_lange: "English",
    states: ["简体中文", "English"],
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
    changlange() {
      this.dialog = false;
      switch (this.set_lange) {
        case "English":
          this.$i18n.locale = "en";
          break;
        case "简体中文":
          this.$i18n.locale = "cn";
      }
    },
  },
  mounted() {
    if (localStorage.set_lange) {
      this.set_lange = localStorage.set_lange;
      this.changlange();
    }
  },
  watch: {
    set_lange(newName) {
      localStorage.set_lange = newName;
    },
  },
});
</script>
