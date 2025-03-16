import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {LoginRequest, TokenResponse} from '../../model/Auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  // URL API Auth
  private static readonly SIGN_IN_URL: string = 'http://localhost:8222/api/v1/auth/login';
  private static readonly SIGN_UP_URL: string = 'http://localhost:8222/api/v1/auth/register';
  private static readonly REFRESH_URL: string = 'http://localhost:8222/api/v1/auth/refresh';

  constructor(private httpClient: HttpClient) {
  }

  signIn(username: string, password: string): boolean {
    let request: LoginRequest = {username: username, passwprd: password};
    let result: boolean = false;

    this.httpClient.post<TokenResponse>(AuthService.SIGN_IN_URL, request, {observe: 'response'}).pipe()
      .subscribe(res => {
        if(res.status === 200 && res.body){
          localStorage.setItem('access_token', res.body.accessToken);
          localStorage.setItem('refresh_token', res.body.refreshToken);
          result = true;
        }
      });
    return result;
  }

  signUp(){

  }

  refresh(){
    let refreshToken = localStorage.getItem('refresh_token');

    this.httpClient.post<TokenResponse>(AuthService.REFRESH_URL, refreshToken).pipe()
      .subscribe(res => {
        localStorage.setItem('access_token', res.accessToken)
        localStorage.setItem('refresh_token', res.refreshToken)
      });
  }
}
