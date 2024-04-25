import HttpClient, { httpClient } from "./httpClient";

class ApiService {
  private http: HttpClient;

  constructor() {
    this.http = new HttpClient();
  }

  async getUsers() {}

  async createUser() {}

  async updateUser() {}

  async deleteUser() {}

  async getCategories() {}

  async createCategory() {}

  async updateCategory() {}

  async deleteCategory() {}


}
