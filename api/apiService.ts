import HttpClient, { API_URL } from "./httpClient";
import {
  ICreateCategory,
  ICreatePost,
  ICreateSubCategory,
  IUpdateCategory,
  IUpdatePost,
  IUpdateSubCategory,
  IUserForm,
} from "../components/modelForms/types";
import { MediaTypes } from "./types/enums";
import { IMedia } from "./types/content";

class ApiService {
  private http: HttpClient;

  constructor() {
    this.http = new HttpClient();
  }

  setCredentialsTokens({
    accessToken,
    refreshToken,
  }: {
    accessToken: string;
    refreshToken: string;
  }) {
    return this.http.setTokens({ accessToken, refreshToken });
  }

  refreshAccessToken() {
    return this.http.refreshAccessToken();
  }

  signIn(email: string, password: string) {
    return this.http.signIn(email, password);
  }

  getUsers() {
    return this.http.getUsers();
  }

  getUser(userId: number) {
    return this.http.getUser(userId);
  }

  getMe() {
    return this.http.getMe();
  }

  createUser(user: IUserForm) {
    return this.http.createUser(user);
  }

  updateUser(userId: number, user: IUserForm) {
    return this.http.updateUser(userId, user);
  }

  deleteUser(userId: number) {
    return this.http.deleteUser(userId);
  }

  getCategories() {
    return this.http.getCategories();
  }

  getCategory(categoryId: number) {
    return this.http.getCategory(categoryId);
  }

  createCategory(category: ICreateCategory) {
    return this.http.createCategory(category);
  }

  updateCategory(categoryId: number, category: IUpdateCategory) {
    return this.http.updateCategory(categoryId, category);
  }

  deleteCategory(categoryId: number) {
    return this.http.deleteCategory(categoryId);
  }

  getSubcategories() {
    return this.http.getSubCategories();
  }

  getSubcategory(subcategoryId: number) {
    return this.http.getSubcategory(subcategoryId);
  }

  createSubcategory(subcategory: ICreateSubCategory) {
    return this.http.createSubcategory(subcategory);
  }

  updateSubcategory(
    subcategory: number,
    subcategoryUpdate: IUpdateSubCategory,
  ) {
    return this.http.updateSubcategory(subcategory, subcategoryUpdate);
  }

  deleteSubcategory(subcategoryId: number) {
    return this.http.deleteSubcategory(subcategoryId);
  }

  getPosts() {
    return this.http.getPosts();
  }

  getPost({
    postId,
    categoryId,
    subcategoryId,
  }: { postId?: number; categoryId?: number; subcategoryId?: number } = {}) {
    if (!postId && !categoryId && !subcategoryId) {
      throw new Error("Missing arguments");
    }
    if (postId) return this.http.getPostById(postId);
    if (subcategoryId) return this.http.getPostBySubcategory(subcategoryId);
    if (categoryId) return this.http.getPostByCategory(categoryId);
  }

  createPost(post: ICreatePost) {
    return this.http.createPost(post);
  }

  updatePost(postId: number, post: IUpdatePost) {
    return this.http.updatePost(postId, post);
  }

  deletePost(postId: number) {
    return this.http.deletePost(postId);
  }

  async getMedia<T>(mediaId: number) {
    const res = await this.http.getMedia<IMedia<T>>(mediaId);

    if (res.data && res.data.data) {
      res.data.data = JSON.parse(res.data.data as string);
    }

    return res;
  }

  uploadMedia({ file, data }: { file?: File; data?: { [key: string]: any } }) {
    return this.http.uploadMedia({ file, data });
  }

  async getMediaList<T>(type?: MediaTypes) {
    const res = await this.http.getMediaList<IMedia<T>[]>(type);

    if (res.error || res.data!.length && res.data![0].file_url) return res;

    res.data = res.data!.map((d) => {
      d.data = JSON.parse(d.data as string);
      return d;
    });

    return res;
  }

  updateMedia<T>(mediaId: number, data: object) {
    return this.http.updateMedia<T>(mediaId, data);
  }

  transformDocument(file: File) {
    return this.http.transformDocument(file);
  }
}

export const apiService = new ApiService();
