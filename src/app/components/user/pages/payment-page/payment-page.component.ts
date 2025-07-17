import {Component, OnInit} from '@angular/core';
import {FloatLabelModule} from 'primeng/floatlabel';
import {InputMaskModule} from 'primeng/inputmask';
import {City, Distict, Village} from '../../../../model/Address';
import {SelectModule} from 'primeng/select';
import {CartService} from '../../../../services/cart/cart.service';
import {Item} from '../../../../model/Cart';
import {OrderService} from '../../../../services/order/order.service';
import {ConfirmationService, MessageService} from 'primeng/api';
import {ToastModule} from 'primeng/toast';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {InputTextModule} from 'primeng/inputtext';
import {ButtonModule} from 'primeng/button';
import {ConfirmDialogModule} from 'primeng/confirmdialog';
import {PaymentMethod} from '../../../../model/Order';
import {DialogModule} from 'primeng/dialog';

@Component({
  selector: 'app-payment-page',
  imports: [FloatLabelModule, InputMaskModule, SelectModule, ToastModule, FormsModule, InputTextModule,
            ConfirmDialogModule, ButtonModule, DialogModule],
  templateUrl: './payment-page.component.html',
  styleUrl: './payment-page.component.css'
})
export class PaymentPageComponent implements OnInit{
  cities: City[] | undefined;

  cityVal: City | undefined;
  disticVal: Distict | undefined;
  villageVal: Village | undefined;
  fullnameVal: string =  "Nguyen Van Sung";
  phoneVal: string = "0964034162";
  emailVal: string = "helios@gmail.com";
  detailAddressVal: string =  "Ngo 03, Phuong Canh";
  noteVal: string = "No content";
  qrCodeVisiable: boolean = false;
  selectedMethod: PaymentMethod = PaymentMethod.COD;

  products: Item[] = []
  totalPrice: number = 0;
  shoppingFee: number = 0;
  constructor(private cartService: CartService, private orderService: OrderService,
              private messageService: MessageService, private formBuilder: FormBuilder, private confirmationService: ConfirmationService) {
  }

  ngOnInit() {
    this.cities = [
      { name: 'New York', code: 'NY' },
      { name: 'Rome', code: 'RM' },
      { name: 'London', code: 'LDN' },
      { name: 'Istanbul', code: 'IST' },
      { name: 'Paris', code: 'PRS' },
    ];
    this.products = this.cartService.paymentItem
  }

  selectMethod(method: PaymentMethod){
    this.selectedMethod = method
  }

  order(event: Event){
    let message = 'Vui lòng điền đầy đủ thông tin nhận hàng!';
    let type = "warn";

    if(this.fullnameVal.trim().length <= 5) message = 'Tên phải ít nhất 5 ký tự. Vui lòng kiểm tra lại!';
    else if(!this.isValidPhoneNumber(this.phoneVal)) message = 'Số điện thoại không hợp lệ. Vui lòng kiểm tra lại!';
    else if(!this.isValidEmail(this.emailVal)) message = 'Email không đúng định dạng. Vui lòng kiểm tra lại!';
    else{
      this.confirmationService.confirm({
        target: event.target as EventTarget,
        message: 'Bạn có chắc muốn đặt mua những sản phẩm này không?',
        header: 'Xác nhận',
        closable: true,
        closeOnEscape: true,
        icon: 'pi pi-exclamation-triangle',
        rejectButtonProps: {
          label: 'Hủy',
          severity: 'primary',
          outlined: true,
        },
        acceptButtonProps: {
          label: 'Xác nhận',
        },
        accept: () => {
          if(this.selectedMethod === PaymentMethod.QR){
            this.qrCodeVisiable = true;
          }else {
            let shippingAddress = `${this.detailAddressVal} - ${this.villageVal} - ${this.disticVal} - ${this.cityVal}`;
            this.orderService.placeOrder(this.selectedMethod, this.totalPrice, this.noteVal, this.shoppingFee, shippingAddress);
            message = 'Cảm ơn quý khách đã tin tưởng và mua hàng.';
            type = "success"
            this.messageService.add({severity: type, summary: 'Thông báo', detail: message});
          }
        },
        reject: () => {
        },
      });
    }
    this.messageService.add({ severity: type, summary: 'Thông báo', detail: message });
  }

  isValidPhoneNumber(phone: string): boolean {
    const vietnamPhoneRegex = /^(0|\+84)[3|5|7|8|9][0-9]{8}$/;
    return vietnamPhoneRegex.test(phone);
  }

  isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  protected readonly PaymentMethod = PaymentMethod;
}
