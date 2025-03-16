import {AfterViewInit, Component, HostListener, OnInit} from '@angular/core';
import {FooterComponent} from '../../components/user/footer/footer.component';
import {HeaderComponent} from '../../components/user/header/header.component';
import {RouterOutlet} from '@angular/router';
import AOS from 'aos';
import Swiper from 'swiper';

@Component({
  selector: 'app-main-layout',
  imports: [FooterComponent, HeaderComponent, RouterOutlet],
  templateUrl: './main-layout.component.html',
  standalone: true,
  styleUrl: './main-layout.component.css'
})
export class MainLayoutComponent implements OnInit, AfterViewInit{
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
