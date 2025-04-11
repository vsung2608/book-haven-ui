import {Routes} from '@angular/router';
import {HomePageComponent} from './components/user/pages/home-page/home-page.component';
import {BlogPageComponent} from './components/user/pages/blog-page/blog-page.component';
import {AuthLayoutComponent} from './layout/auth-layout/auth-layout.component';
import {SignInComponent} from './components/sign-in/sign-in.component';
import {SignUpComponent} from './components/sign-up/sign-up.component';
import {UserLayoutComponent} from './layout/user-layout/user-layout.component';
import {ProductPageComponent} from './components/user/pages/product-page/product-page.component';
import {CartPageComponent} from './components/user/pages/cart-page/cart-page.component';
import {DetailProductPageComponent} from './components/user/pages/detail-product-page/detail-product-page.component';
import {AdminLayoutComponent} from './layout/admin-layout/admin-layout.component';
import {DashboardPageComponent} from './components/admin/pages/dashboard-page/dashboard-page.component';
import {PaymentPageComponent} from './components/user/pages/payment-page/payment-page.component';

export const routes: Routes = [
  {
    path: '',
    component: UserLayoutComponent,
    children: [
      { path: '', component: HomePageComponent },
      { path: 'blogs', component: BlogPageComponent },
      { path: 'products', component: ProductPageComponent},
      { path: 'carts', component: CartPageComponent},
      { path: 'products/:id', component: DetailProductPageComponent},
      { path: 'carts/payment', component: PaymentPageComponent}
    ]
  },

  {
    path: 'admin',
    component: AdminLayoutComponent,
    children: [
      {path: '', component: DashboardPageComponent}
    ]
  },

  {
    path: 'auth',
    component: AuthLayoutComponent,
    children: [
      { path: 'sign-in', component: SignInComponent },
      { path: 'sign-up', component: SignUpComponent}
    ]
  }
];
