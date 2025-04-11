import {Component, ElementRef, ViewChild} from '@angular/core';
import {Router, RouterLink} from '@angular/router';
import {InputTextModule} from 'primeng/inputtext';
import {FloatLabelModule} from 'primeng/floatlabel';
import {AuthService} from '../../services/auth/auth.service';
import {RegisterRequest} from '../../model/Auth';

@Component({
  selector: 'app-sig-up',
  imports: [RouterLink, InputTextModule, FloatLabelModule],
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.css'
})
export class SignUpComponent {
  @ViewChild('firstName') firstName?: ElementRef;
  @ViewChild('lastName') lastName?: ElementRef;
  @ViewChild('username') username?: ElementRef;
  @ViewChild('email') email?: ElementRef;
  @ViewChild('password') password?: ElementRef;

  constructor(private authService: AuthService, private router: Router) {
  }

  onClick(){
    let data: RegisterRequest = {
      firstName: this.firstName?.nativeElement.value,
      lastName: this.lastName?.nativeElement.value,
      username: this.username?.nativeElement.value,
      email: this.email?.nativeElement.value,
      password: this.password?.nativeElement.value
    };

    this.authService.signUp(data);
    this.router.navigateByUrl('/sign-in');
  }
}
