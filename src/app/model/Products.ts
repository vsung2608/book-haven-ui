export interface Page{
  currentPage: number;
  totalPages?: number;
  pageSize: number;
  totalElements?: number;
  data: Array<Products>;
}

export interface Products{
  id?: number;
  name?: string;
  description?: string;
  price?: number;
  quantity?: number;
  language?: string;
  publishDate?: string;
  author?: string;
  publisher?: string;
  category: Category;
}

export interface Category{
  id?: number;
  name?: string;
  description?: string;
}
