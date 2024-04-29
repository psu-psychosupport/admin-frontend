import axios, { AxiosInstance, AxiosResponse } from "axios";
import * as process from "node:process";
import { ICategory, IPost, ISubCategory } from "./types/content";
import { IUser } from "./types/users";
import {
  ICreateCategory,
  ICreatePost,
  ICreateSubCategory,
  IUpdateCategory,
  IUpdatePost,
  IUserForm,
} from "../components/modelForms/types";

const LOCAL_URL = "http://127.0.0.1:8000";

export interface HttpError {
  status: number;
  detail: string;
}

class UnauthorizedError {}

export default class HttpClient {
  private client: AxiosInstance;
  private accessToken: string;
  private refreshToken: string;

  constructor() {
    this.client = axios.create({
      baseURL: LOCAL_URL,
    });
    this.accessToken = "";
    this.refreshToken = "";
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

    let response: AxiosResponse;

    for (let i = 0; i < 2; i += 1) {
      if (i === 1) {
        console.log("[HTTP] Requesting new access token");
        const response = await this.client.request({
          method: "POST",
          url: "/refresh",
          headers: {
            Authorization: `Bearer ${this.refreshToken}`,
          },
        });

        if (response.status === 401) {
          throw new UnauthorizedError();
        }

        for (const cookie in response.headers["set-cookie"]) {
          if (cookie.startsWith("access_token")) {
            this.accessToken = cookie.replace("access_token=", "");
            break;
          }
        }
        return;
      }

      response = await this.client.request({
        method,
        url: endpoint,
        data: payload,
        headers: {
          Authorization: `Bearer ${this.accessToken}`,
        },
      });

      if (response.status === 401 && this.refreshToken) {
        continue;
      }
      return response.data;
      // if (response!.status === 200) {
      //   return response!.data;
      // }
      // throw `HTTP ERROR ${response.status} | ${response.data}`;
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
    return this.request("POST", `/categories/${categoryId}`);
  }

  getSubCategories(): Promise<ISubCategory[]> {
    return this.request("GET", "/subcategories");
  }

  getSubcategory(categoryId: number): Promise<ICategory> {
    return this.request("GET", `/categories/${categoryId}`);
  }

  createSubcategory(subcategory: ICreateSubCategory) {
    return this.request("POST", `/subcategories`, {
      data: subcategory,
    });
  }

  updateSubcategory(categoryId: number, category: IUpdateCategory) {
    return this.request("PATCH", `/categories/${categoryId}`, {
      data: category,
    });
  }

  deleteSubcategory(categoryId: number) {
    return this.request("POST", `/categories/${categoryId}`);
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

  uploadFile(file: File): Promise<string> {
    return this.request("POST", "/upload", { file });
  }
}
