import { ENV } from "../../constants";

export default class ProductHttpService {
  static #instance;
  api = null;

  static getInstance(axiosInstance) {
    if (!this.#instance) {
      this.#instance = new ProductHttpService(axiosInstance);
    }
    return this.#instance;
  }

  constructor(axiosInstance) {
    this.api = axiosInstance;
    if (ENV === "development") {
      console.log("This is a private constructor! Use getInstance() instead.");
    }
    this.getAllProducts = this.getAllProducts.bind(this);
    // this.getCurrentUserFridge = this.getCurrentUserFridge.bind(this);
  }

  async sendCreateProductRequest(data) {
    try {
      const response = await this.api.post("/api/product/", data);

      return response.data;
    } catch (err) {
      throw err.response.data;
    }
  }

  async getAllProducts() {
    try {
      const response = await this.api.get("/api/product/");

      return response.data;
    } catch (err) {
      throw err.response.data;
    }
  }
}
