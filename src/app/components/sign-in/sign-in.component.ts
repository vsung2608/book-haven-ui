import {Component, ElementRef, ViewChild} from '@angular/core';
import {Router, RouterLink} from '@angular/router';
import {InputTextModule} from 'primeng/inputtext';
import {FloatLabelModule} from 'primeng/floatlabel';
import {PasswordModule} from 'primeng/password';
import {AuthService} from '../../services/auth/auth.service';
import {ToastModule} from 'primeng/toast';
import {FormsModule} from '@angular/forms';

@Component({
    selector: 'app-sign-in',
    imports: [RouterLink, InputTextModule, FloatLabelModule, PasswordModule, ToastModule],
    templateUrl: './sign-in.component.html',
    styleUrl: './sign-in.component.css'
})
export class SignInComponent {
  @ViewChild('email') username?: ElementRef;
  @ViewChild('password') password?: ElementRef

  constructor(private authService: AuthService, private router: Router) {
  }

  onClick(){
    this.authService.signIn(this.username?.nativeElement.value, this.password?.nativeElement.value);
    this.router.navigateByUrl("/");
  }
}
