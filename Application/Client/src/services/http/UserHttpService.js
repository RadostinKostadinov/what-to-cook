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
    this.getCurrentUser = this.getCurrentUser.bind(this);
    this.getCurrentUserFridge = this.getCurrentUserFridge.bind(this);
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
      throw err.response.data;
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

  async getCurrentUser() {
    try {
      const response = await this.api.get("/api/user/me");

      return response.data;
    } catch (err) {
      throw err.message;
    }
  }

  async getCurrentUserFridge() {
    try {
      const response = await this.api.get("/api/user/me/fridge");

      return response.data;
    } catch (err) {
      throw err.message;
    }
  }

  async addProductToFridge(product) {
    try {
      const response = await this.api.post("/api/user/me/fridge", product);

      return response.data;
    } catch (err) {
      throw err.message;
    }
  }

  async updateProductInFridge(product) {
    try {
      const response = await this.api.put("/api/user/me/fridge", product);

      return response.data;
    } catch (err) {
      throw err.message;
    }
  }

  async removeProductFromFridge(product) {
    try {
      const response = await this.api.patch("/api/user/me/fridge", product);

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
