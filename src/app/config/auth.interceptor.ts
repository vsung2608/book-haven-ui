import { HttpInterceptorFn } from '@angular/common/http';
import {inject} from '@angular/core';
import {AuthService} from '../services/auth/auth.service';
import {BehaviorSubject, filter, from, switchMap, take} from 'rxjs';

let isRefreshing = false;
const refreshTokenSubject = new BehaviorSubject<string | null>(null);
export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);
  return next(req)
  //
  // if (!authService.isTokenExpired() && authService.getAccessToken()) {
  //   req = req.clone({
  //     setHeaders: { 'Authentication': `Bearer ${authService.getAccessToken()}`}
  //   })
  // }
  //
  // // Nếu đang refresh token, đợi cho đến khi refresh hoàn tất
  // if (isRefreshing) {
  //   return refreshTokenSubject.pipe(
  //     filter(token => token !== null),  // Chỉ tiếp tục khi token mới có sẵn
  //     take(1), // Lấy giá trị mới nhất và tiếp tục request
  //     switchMap(newToken => {
  //       req = req.clone({ setHeaders: { Authorization: `Bearer ${newToken}` } });
  //       return next(req);
  //     })
  //   );
  // }
  //
  // // Nếu chưa refresh, bắt đầu quá trình refresh token
  // isRefreshing = true;
  // refreshTokenSubject.next(null);
  //
  // return from(authService.refresh()).pipe(
  //   switchMap(newToken => {
  //     isRefreshing = false;
  //     if (newToken) {
  //       refreshTokenSubject.next(newToken.accessToken); // Lưu token mới để các request khác dùng
  //       req = req.clone({ setHeaders: { Authorization: `Bearer ${newToken.accessToken}` } });
  //       return next(req);
  //     } else {
  //       authService.signOut(); // Nếu refresh thất bại, đăng xuất
  //       return next(req);
  //     }
  //   }),
  //   filter(() => false) // Chặn request gốc bị mất
  // );
};
