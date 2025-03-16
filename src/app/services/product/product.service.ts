import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Page} from '../../model/Products';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  // URL API Products
  private static readonly GET_PRODUCTS_URL: string = 'http://localhost:8222/api/v1/products';
  private static readonly GET_PRODUCTS_LATEST_URL: string = 'http://localhost:8222/api/v1/products/latest';
  private static readonly GET_PRODUCTS_BEST_SELLER_URL: string = 'http://localhost:8222/api/v1/products/best-seller';

  params: HttpParams = new HttpParams().set('page', 1).set('size', 10);

  constructor(private httpClient: HttpClient) { }

  getProducts(page: number, size: number): Observable<Page>{
    if (page != null && size != null){
      this.params = this.params.set('page', page).set('size', size);
    }
    return this.httpClient.get<Page>(ProductService.GET_PRODUCTS_URL, { params: this.params });
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
    let products: Observable<Page> = this.httpClient.get<Page>(ProductService.GET_PRODUCTS_URL, { params: this.params });
    this.params.delete('sort');
    return products;
  }
}
