<template>
  <v-app>
    <v-app-bar app>
      <v-toolbar-title class="mx-2">
        <h1 class="display-1 font-weight-bold" @click="$router.push('/')">
          CardDL
        </h1>
      </v-toolbar-title>

      <v-btn v-if="!isSmallScreen" text @click="$router.push('/')">
        <span>{{ $t("gallery") }}</span>
      </v-btn>
      <v-btn v-if="!isSmallScreen" text @click="$router.push('/card_upload')">
        <span>{{ $t("upload") }}</span>
      </v-btn>
      <v-btn v-if="!isSmallScreen" text @click="$router.push('/mode')">
        <span>{{ $t("mode") }}</span>
      </v-btn>
      <v-btn v-if="!isSmallScreen" text>
        <span class="mr-2">{{ $t("support") }}</span>
        <v-icon>mdi-professional-hexagon</v-icon>
      </v-btn>
      <v-btn v-if="!isSmallScreen" text @click="wiki">
        <span>{{ $t("wiki") }}</span>
      </v-btn>
      <v-btn v-if="!isSmallScreen" text @click="about">
        <span>{{ $t("about") }}</span>
      </v-btn>
      <v-menu v-if="isSmallScreen">
        <!-- Trigger button -->
        <template v-slot:activator="{ on }">
          <v-btn icon v-on="on">
            <v-icon>mdi-menu</v-icon>
          </v-btn>
        </template>
        <!-- Menu content -->
        <v-list>
          <v-list-item-group>
            <v-list-item @click="$router.push('/')">
              <v-list-item-title>{{ $t("gallery") }}</v-list-item-title>
            </v-list-item>
            <v-list-item @click="$router.push('/card_upload')">
              <v-list-item-title>{{ $t("upload") }}</v-list-item-title>
            </v-list-item>
            <v-list-item @click="$router.push('/mode')">
              <v-list-item-title>{{ $t("mode") }}</v-list-item-title>
            </v-list-item>
            <v-list-item>
              <v-list-item-title>{{ $t("support") }}</v-list-item-title>
            </v-list-item>
            <v-list-item @click="wiki">
              <v-list-item-title>{{ $t("wiki") }}</v-list-item-title>
            </v-list-item>
            <v-list-item @click="about">
              <v-list-item-title>{{ $t("about") }}</v-list-item-title>
            </v-list-item>
          </v-list-item-group>
        </v-list>
      </v-menu>
      <v-spacer></v-spacer>

      <div class="user-container">
        <User :is-small-screen="isSmallScreen" />
      </div>

      <v-dialog v-model="dialog" width="500">
        <template v-slot:activator="{ on, attrs }">
          <v-btn icon v-bind="attrs" v-on="on">
            <v-icon>mdi-cog</v-icon>
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
                  <v-subheader>{{ $t("language") }}</v-subheader>
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
            <v-btn color="primary" text @click="chang_lange"
              >{{ $t("setting") }}
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>

      <!-- For small screens: collapse all buttons into a menu -->
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
    isSmallScreen: false, // New data for checking screen size
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
    checkScreenSize() {
      this.isSmallScreen = window.innerWidth <= 730;
    },
  },
  mounted() {
    this.checkScreenSize();
    window.addEventListener("resize", this.checkScreenSize);

    if (localStorage.set_lange) {
      this.set_lange = localStorage.set_lange;
      this.chang_lange();
    }
  },
  beforeDestroy() {
    window.removeEventListener("resize", this.checkScreenSize);
  },
  watch: {
    set_lange(newName) {
      localStorage.set_lange = newName;
    },
  },
});
</script>

<style scoped>
.v-btn > .v-icon + span {
  margin-left: 8px;
}

/* Responsive styles */
@media (max-width: 600px) {
  .v-toolbar-title h1 {
    font-size: 1.5rem;
  }
}
</style>
