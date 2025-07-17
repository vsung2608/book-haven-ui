import {ChangeDetectorRef, Component, OnInit, ViewChild} from '@angular/core';
import {Table, TableModule} from 'primeng/table';
import {ConfirmationService, MenuItem, MessageService} from 'primeng/api';
import {ConfirmDialogModule} from 'primeng/confirmdialog';
import {ButtonModule} from 'primeng/button';
import {FormsModule} from '@angular/forms';
import {SelectModule} from 'primeng/select';
import {DialogModule} from 'primeng/dialog';
import {ToolbarModule} from 'primeng/toolbar';
import {ToastModule} from 'primeng/toast';
import {RadioButtonModule} from 'primeng/radiobutton';
import {TagModule} from 'primeng/tag';
import {RatingModule} from 'primeng/rating';
import {InputIconModule} from 'primeng/inputicon';
import {CommonModule, CurrencyPipe} from '@angular/common';
import {IconFieldModule} from 'primeng/iconfield';
import {FileUploadModule} from 'primeng/fileupload';
import {BreadcrumbModule} from 'primeng/breadcrumb';
import {Router, RouterLink} from '@angular/router';
import {PaginatorModule, PaginatorState} from 'primeng/paginator';
import {ProductLimitedFields, Products} from '../../../../../model/Products';
import {ProductService} from '../../../../../services/product/product.service';

interface Column {
  field: string;
  header: string;
  customExportHeader?: string;
}

interface ExportColumn {
  title: string;
  dataKey: string;
}

@Component({
  selector: 'app-product-list',
  imports: [ConfirmDialogModule, ButtonModule, FormsModule, SelectModule, DialogModule,
            TableModule, ToolbarModule, ToastModule, RadioButtonModule, TagModule,
            RatingModule, InputIconModule, CurrencyPipe, IconFieldModule, FileUploadModule,
            CommonModule, BreadcrumbModule, RouterLink, PaginatorModule],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css'
})

export class ProductListComponent implements OnInit {
  productDialog: boolean = false;

  items?: MenuItem[];

  products!: ProductLimitedFields[];

  product!: Products;

  selectedProducts!: ProductLimitedFields[] | null;

  submitted: boolean = false;

  first: number = 0;

  rows: number = 10;

  page: number = 0;

  totalRecords?: number;

  @ViewChild('dt') dt!: Table;

  cols!: Column[];

  exportColumns!: ExportColumn[];

  constructor(
    private productService: ProductService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private cd: ChangeDetectorRef,
    private route: Router
  ) {
  }

  ngOnInit(): void {
    this.loadDemoData();
    this.items = [{ icon: 'pi pi-home', route: '/admin' }, { label: 'Quản lý' }, {label: 'Sản phẩm'}, { label: 'Danh sách', route: '/admin/products' }];
  }

  onPageChange(event: PaginatorState) {
    this.first = event.first ?? 0;
    this.rows = event.rows ?? 10;
    this.page = event.page ?? 0;
    this.productService.getProducts(this.page + 1, this.rows).subscribe(page => {
      this.products = page.data
      this.totalRecords = page.totalElements
      this.cd.markForCheck()
    })
  }

  exportCSV(event: Event) {
    this.dt.exportCSV();
  }

  loadDemoData() {
    this.productService.getProducts(this.first + 1, this.rows).subscribe(page => {
      this.products = page.data
      this.totalRecords = page.totalElements
      this.cd.markForCheck()
    })

    this.cols = [
      {field: 'code', header: 'Code', customExportHeader: 'Product Code'},
      {field: 'name', header: 'Name'},
      {field: 'image', header: 'Image'},
      {field: 'price', header: 'Price'},
      {field: 'category', header: 'Category'}
    ];

    this.exportColumns = this.cols.map((col) => ({title: col.header, dataKey: col.field}));
  }

  navigateNewProductPage(){
    this.route.navigateByUrl("/admin/products/add")
  }

  editProduct(product: Products) {
    this.product = {...product};
    this.productDialog = true;
  }

  deleteSelectedProducts() {
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete the selected products?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.products = this.products.filter((val) => !this.selectedProducts?.includes(val));
        this.selectedProducts = null;
        this.messageService.add({
          severity: 'success',
          summary: 'Successful',
          detail: 'Products Deleted',
          life: 3000
        });
      }
    });
  }

  hideDialog() {
    this.productDialog = false;
    this.submitted = false;
  }

  deleteProduct(product: Products) {
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete ' + product.name + '?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.products = this.products.filter((val) => val.id !== product.id);
        this.product = {} as Products;
        this.messageService.add({
          severity: 'success',
          summary: 'Successful',
          detail: 'Product Deleted',
          life: 3000
        });
      }
    });
  }

  findIndexById(id: number): number {
    let index = -1;
    for (let i = 0; i < this.products.length; i++) {
      if (this.products[i].id === id) {
        index = i;
        break;
      }
    }

    return index;
  }

  getSeverity(quantity: number) {
    if(quantity == 0) return 'danger';
    else if(quantity <= 20) return 'warn';
    else return 'success';
  }

  getStatus(quantity: number){
    if(quantity == 0) return 'Hết hàng (' + quantity + ')';
    else if(quantity <= 20) return 'Sắp hết (' + quantity + ')';
    else return 'Còn hàng (' + quantity + ')';
  }

  saveProduct() {
    this.submitted = true;

    if (this.product.name?.trim()) {
      if (this.product.id) {
        // const productTmp: ProductLimitedFields = {id: this.product.id, image: this.product.image, price: this.product.price, evaluate: this.product.evaluate,
        // name: this.product.name, quantity: this.product.quantity, categoryName: this.product.categoryName, discount: this.product.discount}
        this.products[this.findIndexById(this.product.id)] = this.product;
        this.messageService.add({
          severity: 'success',
          summary: 'Successful',
          detail: 'Product Updated',
          life: 3000
        });
      }

      this.products = [...this.products];
      this.productDialog = false;
      this.product = {} as Products;
    }
  }

  onGlobalFilter(event: any) {
    const value = (event.target as HTMLInputElement).value;
    this.dt?.filterGlobal(value, 'contains');
  }
}
