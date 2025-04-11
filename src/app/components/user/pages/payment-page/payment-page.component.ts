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

@Component({
  selector: 'app-payment-page',
  imports: [FloatLabelModule, InputMaskModule, SelectModule, ToastModule, FormsModule, InputTextModule,
            ReactiveFormsModule, ConfirmDialogModule, ButtonModule],
  templateUrl: './payment-page.component.html',
  styleUrl: './payment-page.component.css'
})
export class PaymentPageComponent implements OnInit{
  form!: FormGroup
  cities: City[] | undefined;
  cityVal: City | undefined;
  disticVal: Distict | undefined;
  villageVal: Village | undefined;
  selectedMethod: PaymentMethod = PaymentMethod.COD;
  products: Item[] = []
  totalPrice: number = 0;
  shoppingFee: number = 0;
  constructor(private cartService: CartService, private orderService: OrderService,
              private messageService: MessageService, private formBuilder: FormBuilder, private confirmationService: ConfirmationService) {
  }

  ngOnInit() {
    this.form = this.formBuilder.group({
      fullName: ['', [Validators.required, Validators.minLength(5)]],
      phoneNumber: ['', [Validators.required, Validators.pattern(/^(0|\+84)[0-9]{9}$/)]],
      email: ['', [Validators.required, Validators.email]],
      detailAddress: [''],
      note: ['']
    })
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
    if(this.form.invalid){
      let message = 'Vui lòng điền đầy đủ thông tin nhận hàng!'
      if(this.form.get('fullName')?.invalid) message = 'Tên phải ít nhất 5 ký tự. Vui lòng kiểm tra lại!';
      if(this.form.get('phoneNumber')?.invalid) message = 'Số điện thoại không hợp lệ. Vui lòng kiểm tra lại!';
      if(this.form.get('fullName')?.invalid) message = 'Email không đúng định dạng. Vui lòng kiểm tra lại!';
      this.messageService.add({severity: 'warn', summary: 'Cảnh báo', detail: message})
    }else{
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
          let shippingAddress = `${this.form.get('detailAddress')} - ${this.villageVal} - ${this.disticVal} - ${this.cityVal}`
          this.orderService.placeOrder(this.selectedMethod, this.totalPrice, this.form.get('note')?.value, this.shoppingFee, shippingAddress)
          this.messageService.add({ severity: 'success', summary: 'Thành công', detail: 'Cảm ơn quý khách đã tin tưởng và mua hàng.' });
        },
        reject: () => {
        },
      });
    }
  }

  protected readonly PaymentMethod = PaymentMethod;
}
