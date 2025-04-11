import {AfterViewInit, Component, ElementRef, ViewChild} from '@angular/core';
import {InfiniteScrollDirective} from 'ngx-infinite-scroll';
import {ProductService} from '../../../../services/product/product.service';
import {Page, Products} from '../../../../model/Products';
import {CommonModule, CurrencyPipe} from '@angular/common';
import {RatingModule} from 'primeng/rating';
import {FormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';
import {CartService} from '../../../../services/cart/cart.service';
import {ConfirmationService, MessageService} from 'primeng/api';
import {ConfirmPopup, ConfirmPopupModule} from 'primeng/confirmpopup';
import {ToastModule} from 'primeng/toast';
import {ButtonModule} from 'primeng/button';
import {SkeletonModule} from 'primeng/skeleton';
import {DataViewModule} from 'primeng/dataview';

@Component({
  selector: 'app-product-page',
  imports: [
    InfiniteScrollDirective, CurrencyPipe, RatingModule, FormsModule,
    RouterModule, ToastModule, ButtonModule, ConfirmPopupModule,
    SkeletonModule, DataViewModule, CommonModule
  ],
  templateUrl: './product-page.component.html',
  styleUrl: './product-page.component.css'
})
export class ProductPageComponent implements AfterViewInit{
  currentPage: number = 0;
  totalPages?: number;
  pageSize: number = 0;
  totalElements?: number;
  products: Array<Products> = [];
  currentPageName: string = 'total';
  sort: string = '';
  currentId: number = 0;
  layout: 'grid' | 'list' = 'grid';
  @ViewChild('btn1') btn1: ElementRef<HTMLButtonElement> | undefined
  @ViewChild(ConfirmPopup) confirmPopup!: ConfirmPopup;

  activeButton: HTMLButtonElement | undefined

  constructor(private productService: ProductService, private cartService: CartService,
              private confirmationService: ConfirmationService, private messageService: MessageService) {
  }

  ngAfterViewInit(): void {
    if(this.btn1){
      this.setActive(this.btn1.nativeElement)
    }
    this.onTotalProductsPage()
  }

  setActive(button: HTMLButtonElement) {
    if (this.activeButton) {
      this.activeButton.classList.remove('active');
    }
    button.classList.add('active');
    this.activeButton = button;
  }

  onTotalProductsPage(){
    this.cleanPage();
    this.productService.getProducts(this.currentPage, this.pageSize)
      .pipe()
      .subscribe(page => this.setAtrribute(page))
  }

  onLatestProductsPage(){
    this.cleanPage();
    this.productService.getLatestProducts(this.currentPage, this.pageSize)
      .pipe()
      .subscribe(page => this.setAtrribute(page))
  }

  onBestSellerProductsPage(){
    this.cleanPage();
    this.productService.getBestSellerProducts(this.currentPage, this.pageSize)
      .pipe()
      .subscribe(page => this.setAtrribute(page))
  }

  onSortedByDescPricePage(){
    this.cleanPage();
    this.sort = 'price_desc';
    this.productService.getSortedByPriceProducts(this.currentPage, this.pageSize, this.sort)
      .pipe()
      .subscribe(page => this.setAtrribute(page))
  }

  onSortedByAscPricePage(){
    this.cleanPage();
    this.sort = 'price_asc';
    this.productService.getSortedByPriceProducts(this.currentPage++, this.pageSize, this.sort)
      .pipe()
      .subscribe(page => this.setAtrribute(page))
  }

  loadMoreProducts(){
    if(this.currentPageName === 'total'){
      this.productService.getProducts(this.currentPage++, this.pageSize).pipe()
        .subscribe(page => this.setAtrribute(page));
    }else if(this.currentPageName === 'latest'){
      this.productService.getLatestProducts(this.currentPage++, this.pageSize).pipe()
        .subscribe(page => this.setAtrribute(page));
    }else if(this.currentPageName === 'best-seller'){
      this.productService.getBestSellerProducts(this.currentPage++, this.pageSize).pipe()
        .subscribe(page => this.setAtrribute(page));
    }else if(this.currentPageName === 'sort'){
      this.productService.getSortedByPriceProducts(this.currentPage++, this.pageSize, this.sort).pipe()
        .subscribe(page => this.setAtrribute(page));
    }
  }

  addProductInCart(){
    this.cartService.addProductInCart('1', this.currentId, 1);
  }

  setAtrribute(page: Page){
    this.currentPage = page.currentPage;
    this.totalPages = page.totalPages;
    this.pageSize = page.pageSize;
    this.totalElements = page.totalElements;
    this.products = page.data;
  }

  cleanPage(){
    this.currentPage = 1;
    this.pageSize = 8;
    this.products = [];
  }

  accept(id: number) {
    this.confirmPopup.onAccept();
  }

  reject() {
    this.confirmPopup.onReject();
  }

  confirm(event: Event) {
    this.confirmationService.confirm({
      target: event.target as EventTarget,
      message: 'Thêm sản phẩm này vào giỏ?',
      accept: () => {
        this.addProductInCart();
        this.messageService.add({ severity: 'success', summary: 'Thành công', detail: 'Bạn đã thêm 1 sản phẩm vào giỏ!', life: 3000 });
      },
      reject: () => {
        this.messageService.add({ severity: 'error', summary: 'Hủy thaot tác', detail: 'Đã hủy thao tác', life: 3000 });
      }
    });
  }

  setCurrentId(id: number){
    this.currentId = id;
  }

  counterArray(n: number): any[] {
    return Array(n);
  }
}
