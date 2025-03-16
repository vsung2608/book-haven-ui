import {Component} from '@angular/core';
import {RouterLink} from '@angular/router';
import {InputTextModule} from 'primeng/inputtext';
import {FloatLabelModule} from 'primeng/floatlabel';
import {PasswordModule} from 'primeng/password';
import {AuthService} from '../../services/auth/auth.service';
import {FormsModule} from '@angular/forms';

@Component({
    selector: 'app-sign-in',
    imports: [RouterLink, InputTextModule, FloatLabelModule, PasswordModule, FormsModule],
    templateUrl: './sign-in.component.html',
    styleUrl: './sign-in.component.css'
})
export class SignInComponent {
  username: string = '';
  password: string = '';

  constructor(private authService: AuthService) {
  }

  onClick(){

  }


}
