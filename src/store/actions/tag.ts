import request from "../../uitls/request";

export default {
  // 添加Tag
  async ex_tag_add({ commit }: any, form: any) {
    console.log(form);
    // code to log in the user
    return request.post("/tag/add", form, {
      headers: {
        "Content-Type": "application/json",
      },
    });
  },
  // 添加Tag翻译
  async ext_tag_set({ commit }: any, form: any) {
    console.log(form);
    // code to log in the user
    return request.post("/tag/set", form, {
      headers: {
        "Content-Type": "application/json",
      },
    });
  },
  // 通过Tag
  async ext_tag_pass({ commit }: any, form: any) {
    console.log(form);
    // code to log in the user
    return request.post("/tag/set", form, {
      headers: {
        "Content-Type": "application/json",
      },
    });
  },
  // 绑定卡片和Tag
  async ex_search_tags({ commit }: any, form: any) {
    console.log(form);
    return request.get("/tags/search?", form).then((res: any) => {
      return res;
    });
  },
};
