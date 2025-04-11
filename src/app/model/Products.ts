export interface Page{
  currentPage: number;
  totalPages?: number;
  pageSize: number;
  totalElements?: number;
  data: Array<Products>;
}

export interface Products{
  id: number;
  name?: string;
  description?: string;
  price?: number;
  promotionalPrice?: number;
  quantity?: number;
  language?: string;
  publishDate?: string;
  author?: string;
  publisher?: string;
  image: string;
  category?: Category;
  evaluate: number;
  discount: number;
}

export interface Category{
  id?: number;
  name?: string;
  description?: string;
}

export interface ImageItem {
  itemImageSrc: string;
  thumbnailImageSrc: string;
  alt: string;
  title: string;
}
