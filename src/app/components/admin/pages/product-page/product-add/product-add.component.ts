import {Component, OnInit} from '@angular/core';
import {FileSelectEvent, FileUploadModule} from 'primeng/fileupload';
import {ButtonModule} from 'primeng/button';
import {BadgeModule} from 'primeng/badge';
import {PrimeNG} from 'primeng/config';
import {MenuItem, MessageService} from 'primeng/api';
import {ProgressBarModule} from 'primeng/progressbar';
import {FormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {FloatLabelModule} from 'primeng/floatlabel';
import {EditorModule} from 'primeng/editor';
import {MultiSelectModule} from 'primeng/multiselect';
import {DatePickerModule} from 'primeng/datepicker';
import {BreadcrumbModule} from 'primeng/breadcrumb';
import {RouterLink} from '@angular/router';
import {Observable} from 'rxjs';
import {Category} from '../../../../../model/Products';
import {CategoryService} from '../../../../../services/product/category.service';

@Component({
  selector: 'app-product-add',
  imports: [FileUploadModule, ButtonModule, BadgeModule, ProgressBarModule, FormsModule, CommonModule,
            FloatLabelModule, EditorModule, MultiSelectModule, DatePickerModule, BreadcrumbModule, RouterLink],
  templateUrl: './product-add.component.html',
  styleUrl: './product-add.component.css'
})
export class ProductAddComponent implements OnInit{
  files: File[] = [];

  totalSize : number = 0;

  totalSizePercent : number = 0;

  descriptionVal: string = '';

  dateVal: Date | undefined

  categories: Category[] = []
  selectedCategory!: number;

  loading: boolean = false;

  items?: MenuItem[];

  constructor(private config: PrimeNG, private messageService: MessageService, private categoryService: CategoryService) {}

  ngOnInit() {
    this.items = [{ icon: 'pi pi-home', route: '/admin' }, { label: 'Quản lý' }, {label: 'Sản phẩm'}, { label: 'Thêm mới', route: '/admin/products/add' }];
    this.categoryService.loadCategories()
    this.categoryService.categories$.subscribe(categories => {
      this.categories = categories
    });
  }

  choose(event: Event, callback: () => void) {
    callback();
  }

  onRemoveTemplatingFile(event: Event, file: File, removeFileCallback: (arg0: Event, arg1: any) => void, index: any) {
    removeFileCallback(event, index);
    this.totalSize -= parseInt(this.formatSize(file.size));
    this.totalSizePercent = this.totalSize / 10;
  }

  onClearTemplatingUpload(clear: () => void) {
    clear();
    this.totalSize = 0;
    this.totalSizePercent = 0;
  }

  onTemplatedUpload() {
    this.messageService.add({ severity: 'info', summary: 'Success', detail: 'File Uploaded', life: 3000 });
  }

  onSelectedFiles(event: FileSelectEvent) {
    this.files = event.currentFiles;
    this.files.forEach((file) => {
      this.totalSize += parseInt(this.formatSize(file.size));
    });
    this.totalSizePercent = this.totalSize / 10;
  }

  uploadEvent(callback: () => void) {
    callback();
  }

  formatSize(bytes: number) {
    const k = 1024;
    const dm = 3;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
    if (bytes === 0) {
      return `0 ${sizes[0]}`;
    }

    const i = Math.floor(Math.log(bytes) / Math.log(k));
    const formattedSize = parseFloat((bytes / Math.pow(k, i)).toFixed(dm));

    return `${formattedSize} ${sizes[i]}`;
  }

  load() {
    this.loading = true;

    console.log(this.selectedCategory)

    setTimeout(() => {
      this.loading = false
    }, 2000);
  }
}
