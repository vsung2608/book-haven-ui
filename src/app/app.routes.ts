import { Routes } from '@angular/router';
import {HomePageComponent} from './components/user/pages/home-page/home-page.component';
import {BlogPageComponent} from './components/user/pages/blog-page/blog-page.component';
import {AppComponent} from './layout/main-layout/app.component';
import {AuthLayoutComponent} from './layout/auth-layout/auth-layout.component';
import {SignInComponent} from './components/sign-in/sign-in.component';
import {SignUpComponent} from './components/sign-up/sign-up.component';

export const routes: Routes = [
  {
    path: '',
    component: AppComponent,
    children: [
      { path: '', component: HomePageComponent },
      { path: 'blogs', component: BlogPageComponent }
    ]
  },

  {
    path: '',
    component: AuthLayoutComponent,
    children: [
      { path: 'sig-in', component: SignInComponent },
      { path: 'sig-up', component: SignUpComponent}
    ]
  },
];
