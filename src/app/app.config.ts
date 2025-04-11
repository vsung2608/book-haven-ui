import {ApplicationConfig, provideZoneChangeDetection} from '@angular/core';
import {provideRouter} from '@angular/router';

import {routes} from './app.routes';
import {provideAnimationsAsync} from '@angular/platform-browser/animations/async';
import {providePrimeNG} from 'primeng/config';
import Aura from '@primeng/themes/aura';
import {provideHttpClient, withInterceptors} from '@angular/common/http';
import {authInterceptor} from './config/auth.interceptor';
import {ConfirmationService, MessageService} from 'primeng/api';
import {errorInterceptor} from './config/error.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideAnimationsAsync(),
    MessageService,
    ConfirmationService,
    provideHttpClient(withInterceptors([authInterceptor, errorInterceptor])),
    providePrimeNG({
      theme: {
        preset: Aura
      }
    })
  ]
};
