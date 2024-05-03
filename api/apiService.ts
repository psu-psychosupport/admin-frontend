import HttpClient from "./httpClient";
import {
  ICategoryForm,
  ICreateCategory,
  ICreatePost,
  ICreateSubCategory,
  IUpdateCategory,
  IUpdatePost,
  IUserForm,
} from "../components/modelForms/types";

class ApiService {
  private http: HttpClient;

  constructor() {
    this.http = new HttpClient();
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

  updateSubcategory(subcategory: number, subcategoryUpdate: IUpdateCategory) {
    return this.http.updateSubcategory(subcategory, subcategoryUpdate);
  }

  deleteSubcategory(subcategoryId: number) {
    return this.http.deleteSubcategory(subcategoryId);
  }

  getPosts() {
    return this.http.getPosts();
  }

  getPost(postId: number) {
    return this.http.getPost(postId);
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

  uploadFile(file: File): Promise<string> {
    return this.http.uploadMediaFile(file);
  }

  transformDocument(file: File): Promise<string> {
    return this.http.transformDocument(file);
  }
}

export const apiService = new ApiService();
