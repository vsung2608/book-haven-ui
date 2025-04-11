import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {LoginRequest, RegisterRequest, TokenResponse} from '../../model/Auth';
import {Observable, tap} from 'rxjs';

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

  signIn(username: string, password: string) {
    let request: LoginRequest = {username: username, passwprd: password};
    let result: boolean = false;

    this.httpClient.post<TokenResponse>(AuthService.SIGN_IN_URL, request).pipe()
      .subscribe(res => this.saveTokens(res));
  }

  signUp(data: RegisterRequest){
    this.httpClient.post(AuthService.SIGN_UP_URL, data);
  }

  signOut(){
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    localStorage.removeItem('expires_at')
  }

  refresh(): Observable<TokenResponse>{
    let refreshToken = this.getRefreshToken()

    return this.httpClient.post<TokenResponse>(AuthService.REFRESH_URL, refreshToken).pipe(
      tap(res => this.saveTokens(res))
    )
  }

  saveTokens(data: TokenResponse){
    localStorage.setItem('access_token', data.accessToken);
    localStorage.setItem('refresh_token', data.refreshToken);
    localStorage.setItem('expires_at', (Date.now() + data.expiresIn * 1000).toString());
  }

  getAccessToken(): string | null{
    return localStorage.getItem('access_token')
  }

  getRefreshToken(): string | null{
    return localStorage.getItem('refresh_token')
  }

  getTokenExpiration(): number{
    return Number(localStorage.getItem('expires_at')) || 0
  }

  isTokenExpired(): boolean{
    return Date.now() >= this.getTokenExpiration()
  }
}
