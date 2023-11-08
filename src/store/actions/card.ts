import request, { baseAPIURL, baseWEBURL } from "../../uitls/request";
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
  async serach_card({ commit }: any, form: any) {
    return request.get("/card/search?", form).then((res: any) => {
      res.baseAPIURL = baseAPIURL;
      if (res.data == null) {
        res.data = [];
        return res;
      }
      for (let i = 0; i < res.data.length; i++) {
        res.data[i].infoWeb = baseWEBURL + "/card/" + res.data[i].ID;
        // 计算3级哈希目录
        res.data[i].Thumb =
          res.baseAPIURL +
          `/card/thumd/${res.data[i].CardType}/${res.data[i].MD5}.jpg`;
        res.data[i].Path =
          res.baseAPIURL +
          `/card/image/${res.data[i].CardType}/${res.data[i].MD5}.png`;
        res.data[i].uploader = res.data[i]?.UploadUserInfo?.nickname ?? "匿名";
        res.data[i].uploaderAvatar = res.data[i]?.UploadUserInfo?.avatar ?? "";
        res.data[i].AvatarName = res.data[i].uploader.slice(0, 1).toUpperCase();
        res.data[i].style = `--animation-delay:${i * 100}ms`;
      }
      return res;
    });
  },
  //获取卡片info
  async get_card_info({ commit }: any, id: any) {
    return request.get("/card/info?id=" + id).then((res: any) => {
      if (res.data == null) {
        res.data = [];
        return res;
      }
      // 计算3级哈希目录
      res.data.Thumb =
        baseAPIURL + `/card/thumd/${res.data.CardType}/${res.data.MD5}.jpg`;
      res.data.Path =
        baseAPIURL + `/card/image/${res.data.CardType}/${res.data.MD5}.png`;
      res.data.uploader = res.data?.UploadUserInfo?.nickname ?? "匿名";
      res.data.uploaderAvatar = res.data?.UploadUserInfo?.avatar ?? "";
      res.data.AvatarName = res.data.uploader.slice(0, 1).toUpperCase();
      return res;
    });
  },
};
