import {AfterViewInit, Component, HostListener, OnInit} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {HeaderComponent} from '../../components/user/header/header.component';
import {FooterComponent} from '../../components/user/footer/footer.component';
import {HomePageComponent} from '../../components/user/pages/home-page/home-page.component';
import Swiper from 'swiper';
import AOS from 'aos';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, FooterComponent, HomePageComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit, AfterViewInit {
  title: string = "book-haven";

  ngOnInit(): void {
    this.initMobileNav();
    this.initScrollEvents();
  }

  ngAfterViewInit(): void {
    this.initPreloader();
    this.initAOS();
    this.initSwiper();
  }

  /**
   * Toggle mobile nav
   */
  private initMobileNav(): void {
    const mobileNavToggleBtn = document.querySelector('.mobile-nav-toggle') as HTMLElement | null;
    if (mobileNavToggleBtn) {
      mobileNavToggleBtn.addEventListener('click', () => {
        document.body.classList.toggle('mobile-nav-active');
        mobileNavToggleBtn.classList.toggle('bi-list');
        mobileNavToggleBtn.classList.toggle('bi-x');
      });
    }
  }

  /**
   * Preloader logic
   */
  private initPreloader(): void {
    const preloader = document.querySelector('#preloader');
    if (preloader) {
      window.addEventListener('load', () => preloader.remove());
    }
  }

  /**
   * Handle scroll events
   */
  @HostListener('window:scroll', [])
  private onWindowScroll(): void {
    const scrollTop = document.querySelector('.scroll-top');
    if (scrollTop) {
      window.scrollY > 100 ? scrollTop.classList.add('active') : scrollTop.classList.remove('active');
    }
  }

  private initScrollEvents(): void {
    document.addEventListener('scroll', () => this.onWindowScroll());
  }

  /**
   * Initialize animations
   */
  private initAOS(): void {
    AOS.init({ duration: 600, easing: 'ease-in-out', once: true, mirror: false });
  }

  /**
   * Initialize Swiper
   */
  private initSwiper(): void {
    document.querySelectorAll(".init-swiper").forEach(swiperElement => {
      const config = JSON.parse(swiperElement.querySelector(".swiper-config")!.innerHTML.trim());
      new Swiper(swiperElement as HTMLElement, config);
    });
  }
}
