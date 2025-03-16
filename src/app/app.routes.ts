import { Routes } from '@angular/router';
import {HomePageComponent} from './components/user/pages/home-page/home-page.component';
import {BlogPageComponent} from './components/user/pages/blog-page/blog-page.component';
import {AuthLayoutComponent} from './layout/auth-layout/auth-layout.component';
import {SignInComponent} from './components/sign-in/sign-in.component';
import {SignUpComponent} from './components/sign-up/sign-up.component';
import {MainLayoutComponent} from './layout/main-layout/main-layout.component';
import {ProductPageComponent} from './components/user/pages/product-page/product-page.component';

export const routes: Routes = [
  {
    path: '',
    component: MainLayoutComponent,
    children: [
      { path: '', component: HomePageComponent },
      { path: 'blogs', component: BlogPageComponent },
      { path: 'products', component: ProductPageComponent}
    ]
  },

  {
    path: 'auth',
    component: AuthLayoutComponent,
    children: [
      { path: 'sign-in', component: SignInComponent },
      { path: 'sign-up', component: SignUpComponent}
    ]
  },
];
