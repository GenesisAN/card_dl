<template>
  <div v-if="getLoginStatus">
    <v-btn>已登录</v-btn>
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
  computed: {
    store() {
      return store;
    },
    getLoginStatus() {
      return this.store.getters.getLoginStatus;
    },
  },
  methods: {
    login() {
      this.$router.push("/login");
    },
    register() {
      this.$router.push("/register");
    },
  },
});
</script>
