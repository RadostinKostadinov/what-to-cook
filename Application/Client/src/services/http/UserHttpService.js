import { ENV } from "../../constants";

export default class UserHttpService {
  static #instance;
  api = null;

  static getInstance(axiosInstance) {
    if (!this.#instance) {
      this.#instance = new UserHttpService(axiosInstance);
    }
    return this.#instance;
  }

  constructor(axiosInstance) {
    this.api = axiosInstance;
    if (ENV === "development") {
      console.log("This is a private constructor! Use getInstance() instead.");
    }
  }

  async sendLoginRequest(data) {
    try {
      const response = await this.api.post("/api/auth/login", data);

      return response.data;
    } catch (err) {
      throw err.response.data;
    }
  }

  async sendRegisterRequest(data) {
    try {
      const response = await this.api.post("/api/auth/register", data);

      return response.data;
    } catch (err) {
      throw err.message;
    }
  }

  async sendRefreshTokenRequest(data) {
    try {
      const response = await this.api.post("/api/auth/refresh");

      return response.data;
    } catch (err) {
      throw err.message;
    }
  }

  async sendLogoutRequest(data) {
    try {
      const response = await this.api.get("/api/auth/logout");

      return response.data;
    } catch (err) {
      throw err.message;
    }
  }

  async sendTestAuthRequest(data) {
    try {
      const response = await this.api.get("/api/auth/test");

      return response.data;
    } catch (err) {
      throw err.message;
    }
  }
}
