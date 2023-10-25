import request from "../../uitls/request";
export default {
  // Png文件上传
  async upload_png({ commit }: any, form: any) {
    console.log(form);
    // code to log in the user
    return request.post("/card/uploadimage", form, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  },
  async upload_png_info({ commit }: any, form: any) {
    console.log(form);
    // code to log in the user
    return request.post("/card/uploaddata", form, {
      headers: {
        "Content-Type": "application/json",
      },
    });
  },
  async ex_search_tags({ commit }: any, form: any) {
    console.log(form);
    return request.get("/tag/search?", form).then((res: any) => {
      return res;
    });
  },
};
