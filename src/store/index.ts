import Vue from "vue";
import "es6-promise/auto";
import Vuex from "vuex";
import VuexPersistence from "vuex-persist";
import userActions, { UserData } from "./actions/user";
Vue.use(Vuex);

const vuexLocal = new VuexPersistence({
  storage: window.localStorage,
  modules: ["userData", "isLogin"],
});
export default new Vuex.Store({
  state: {
    // 是否登录
    isLogin: false,
    // 用户信息
    userData: {} as UserData,
  },
  mutations: {
    setUserData(state: any, userData: UserData) {
      console.log("setUserData", userData);
      state.userData = userData;
    },
    setIsLogin(state: any, isLogin: boolean) {
      console.log("setIsLogin", isLogin);
      state.isLogin = isLogin;
    },
  },
  actions: {
    ...userActions,
  },
  plugins: [vuexLocal.plugin],
});
