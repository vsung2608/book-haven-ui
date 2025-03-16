import {Component, OnInit} from '@angular/core';
import {InfiniteScrollDirective} from 'ngx-infinite-scroll';
import {ProductService} from '../../../../services/product/product.service';
import {Page, Products} from '../../../../model/Products';

@Component({
  selector: 'app-product-page',
  imports: [InfiniteScrollDirective],
  templateUrl: './product-page.component.html',
  styleUrl: './product-page.component.css'
})
export class ProductPageComponent implements OnInit{
  currentPage: number = 0;
  totalPages?: number;
  pageSize: number = 0;
  totalElements?: number;
  products: Array<Products> = [];
  currentPageName: string = 'total';
  sort: string = '';

  activeButton: HTMLButtonElement | null = null;

  constructor(private productService: ProductService) {
  }

  ngOnInit(): void {
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
    this.productService.getLatestProducts(this.currentPage, this.pageSize)
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

  setAtrribute(page: Page){
    this.currentPage = page.currentPage;
    this.totalPages = page.totalPages;
    this.pageSize = page.pageSize;
    this.totalElements = page.totalElements;
    this.products = page.data;
  }

  cleanPage(){
    this.currentPage = 1;
    this.pageSize = 10;
    this.products = [];
  }
}
