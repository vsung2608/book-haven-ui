import { Injectable } from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {Category} from '../../model/Products';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  private static readonly CATEGORY_URL = "http://localhost:8070/api/v1/categories"

  categoriesSubject = new BehaviorSubject<Category[]>([])
  categories$ = this.categoriesSubject.asObservable()
  constructor(private httpClient: HttpClient) { }

  loadCategories(){
    this.httpClient.get<Category[]>(CategoryService.CATEGORY_URL)
      .subscribe(categories => {
        this.categoriesSubject.next(categories)
      })
  }
}
