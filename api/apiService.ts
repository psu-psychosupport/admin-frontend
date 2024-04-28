import HttpClient from "./httpClient";
import {
  ICategoryForm,
  ICreateCategory,
  ICreatePost,
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
    return this.http.getCategories();
  }

  getSubcategory(categoryId: number) {
    return this.http.getCategory(categoryId);
  }

  createSubcategory(category: ICreateCategory) {
    return this.http.createCategory(category);
  }

  updateSubcategory(categoryId: number, category: IUpdateCategory) {
    return this.http.updateCategory(categoryId, category);
  }

  deleteSubcategory(categoryId: number) {
    return this.http.deleteCategory(categoryId);
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
    return this.http.uploadFile(file);
  }
}

export const apiService = new ApiService();
