import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import {Item} from '../../model/Cart';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private static readonly CART_API_URL = "http://localhost:8020/api/v1/carts";
  private cartItems: BehaviorSubject<Array<Item>> = new BehaviorSubject<Array<Item>>([])
  cartItems$ = this.cartItems.asObservable()
  paymentItem: Item[] = []
  constructor(private httpClient: HttpClient) { }

  getAllProductsInCart(customerId: string) {
    this.httpClient.get<Array<Item>>(`${CartService.CART_API_URL}/${customerId}`)
      .subscribe(items => this.cartItems.next(items));
  }

  addProductInCart(customerId: string, productId: number, quantity: number){
    let parameters: HttpParams = new HttpParams()
      .set('customerId', customerId)
      .set('productId', productId)
      .set('quantity', quantity);

    this.httpClient.post<Array<Item>>(CartService.CART_API_URL, null,{params: parameters})
      .subscribe(items => this.cartItems.next(items));
  }

  deleteAllProductsInCart(customerId: string){
    return this.httpClient.delete<Array<Item>>(`${CartService.CART_API_URL}/${customerId}`)
      .subscribe(items => this.cartItems.next(items))
  }

  deleteOneProductInCart(customerId: string, productId: number){
    let parameters = new HttpParams()
      .set('customerId', customerId)
      .set('productId', productId);
    this.httpClient.delete<Array<Item>>(CartService.CART_API_URL + '/item', {params: parameters})
      .subscribe(items => this.cartItems.next(items))
  }
}
