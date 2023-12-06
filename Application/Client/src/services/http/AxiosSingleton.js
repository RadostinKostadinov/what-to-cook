import axios from "axios";

import { API_URL } from "../../constants/index.js";
import HttpService from "./HttpService.js";

export default class AxiosSingleton {
  static #instance;

  static getInstance() {
    if (!this.#instance) {
      const api = axios.create({ baseURL: API_URL, withCredentials: true });

      api.interceptors.response.use(
        (response) => {
          return response;
        },
        async (error) => {
          const originalRequest = error.config;
          if (
            error.response.status === 401 &&
            !originalRequest._retry &&
            !originalRequest.url.includes("/api/auth/refresh")
          ) {
            originalRequest._retry = true;
            const httpApi = HttpService.getInstance();
            await httpApi.User.sendRefreshTokenRequest();
            return api(originalRequest);
          }

          return Promise.reject(error);
        }
      );

      this.#instance = api;
    }
    return this.#instance;
  }

  constructor() {
    console.log("This is a private constructor! Use getInstance() instead.");
  }
}
