import axios from "axios";
import config from "@/config";

const baseUrl = "/api";
process.env.NODE_ENV === "development"
  ? config.baseUrl.dev
  : config.baseUrl.pro;

class HttpRequest {
  constructor(baseUrl) {
    this.baseUrl = baseUrl;
  }

  getInsideConfig() {
    const config = {
      baseUrl: this.baseUrl,
      header: {},
    };
    return config;
  }

  interceptors(instance) {
    // 添加请求拦截器
    instance.interceptors.request.use(
      function (config) {
        // 在发送请求之前做些什么
        console.log("拦截请求处理");
        return config;
      },
      function (error) {
        // 对请求错误做些什么
        return Promise.reject(error);
      }
    );
    // 添加响应拦截器
    instance.interceptors.response.use(
      function (response) {
        // 2xx 范围内的状态码都会触发该函数。
        // 对响应数据做点什么
        console.log("拦截响应处理");
        return response;
      },
      function (error) {
        // 超出 2xx 范围的状态码都会触发该函数。
        // 对响应错误做点什么
        return Promise.reject(error);
      }
    );
  }

  request(options) {
    //请求
    const instance = axios.create();
    options = { ...(this.getInsideConfig()), ...options };
    console.log(options);
    console.log(this.getInsideConfig());
    this.interceptors(instance);
    return instance(options);
  }
}

export default new HttpRequest(baseUrl);
