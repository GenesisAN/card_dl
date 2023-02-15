import Vue from "vue";
import Vuex from "vuex";

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
  actions: {
    setupUserInfo(state: any, userInfo: UserData) {
      state.userInfo = userInfo;
      console.log("logged in.", userInfo);
      localStorage.setItem("user-info", btoa(JSON.stringify(userInfo)));
    },
    setLogin(state: any, isLogin: boolean) {
      state.isLogin = isLogin;
    },
  },
  getters: {
    getUserInfo(state: any) {
      return state.userInfo;
    },
    getLoginStatus(state: any) {
      return state.isLogin;
    },
  },
});
