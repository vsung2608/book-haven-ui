import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Page, Products} from '../../model/Products';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  // URL API Products
  private static readonly PRODUCTS_URL: string = 'http://localhost:8070/api/v1/products';
  private static readonly GET_PRODUCTS_LATEST_URL: string = 'http://localhost:8070/api/v1/products/latest';
  private static readonly GET_PRODUCTS_BEST_SELLER_URL: string = 'http://localhost:8070/api/v1/products/best-seller';
  private static readonly GET_DETAIL_PRODUCT_URL: string = 'http://localhost:8070/api/v1/products';

  params: HttpParams = new HttpParams().set('page', 1).set('size', 10);

  constructor(private httpClient: HttpClient) { }

  getDetailProductById(id: number): Observable<Products>{
      return this.httpClient.get<Products>(ProductService.GET_DETAIL_PRODUCT_URL + '/' + id);
  }

  getProducts(page: number, size: number): Observable<Page>{
    if (page != null && size != null){
      this.params = this.params.set('page', page).set('size', size);
    }
    return this.httpClient.get<Page>(ProductService.PRODUCTS_URL, { params: this.params });
  }

  getLatestProducts(page: number, size: number): Observable<Page>{
    if (page != null && size != null){
      this.params = this.params.set('page', page).set('size', size);
    }
    return this.httpClient.get<Page>(ProductService.GET_PRODUCTS_LATEST_URL, { params: this.params });
  }

  getBestSellerProducts(page: number, size: number): Observable<Page>{
    if (page != null && size != null){
      this.params = this.params.set('page', page).set('size', size);
    }
    return this.httpClient.get<Page>(ProductService.GET_PRODUCTS_BEST_SELLER_URL, { params: this.params });
  }

  getSortedByPriceProducts(page: number, size: number, sort: string): Observable<Page>{
    if (page !== 0 && size !== 0){
      this.params = this.params.set('page', page).set('size', size).set('sort', sort);
    }
    let products: Observable<Page> = this.httpClient.get<Page>(ProductService.PRODUCTS_URL, { params: this.params });
    this.params.delete('sort');
    return products;
  }

  postNewProduct(product: Products, images: File[]){
    const formData = new FormData();

    formData.append('product', new Blob([JSON.stringify(product)], { type: 'application/json' }));
    images.forEach(file => {
      formData.append('images', file); // 'images' trùng tên với backend
    });

    this.httpClient.post(ProductService.PRODUCTS_URL, formData);
  }
}
