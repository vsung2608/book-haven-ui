import {Component, OnInit, ViewChild} from '@angular/core';
import {CustomerTmpService} from '../../../../../services/tmp/customer-tmp.service';
import {Table, TableModule} from 'primeng/table';
import {MenuItem, PrimeIcons} from 'primeng/api';
import {BreadcrumbModule} from 'primeng/breadcrumb';
import {Event, RouterLink} from '@angular/router';
import {CommonModule} from '@angular/common';
import {ToastModule} from 'primeng/toast';
import {ButtonModule} from 'primeng/button';
import {ProgressBarModule} from 'primeng/progressbar';
import {TagModule} from 'primeng/tag';
import {InputIconModule} from 'primeng/inputicon';
import {SliderModule} from 'primeng/slider';
import {DropdownModule} from 'primeng/dropdown';
import {MultiSelectModule} from 'primeng/multiselect';
import {IconFieldModule} from 'primeng/iconfield';
import {FormsModule} from '@angular/forms';

export interface Country {
  name?: string;
  code?: string;
}

export interface Representative {
  name?: string;
  image?: string;
}

export interface Customer {
  id?: number;
  name?: string;
  country?: Country;
  company?: string;
  date?: string | Date;
  status?: string;
  activity?: number;
  representative?: Representative;
  verified?: boolean;
  balance?: number;
}

@Component({
  selector: 'app-customer-list',
  imports: [BreadcrumbModule, RouterLink, CommonModule, ToastModule, TableModule, ButtonModule, ProgressBarModule,
            TagModule, InputIconModule, SliderModule, DropdownModule, MultiSelectModule, IconFieldModule, FormsModule],
  templateUrl: './customer-list.component.html',
  styleUrl: './customer-list.component.css'
})

export class CustomerListComponent implements OnInit{
  customers!: Customer[];

  selectedCustomers!: Customer[];

  representatives!: Representative[];

  statuses!: any[];

  loading: boolean = true;

  activityValues: number[] = [0, 100];

  items?: MenuItem[];

  @ViewChild('dt') dt!: Table;

  constructor(private customerService: CustomerTmpService) {}

  ngOnInit() {
    this.customerService.getCustomersLarge().then((customers) => {
      this.customers = customers;
      this.loading = false;

      this.customers.forEach((customer) => (customer.date = new Date(<Date>customer.date)));
    });

    this.representatives = [
      { name: 'Amy Elsner', image: 'amyelsner.png' },
      { name: 'Anna Fali', image: 'annafali.png' },
      { name: 'Asiya Javayant', image: 'asiyajavayant.png' },
      { name: 'Bernardo Dominic', image: 'bernardodominic.png' },
      { name: 'Elwin Sharvill', image: 'elwinsharvill.png' },
      { name: 'Ioni Bowcher', image: 'ionibowcher.png' },
      { name: 'Ivan Magalhaes', image: 'ivanmagalhaes.png' },
      { name: 'Onyama Limba', image: 'onyamalimba.png' },
      { name: 'Stephen Shaw', image: 'stephenshaw.png' },
      { name: 'Xuxue Feng', image: 'xuxuefeng.png' }
    ];

    this.statuses = [
      { label: 'Unqualified', value: 'unqualified' },
      { label: 'Qualified', value: 'qualified' },
      { label: 'New', value: 'new' },
      { label: 'Negotiation', value: 'negotiation' },
      { label: 'Renewal', value: 'renewal' },
      { label: 'Proposal', value: 'proposal' }
    ];

    this.items = [{ icon: 'pi pi-home', route: '/admin' }, { label: 'Quản lý' }, {label: 'Khách hàng'}, { label: 'Danh sách', route: '/admin/customers' }];
  }

  getSeverity(status: string) {
    switch (status) {
      case 'unqualified':
        return 'danger';

      case 'qualified':
        return 'success';

      case 'new':
        return 'info';

      case 'negotiation':
        return 'warn';

      case 'renewal':
        return undefined;

      default:
        return undefined;
    }
  }

  onGlobalFilter(event: any) {
    const value = (event.target as HTMLInputElement).value;
    this.dt?.filterGlobal(value, 'contains');
  }

  clear(event: Event){

  }
}
