export interface Page{
  currentPage: number;
  totalPages?: number;
  pageSize: number;
  totalElements?: number;
  data: Array<ProductLimitedFields>;
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
  categoryName: string;
  relatedProducts: Array<ProductLimitedFields>;
}

export interface ProductRequest{
  name: string
  description: string
  price: number
  categoryId: number
  quantity: number
  language: string
  publishDate: string
  author: string
  publisher: string
  evaluate: string
  discount: number
}

export interface ProductLimitedFields{
  id: number;
  name?: string;
  discount?: number;
  evaluate?: number;
  image?: string;
  price?: number;
  categoryName?: string;
  quantity?: number;
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
