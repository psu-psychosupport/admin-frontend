import axios, { AxiosInstance } from "axios";
import { ICategory, IMedia, IPost, ISubCategory } from "./types/content";
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
import { ErrorResponseCodes, MediaTypes } from "./types/enums";
import { getErrorMessage } from "../utils/texts";

export const API_URL = "http://127.0.0.1:8000";
// process.env.NODE_ENV === "production"
//   ? "https://stoboi.damego.ru/api"
//   : "http://127.0.0.1:8000";

export interface IApiError {
  code: ErrorResponseCodes;
  message: string;
}

export interface IApiResponse<T> {
  error?: IApiError;
  data?: T;
}

export default class HttpClient {
  private client: AxiosInstance;
  private accessToken: string | null;
  private refreshToken: string | null;

  constructor() {
    this.client = axios.create({
      baseURL: API_URL,
      withCredentials: true,
      validateStatus: (status) => status < 500,
    });
    this.accessToken = null;
    this.refreshToken = null;
  }

  async request<T>(
    method: string,
    endpoint: string,
    {
      data,
      file,
      asFormData,
    }: { data?: object; file?: File; asFormData?: boolean } = {}
  ): Promise<IApiResponse<T>> {
    let payload = undefined;

    if (file) {
      payload = new FormData();
      payload.append("file", file);
      if (data) {
        payload.append("json_payload", JSON.stringify(data));
      }
    } else if (asFormData) {
      payload = new FormData();
      Object.entries(data).forEach(([key, value]) => {
        payload.append(key, value);
      });
    } else {
      payload = data;
    }
    console.log(`[HTTP] [${method}] '${endpoint}' data: ${payload}`);
    let cookies = "";
    if (this.accessToken) cookies += `access_token=${this.accessToken}; `;
    if (this.refreshToken) cookies += `refresh_token=${this.refreshToken}; `;

    const response = await this.client.request({
      method,
      url: endpoint,
      data: payload,
      headers: {
        "Content-Type":
          payload instanceof FormData
            ? "multipart/form-data"
            : "application/json",
        Cookie: cookies,
      },
    });

    if (response.status >= 400) {
      if (response.data.detail.code === ErrorResponseCodes.TOKEN_EXPIRED) {
        await this.refreshAccessToken();
        await this.request(method, endpoint, { data, file, asFormData });
      }
      const error = {
        code: response.data.detail.code,
        message: getErrorMessage(response.data.detail.code),
      };

      console.error(
        `HTTP Error with code ${error.code}. Message: ${error.message}`
      );
      return { error };
    }
    return {
      data: response.data,
    };
  }

  setTokens({
    accessToken,
    refreshToken,
  }: {
    accessToken: string;
    refreshToken: string;
  }) {
    this.accessToken = accessToken;
    this.refreshToken = refreshToken;
  }

  async refreshAccessToken() {
    this.accessToken = null;
    const res = await this.request<{
      access_token: string;
    }>("POST", "/refresh");
    if (res.data) {
      this.accessToken = res.data.access_token;
    }
    return res;
  }

  async signIn(email: string, password: string) {
    const form = new FormData();
    form.append("email", email);
    form.append("password", password);

    const res = await this.request<{
      access_token: string;
      refresh_token: string;
    }>("POST", "/signin", { data: form });

    if (res.data) {
      this.accessToken = res.data.access_token;
      this.refreshToken = res.data.refresh_token;
    }

    return res;
  }

  getUsers() {
    return this.request<IUser[]>("GET", "/users");
  }

  getUser(userId: number) {
    return this.request<IUser>("GET", `/users/${userId}`);
  }

  getMe() {
    return this.request<IUser>("GET", "/users/me");
  }

  createUser(user: IUserForm) {
    return this.request<IUser>("POST", "/users", {
      data: user,
      asFormData: true,
    });
  }

  updateUser(userId: number, user: IUserForm) {
    return this.request<IUser>("PATCH", `/users/${userId}`, { data: user });
  }

  deleteUser(userId: number) {
    return this.request<null>("DELETE", `/users/${userId}`);
  }

  getCategories() {
    return this.request<ICategory[]>("GET", "/categories");
  }

  getCategory(categoryId: number) {
    return this.request<ICategory>("GET", `/categories/${categoryId}`);
  }

  createCategory(category: ICreateCategory) {
    return this.request<ICategory>("POST", `/categories`, {
      data: category,
    });
  }

  updateCategory(categoryId: number, category: IUpdateCategory) {
    return this.request<ICategory>("PATCH", `/categories/${categoryId}`, {
      data: category,
    });
  }

  deleteCategory(categoryId: number) {
    return this.request<null>("DELETE", `/categories/${categoryId}`);
  }

  getSubCategories() {
    return this.request<ISubCategory[]>("GET", "/subcategories");
  }

  getSubcategory(subcategoryId: number) {
    return this.request<ISubCategory>("GET", `/subcategories/${subcategoryId}`);
  }

  createSubcategory(subcategory: ICreateSubCategory) {
    return this.request<ISubCategory>("POST", `/subcategories`, {
      data: subcategory,
    });
  }

  updateSubcategory(subcategoryId: number, categoryUpdate: IUpdateSubCategory) {
    return this.request<ISubCategory>(
      "PATCH",
      `/subcategories/${subcategoryId}`,
      {
        data: categoryUpdate,
      }
    );
  }

  deleteSubcategory(subcategoryId: number) {
    return this.request<null>("DELETE", `/subcategories/${subcategoryId}`);
  }

  getPosts() {
    return this.request<IPost[]>("GET", "/posts");
  }

  getPostById(postId: number) {
    return this.request<IPost>("GET", `/posts/${postId}`);
  }

  getPostByCategory(categoryId: number) {
    return this.request<IPost>("GET", `/categories/${categoryId}/post`);
  }

  getPostBySubcategory(subcategoryId: number) {
    return this.request<IPost>("GET", `/subcategories/${subcategoryId}/post`);
  }

  createPost(post: ICreatePost) {
    return this.request<IPost>("POST", "/posts", { data: post });
  }

  updatePost(postId: number, post: IUpdatePost) {
    return this.request<IPost>("PATCH", `/posts/${postId}`, { data: post });
  }

  deletePost(postId: number) {
    return this.request<null>("DELETE", `/posts/${postId}`);
  }

  getMedia<T>(mediaId: number) {
    return this.request<T>("GET", `/media/${mediaId}`);
  }

  uploadMedia({ file, data }: { file?: File; data?: { [key: string]: any } }) {
    return this.request<IMedia<any>>("POST", "/media", {
      file,
      data,
      asFormData: true,
    });
  }

  getMediaList<T>(type?: MediaTypes) {
    if (!type) {
      return this.request<T>("GET", `/media/list}`);
    }
    return this.request<T>("GET", `/media/list/${type}`);
  }

  updateMedia<T>(mediaId: number, data: object) {
    return this.request<IMedia<T>>("PATCH", `/media/${mediaId}`, {
      data: { data },
    });
  }

  transformDocument(file: File) {
    return this.request<string>("POST", `/transform`, { file });
  }
}
