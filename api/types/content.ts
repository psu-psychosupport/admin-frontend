export interface ICategory {
  id: number;
  name: string;
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
}