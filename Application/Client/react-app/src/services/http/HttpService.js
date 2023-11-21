import { ENV } from "../../constants";
import AxiosSingleton from "./AxiosSingleton";
import UserHttpService from "./UserHttpService";

export default class HttpService {
  static #instance;

  static getInstance() {
    if (!this.#instance) {
      const api = AxiosSingleton.getInstance();

      this.#instance = new HttpService();
      this.#instance.User = UserHttpService.getInstance(api);
    }
    return this.#instance;
  }

  constructor() {
    if (ENV === "development") {
      console.log("This is a private constructor! Use getInstance() instead.");
    }
  }
}
