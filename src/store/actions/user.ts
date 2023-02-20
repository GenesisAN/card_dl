import request from "../../uitls/request";
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
export default {
  // User登出 Action
  async ex_logout({ commit }: any) {
    return request.delete("/user/logout").then((res: any) => {
      console.log("ex_logout.res.code", res.code);
      commit("setUserData", {});
      commit("setIsLogin", false);
      return res;
    });
  },
  // User登录 Action
  async ex_login({ commit }: any, form: any) {
    console.log(form);
    // code to log in the user
    return request.post("/user/login", form).then((res: any) => {
      console.log("ex_logout.res.data.code", res);
      if (res.code === 0) {
        commit("setUserData", res.data);
        commit("setIsLogin", true);
      }
      return res;
    });
  },
  async ex_me({ commit }: any) {
    return request.get("/user/me").then((res: any) => {
      console.log("ex_me.res", res);
      if (res.code === 0) {
        commit("setUserData", res.data);
        commit("setIsLogin", true);
      } else {
        commit("setUserData", {});
        commit("setIsLogin", false);
      }
      return res;
    });
  },
  async ex_register({ commit }: any, form: any) {
    console.log(form);
    // code to log in the user
    return request.post("/user/register", form);
  },
};
