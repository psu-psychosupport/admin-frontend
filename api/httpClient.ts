import axios, { AxiosError, AxiosInstance, AxiosResponse } from "axios";
import { ICategory, IPost, ISubCategory } from "./types/content";
import { IUser } from "./types/users";
import {
  ICreateCategory,
  ICreatePost,
  ICreateSubCategory,
  IUpdateCategory,
  IUpdatePost,
  IUpdateSubCategory,
  IUserForm,
} from "../components/modelForms/types";

const LOCAL_URL = "http://127.0.0.1:8000"; //"https://stoboi.damego.ru/api"; //"http://127.0.0.1:8000";

export class HttpError {
  status: number;
  message: string;

  constructor(status: number, message: string) {
    this.status = status;
    this.message = message;
  }
}

export default class HttpClient {
  private client: AxiosInstance;
  private accessToken: string | null;
  private refreshToken: string | null;

  constructor() {
    this.client = axios.create({
      baseURL: LOCAL_URL,
      withCredentials: true,
    });
    this.accessToken = null;
    this.refreshToken = null;
  }

  async request(
    method: string,
    endpoint: string,
    { data, file }: { data?: object; file?: File } = {},
  ) {
    let payload = undefined;

    if (file) {
      payload = new FormData();
      payload.append("file", file);
      if (data) {
        payload.append("json_payload", JSON.stringify(data));
      }
    } else {
      payload = data;
    }
    const token = this.accessToken || this.refreshToken;
    let response: AxiosResponse;

    for (let i = 0; i < 2; i += 1) {
      if (i === 1) {
        console.log("[HTTP] Requesting new access token");
        const response = await this.client.request({
          method: "POST",
          url: "/refresh",
          headers: token
            ? {
                Authorization: `Bearer ${token}`,
              }
            : undefined,
        });
        if (response.status === 200) {
          this.accessToken = response.data.accessToken;
          return await this.request(method, endpoint, { data, file });
        }
      }

      try {
        response = await this.client.request({
          method,
          url: endpoint,
          data: payload,
          headers: token
            ? {
                Authorization: `Bearer ${token}`,
              }
            : undefined,
        });
      } catch (error: AxiosError<any, any>) {
        if (error.response.status === 401 && this.refreshToken) {
          continue;
        }
        console.log("[ERROR]", error.response.status, error.response.data);
        throw new HttpError(error.response.status, error.response.data.detail);
      }
      return response.data;
    }
  }

  async signIn(email: string, password: string) {
    const form = new FormData();
    form.append("email", email);
    form.append("password", password);

    const data = await this.request("POST", "/signin", { data: form });
    if (data.detail) {
      return data.detail; // TODO: rewrite
    }
    this.accessToken = data.accessToken;
    this.refreshToken = data.refreshToken;
  }

  getUsers(): Promise<IUser[]> {
    return this.request("GET", "/users");
  }

  getUser(userId: number): Promise<IUser> {
    return this.request("GET", `/users/${userId}`);
  }

  getMe(): Promise<IUser> {
    return this.request("GET", "/users/me");
  }

  createUser(user: IUserForm) {
    return this.request("POST", "/users", { data: user });
  }

  updateUser(userId: number, user: IUserForm) {
    return this.request("PATCH", `/users/${userId}`, { data: user });
  }

  deleteUser(userId: number) {
    return this.request("DELETE", `/users/${userId}`);
  }

  getCategories(): Promise<ICategory[]> {
    return this.request("GET", "/categories");
  }

  getCategory(categoryId: number): Promise<ICategory> {
    return this.request("GET", `/categories/${categoryId}`);
  }

  createCategory(category: ICreateCategory) {
    return this.request("POST", `/categories`, {
      data: category,
    });
  }

  updateCategory(categoryId: number, category: IUpdateCategory) {
    return this.request("PATCH", `/categories/${categoryId}`, {
      data: category,
    });
  }

  deleteCategory(categoryId: number) {
    return this.request("DELETE", `/categories/${categoryId}`);
  }

  getSubCategories(): Promise<ISubCategory[]> {
    return this.request("GET", "/subcategories");
  }

  getSubcategory(subcategoryId: number): Promise<ICategory> {
    return this.request("GET", `/subcategories/${subcategoryId}`);
  }

  createSubcategory(subcategory: ICreateSubCategory) {
    return this.request("POST", `/subcategories`, {
      data: subcategory,
    });
  }

  updateSubcategory(subcategoryId: number, categoryUpdate: IUpdateSubCategory) {
    return this.request("PATCH", `/subcategories/${subcategoryId}`, {
      data: categoryUpdate,
    });
  }

  deleteSubcategory(subcategoryId: number) {
    return this.request("DELETE", `/subcategories/${subcategoryId}`);
  }

  getPosts(): Promise<IPost[]> {
    return this.request("GET", "/posts");
  }

  getPost(postId: number) {
    return this.request("GET", `/posts/${postId}`);
  }

  createPost(post: ICreatePost) {
    return this.request("POST", "/posts", { data: post });
  }

  updatePost(postId: number, post: IUpdatePost) {
    return this.request("PATCH", `/posts/${postId}`, { data: post });
  }

  deletePost(postId: number) {
    return this.request("DELETE", `/posts/${postId}`);
  }

  uploadMediaFile(file: File): Promise<string> {
    return this.request("POST", "/media", { file });
  }

  transformDocument(file: File): Promise<string> {
    return this.request("POST", `/transform`, { file });
  }
}
