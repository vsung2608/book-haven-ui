import { Component } from '@angular/core';
import {HeaderComponent} from '../../components/admin/header/header.component';
import {SlideBarComponent} from '../../components/admin/slide-bar/slide-bar.component';
import {RouterOutlet} from '@angular/router';

@Component({
  selector: 'app-admin-layout',
  imports: [HeaderComponent, SlideBarComponent, RouterOutlet],
  templateUrl: './admin-layout.component.html',
  styleUrl: './admin-layout.component.css'
})
export class AdminLayoutComponent {

}
