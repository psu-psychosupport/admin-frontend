import {MediaTypes} from "./enums";

export interface ICategory {
  id: number;
  name: string;
  subcategories: ISubCategory[];
}

export interface ISubCategory {
  id: number;
  category_id: number;
  name: string;
}

export interface IPost {
  id: number;
  category_id: number;
  subcategory_id?: number;
  name: string;
  content: string;
  category: ICategory;
  subcategory: ISubCategory;
}

export interface IMedia<T> {
  id: number;
  file_url?: string;
  file_name?: string;
  type: MediaTypes;
  data?: T;
}