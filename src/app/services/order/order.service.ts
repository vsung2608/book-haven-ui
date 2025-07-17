import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {CartService} from '../cart/cart.service';
import {PaymentMethod, PaymentStatus, PlaceOrderRequest, PurchaseRequest, Status} from '../../model/Order';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private static readonly ORDER_API_URL = 'http://localhost:8060/api/v1/orders'

  constructor(private httpClient: HttpClient, private cartService: CartService) { }

  placeOrder(method: PaymentMethod, totalPrice: number, note: string, shippingFee: number, shippingAddress: string){
    let items: PurchaseRequest[] = [];
    this.cartService.paymentItem.forEach(item => {
      let i: PurchaseRequest = {id: item.productId, quantity: item.quantity};
      items.push(i)
    })
    let request: PlaceOrderRequest = {
      reference: 'DH001', paymentMethod: method, totalPrice: totalPrice, orderLines: items, status: Status.PENDING,
      note: note, shippingAddress: shippingAddress, shippingFee: shippingFee, customerId: '1', paymentStatus: PaymentStatus.UNPAID
    }
    this.httpClient.post(OrderService.ORDER_API_URL, request).subscribe({
      next: data => {
        console.log("success")
      },
      error: error => {
        console.error('There was an error!', error);
      }
    });
  }
}
