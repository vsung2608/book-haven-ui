import { Component } from '@angular/core';
import {RouterOutlet} from '@angular/router';

@Component({
  selector: 'app-auth-layout',
  imports: [
    RouterOutlet
  ],
  templateUrl: './auth-layout.component.html',
  standalone: true,
  styleUrl: './auth-layout.component.css'
})
export class AuthLayoutComponent {

}
