import router from "@/router";
import store from "@/store";
import axios, { AxiosRequestConfig } from "axios";
const {
  VUE_APP_BASE_URL,
  VUE_APP_URL_VERSION,
  VUE_APP_WEB_URL,
  VUE_APP_URL_HTTPS,
  NODE_ENV,
} = process.env;
const http = VUE_APP_URL_HTTPS === "true" ? "https" : "http";
console.log(
  NODE_ENV.indexOf("production") === -1
    ? "/web/"
    : `${http}://${VUE_APP_BASE_URL}`
);
export const baseAPIURL = `${http}://${VUE_APP_BASE_URL}/api/${VUE_APP_URL_VERSION}`;
export const baseWEBURL = `${http}://${VUE_APP_WEB_URL}`;
const request = axios.create({
  withCredentials: true,
  timeout: 60000, // 设置超时时间10s
  // baseURL: NODE_ENV.indexOf('production') !== -1 ? '/web/' : `${http}://${VUE_APP_URL}` // `${http}://${VUE_APP_URL}`  //根据自己配置的反向代理去设置不同环境的baeUrl
  baseURL: `${http}://${VUE_APP_BASE_URL}/api/${VUE_APP_URL_VERSION}`,
});
/** 添加响应拦截器  **/
request.interceptors.response.use(
  (response) => {
    // setTimeout(() => {
    //   // loadingSpin.close()
    // }, 1000)
    const { status, data = {} } = response;
    console.log("响应拦截器:", response);
    //const cookie = response.headers['set-cookie'];
    // switch (data.code) {
    //   case 401:
    //     // 接口无权限自动跳转登录页面
    //     toast("登录已过期，请重新登录");
    //     router.replace("/login");
    //     return data;
    // }
    // if (status >= 200 && status < 300) {
    return data;
    // }
  }
  // (error) => {
  //   // loadingSpin.close()
  //   switch (error.response.data.code) {
  //     case 401:
  //       // 接口无权限自动跳转登录页面
  //       toast("登录已过期，请重新登录");
  //       router.replace("/login");
  //       break;
  //     default:
  //   }
  //   return error;
  // }
);

export default request;
function toast(arg0: string) {
  throw new Error("Function not implemented.");
}
