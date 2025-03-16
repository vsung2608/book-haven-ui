import { Component } from '@angular/core';
import {RouterLink} from '@angular/router';
import {InputTextModule} from 'primeng/inputtext';
import {FloatLabelModule} from 'primeng/floatlabel';

@Component({
  selector: 'app-sig-up',
  imports: [RouterLink, InputTextModule, FloatLabelModule],
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.css'
})
export class SignUpComponent {

}
