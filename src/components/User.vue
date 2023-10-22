<template>
  <div>
    <!-- 当用户已登录 -->
    <div v-if="isLogin">
      <!-- 使用v-menu的activator插槽，定义头像按钮作为激活器 -->
      <v-menu bottom min-width="200px" rounded offset-y>
        <template v-slot:activator="{ on }">
          <v-btn icon x-large v-on="on">
            <v-avatar color="brown" size="48">
              <!-- 如果用户有头像则显示头像，否则显示用户名的首字母或登录图标 -->
              <img v-if="userData.avatar" :src="userData.avatar" />
              <span v-else-if="isLogin" class="white--text text-h5">{{
                avatarName
              }}</span>
              <v-icon v-else>mdi-login</v-icon>
            </v-avatar>
          </v-btn>
        </template>

        <!-- 下拉菜单内容，显示用户信息和操作按钮 -->
        <v-card>
          <v-list-item-content class="justify-center">
            <div class="mx-auto text-center">
              <h3 class="margin-top15">{{ userData.nickname }}</h3>
              <p class="text-caption mt-1">
                {{ userData.user_email }}
              </p>
              <v-divider class="my-3"></v-divider>
              <v-btn depressed rounded text>{{ $t("edit_account") }}</v-btn>
              <v-divider class="my-3"></v-divider>
              <v-btn depressed rounded text @click="logout">{{
                $t("logout")
              }}</v-btn>
            </div>
          </v-list-item-content>
        </v-card>
      </v-menu>
    </div>

    <!-- 当用户未登录 -->
    <div v-else>
      <!-- 在小窗状态下，只显示一个头像按钮，头像内容是一个登录图标 -->
      <div v-if="isSmallScreen">
        <v-btn icon x-large @click="toLogin">
          <v-avatar size="48">
            <v-icon>mdi-login</v-icon>
          </v-avatar>
        </v-btn>
      </div>
      <!-- 在非小窗状态下，显示登录和注册按钮 -->
      <div v-else>
        <v-btn target="_blank" text @click="toLogin">
          <span>{{ $t("login") }}</span>
        </v-btn>
        <v-btn target="_blank" text @click="toRegister">
          <span class="mr-2">{{ $t("register") }}</span>
          <v-icon>mdi-open-in-new</v-icon>
        </v-btn>
      </div>
    </div>
  </div>
</template>

<script>
import { Vue } from "vue-property-decorator";
import store from "@/store";
export default Vue.extend({
  props: {
    isSmallScreen: Boolean,
  },
  watch: {
    isSmallScreen: {
      handler(newVal, oldVal) {
        // 当isSmallScreen发生变化时做些什么
        console.log(newVal, oldVal);
      },
      immediate: true,
    },
  },
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
