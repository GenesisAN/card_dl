<template>
  <div v-if="isLogin">
    <v-menu bottom min-width="200px" rounded offset-y>
      <template v-slot:activator="{ on }">
        <v-btn icon x-large v-on="on">
          <v-avatar color="brown" size="48">
            <img v-if="userData.avatar" :src="userData.avatar" />
            <span v-else class="white--text text-h5">{{ avatarName }}</span>
          </v-avatar>
        </v-btn>
      </template>
      <v-card>
        <v-list-item-content class="justify-center">
          <div class="mx-auto text-center">
            <v-avatar color="brown" size="48">
              <img v-if="userData.avatar" :src="userData.avatar" />
              <span v-else class="white--text text-h5">{{ avatarName }}</span>
            </v-avatar>
            <h3 class="margin-top15">{{ userData.nickname }}</h3>
            <p class="text-caption mt-1">
              {{ userData.user_email }}
            </p>
            <v-divider class="my-3"></v-divider>
            <v-btn depressed rounded text> {{ $t("edit_account") }}</v-btn>
            <v-divider class="my-3"></v-divider>
            <v-btn depressed rounded text @click="logout"
              >{{ $t("logout") }}
            </v-btn>
          </div>
        </v-list-item-content>
      </v-card>
    </v-menu>
  </div>
  <div v-else>
    <v-btn target="_blank" text @click="toLogin">
      <span>{{ $t("login") }}</span>
    </v-btn>
    <v-btn target="_blank" text @click="toRegister">
      <span class="mr-2">{{ $t("register") }}</span>
      <v-icon>mdi-open-in-new</v-icon>
    </v-btn>
  </div>
</template>

<script>
import { Vue } from "vue-property-decorator";
import store from "@/store";
export default Vue.extend({
  name: "UserComponent",
  login: false,
  computed: {
    avatarName() {
      return this.userData.nickname.slice(0, 1).toUpperCase();
    },
    isLogin() {
      console.log(store);
      return store.state.isLogin;
    },
    userData() {
      console.log(store);
      return store.state.userData;
    },
  },
  methods: {
    toLogin() {
      this.$router.push("/login");
    },
    toRegister() {
      this.$router.push("/register");
    },
    logout() {
      this.$store.dispatch("ex_logout");
    },
  },
});
</script>
<style>
.margin-top15 {
  margin-top: 15px;
}
</style>
