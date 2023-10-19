<template>
  <v-app>
    <v-app-bar app>
      <div class="mx-14">
        <h1 class="display-1 font-weight-bold">CardDL</h1>
      </div>
      <v-btn @click="$router.push('/')" target="_blank" text>
        <span>{{ $t("gallery") }}</span>
      </v-btn>
      <v-btn @click="$router.push('/card_upload')" target="_blank" text>
        <span>{{ $t("upload") }}</span>
      </v-btn>
      <v-btn target="_blank" text>
        <span class="mr-2">{{ $t("support") }}</span>
        <v-icon>mdi-professional-hexagon</v-icon>
      </v-btn>
      <v-btn @click="wiki" target="_blank" text>
        <span>{{ $t("wiki") }}</span>
      </v-btn>
      <v-btn @click="about" target="_blank" text>
        <span>{{ $t("about") }}</span>
      </v-btn>
      <v-spacer></v-spacer>
      <div class="user-container" style="margin-right: 20px">
        <User />
      </div>
      <v-dialog v-model="dialog" width="500">
        <template v-slot:activator="{ on, attrs }">
          <v-btn icon v-bind="attrs" v-on="on">
            <v-icon> mdi-cog </v-icon>
          </v-btn>
        </template>
        <v-card>
          <v-card-title class="text-h5 grey lighten-2">
            {{ $t("settings") }}
          </v-card-title>
          <v-col>
            <v-container fluid>
              <v-row align="center">
                <v-col cols="6">
                  <v-subheader>{{ $t("language") }} </v-subheader>
                </v-col>
                <v-col cols="6">
                  <v-select
                    v-model="set_lange"
                    :items="states"
                    :label="$t('select_language')"
                    menu-props="auto"
                  ></v-select>
                </v-col>
              </v-row>
            </v-container>
          </v-col>
          <v-divider></v-divider>

          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="primary" text @click="chang_lange">{{
              $t("setting")
            }}</v-btn>
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
import User from "./components/User.vue";
export default Vue.extend({
  name: "App",
  components: { User },

  data: () => ({
    dialog: false,
    set_lange: "English",
    states: ["简体中文", "English"],
    tags: [""],
    //
  }),
  methods: {
    about() {
      this.$router.push("/about");
    },
    chang_lange() {
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
      this.chang_lange();
    }
  },
  watch: {
    set_lange(newName) {
      localStorage.set_lange = newName;
    },
  },
});
</script>
