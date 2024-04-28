import { ISubCategory } from "../../api/types/content";

export interface IUserForm {
  name: string;
  email: string;
  password: string;
  permissions: number;
}

export interface ICategoryForm {
  name: string;
  subcategories: ISubCategory[];
}

export interface ICreateCategory {
  name: string;
  subcategories: string[];
}

export interface IUpdateCategory {
  name: string;
}

export interface IFormPost {
  category_id: number;
  subcategory_id?: number;
  content: string;
}

export interface ICreatePost {
  category_id: number;
  subcategory_id?: number;
  content: string;
}

export interface IUpdatePost {
  category_id?: number;
  subcategory_id?: number;
  content?: string;
}

export interface ICreateSubCategory {
  category_id: string
  name: string;
}

export interface IUpdateSubCategory {
  category_id?: string
  name?: string;
}