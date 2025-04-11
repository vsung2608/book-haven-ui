import {Component, OnInit} from '@angular/core';
import {CartService} from '../../../../services/cart/cart.service'
import {Item} from '../../../../model/Cart';
import {CommonModule, CurrencyPipe} from '@angular/common';
import {filter, Observable, tap} from 'rxjs';
import {MessageService} from 'primeng/api';
import {ToastModule} from 'primeng/toast';
import {Router} from '@angular/router';
import {CheckboxModule} from 'primeng/checkbox';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-cart-page',
  imports: [CurrencyPipe, CommonModule, ToastModule, CheckboxModule, FormsModule, CurrencyPipe],
  templateUrl: './cart-page.component.html',
  styleUrl: './cart-page.component.css'
})
export class CartPageComponent implements OnInit{
  items$: Observable<Array<Item>> | undefined;
  totalPrice: number = 0;
  quantity: number = 0;
  checkboxSelected: number[] = [];
  selectedAll: boolean = false;


  constructor(private cartService: CartService, private messageService: MessageService, private router: Router) {
  }

  ngOnInit() {
    this.cartService.getAllProductsInCart('1');
    this.items$ = this.cartService.cartItems$
    this.checkboxSelected = []
  }

  selectedProduct(id: number){
    this.items$?.subscribe(items => {
      items.forEach(i => {
        if(i.productId == id){
          console.log(this.checkboxSelected)
          if(this.checkboxSelected.includes(id)){
            this.totalPrice += i.promotionalPrice;
            this.totalPrice += i.quantity;
          }else{
            this.totalPrice -= i.promotionalPrice;
            this.totalPrice -= i.quantity;
          }
        }
      })
    })
  }

  selectAllProduct(){
    console.log(this.selectedAll)
    this.totalPrice = 0;
    if(this.selectedAll){
      this.items$?.subscribe(item => {
        this.checkboxSelected = item.map(i => i.productId)
        item.forEach(i => {
            this.totalPrice += i.promotionalPrice;
            this.totalPrice += i.quantity;
        })
      })
    }else {
      this.checkboxSelected = []
    }
  }

  onClickOrder(){
    if(this.checkboxSelected.length > 0){
      this.items$?.subscribe(items => {
        this.cartService.paymentItem = items.filter(item => this.checkboxSelected.includes(item.productId))
      })
      this.router.navigateByUrl('/carts/payment');
    }else{
      this.messageService.add({severity: 'warn', summary: 'Cảnh báo', detail: 'Vui lòng chọn ít nhất 1 sản phẩm muốn mua trong giỏ để đặt hàng'});
    }
  }

  upQUantity(item: any){
    if(item.quantity > 1){
      item.quantity++;
      item.totalPrice += item.promotionalPrice
    }
  }

  downQuantity(item: any){
    if(item.quantity > 1){
      item.quantity--;
      item.totalPrice -= item.promotionalPrice
    }
  }

  deleteALlItems(){
    this.cartService.deleteAllProductsInCart('1');
  }

  deleteOneItem(productId: number){
    this.cartService.deleteOneProductInCart('1', productId)
  }
}
