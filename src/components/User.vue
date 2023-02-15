<template>
  <div v-if="gts">
    <v-menu bottom min-width="200px" rounded offset-y>
      <template v-slot:activator="{ on }">
        <v-btn icon x-large v-on="on">
          <v-avatar color="brown" size="48">
            <img :src="gus.avatar" />
          </v-avatar>
        </v-btn>
      </template>
      <v-card>
        <v-list-item-content class="justify-center">
          <div class="mx-auto text-center">
            <v-avatar color="brown">
              <img :src="gus.avatar" />
            </v-avatar>
            <h3>{{ gus.nickname }}</h3>
            <p class="text-caption mt-1">
              {{ gus.user_email }}
            </p>
            <v-divider class="my-3"></v-divider>
            <v-btn depressed rounded text> {{ $t("edit_account") }} </v-btn>
            <v-divider class="my-3"></v-divider>
            <v-btn depressed rounded text> {{ $t("logout") }} </v-btn>
          </div>
        </v-list-item-content>
      </v-card>
    </v-menu>
  </div>
  <div v-else>
    <v-btn target="_blank" text @click="login">
      <span>{{ $t("login") }}</span>
    </v-btn>
    <v-btn target="_blank" text @click="register">
      <span class="mr-2">{{ $t("register") }}</span>
      <v-icon>mdi-open-in-new</v-icon>
    </v-btn>
  </div>
</template>

<script>
import { Vue } from "vue-property-decorator";
import { mapState } from "vuex";
import store from "@/store";
export default Vue.extend({
  name: "UserComponent",
  login: false,
  computed: {
    store() {
      return store;
    },
    gts() {
      console.log(
        "User.vue：getLoginStatus",
        this.$store.getters.getLoginStatus
      );
      return this.$store.getters.getLoginStatus;
    },
    gus() {
      return this.$store.getters.getUserInfo;
    },
  },
  beforeRouteUpdate(to, from, next) {
    // 在这里可以重载数据，例如：
    this.getData();
    next();
  },
  methods: {
    getStoreLoginStatus() {
      return this.$store.getters.getLoginStatus;
    },
    login() {
      this.$router.push("/login");
    },
    register() {
      this.$router.push("/register");
    },
  },
});
</script>
