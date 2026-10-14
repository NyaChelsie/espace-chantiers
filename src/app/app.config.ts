import { ApplicationConfig, inject, provideBrowserGlobalErrorListeners } from '@angular/core';
import {
  provideRouter,
  Router,
  withComponentInputBinding,
  withNavigationErrorHandler,
} from '@angular/router';
import { routes } from './app.routes';
import { NotificationService } from './services/notification.service';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(
      routes,
      withComponentInputBinding(),
      withNavigationErrorHandler(() => {
        const router = inject(Router);
        const notification = inject(NotificationService);
        notification.afficher('Une erreur est survenue pendant la navigation', 'erreur');
        router.navigateByUrl('/introuvable');
      }),
    ),
  ],
};
