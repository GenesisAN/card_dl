import Vue from "vue";
import Vuex from "vuex";
import createPersistedState from "vuex-persistedstate";
Vue.use(Vuex);
export interface UserData {
  id: number;
  user_email: string;
  nickname: string;
  status: string;
  avatar: string;
  created_at: number;
  user_type: number;
  about: string;
  comment_block: boolean;
  upload_block: boolean;
  block_reason: string;
}
export default new Vuex.Store({
  state: {
    isLogin: false,
    userInfo: {} as UserData,
  },
  mutations: {
    setupUserInfo(state: any, userInfo: UserData) {
      state.userInfo = userInfo;
      console.log("logged in.", userInfo);
      localStorage.setItem("user-info", btoa(JSON.stringify(userInfo)));
    },
    setLogin(state: any, isLogin: boolean) {
      console.log("isLogin:", isLogin);
      state.isLogin = isLogin;
      console.log(" state.isLogin:", state.isLogin);
    },
  },
  getters: {
    getUserInfo(state: any) {
      return state.userInfo;
    },
    getLoginStatus(state: any) {
      console.log("getUserInfo:", state.isLogin);
      return state.isLogin;
    },
  },
  plugins: [createPersistedState()],
});
