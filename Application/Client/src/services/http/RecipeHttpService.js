import { ENV } from "../../constants";

export default class RecipeHttpService {
  static #instance;
  api = null;

  static getInstance(axiosInstance) {
    if (!this.#instance) {
      this.#instance = new RecipeHttpService(axiosInstance);
    }
    return this.#instance;
  }

  constructor(axiosInstance) {
    this.api = axiosInstance;
    if (ENV === "development") {
      console.log("This is a private constructor! Use getInstance() instead.");
    }
    this.getCurrentUserRecipes = this.getCurrentUserRecipes.bind(this);
    // this.addUserRecipe = this.addUserRecipe.bind(this);
    // this.editUserRecipe = this.editUserRecipe.bind(this);
    // this.deleteUserRecipe = this.deleteUserRecipe.bind(this);
  }

  async getCurrentUserRecipes() {
    try {
      const response = await this.api.get("api/recipe/user/");

      return response.data;
    } catch (err) {
      throw err.response.data;
    }
  }

  async addUserRecipe(data) {
    try {
      const response = await this.api.post("/api/recipe/user/", data);

      return response.data;
    } catch (err) {
      throw err.response.data;
    }
  }

  async editUserRecipe(data) {
    try {
      const response = await this.api.patch("/api/recipe/user/", data);

      return response.data;
    } catch (err) {
      throw err.response.data;
    }
  }

  async deleteUserRecipe(recipeId) {
    try {
      const response = await this.api.delete(`/api/recipe/user/${recipeId}`);

      return response.data;
    } catch (err) {
      throw err.response.data;
    }
  }

  async findRecipes(data) {
    try {
      const response = await this.api.post("/api/recipe/", data);

      return response.data;
    } catch (err) {
      throw err.response.data;
    }
  }

  async getRecipe(recipeId) {
    try {
      const response = await this.api.get(`/api/recipe/${recipeId}`);

      return response.data;
    } catch (err) {
      throw err.response.data;
    }
  }
}
