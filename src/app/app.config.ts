import { ApplicationConfig, inject, provideAppInitializer } from '@angular/core';
import { provideRouter, withComponentInputBinding, withInMemoryScrolling } from '@angular/router';
import { provideAnimations } from '@angular/platform-browser/animations';
import { HttpClient, provideHttpClient, withInterceptors } from '@angular/common/http';
import { en_US, provideNzI18n } from 'ng-zorro-antd/i18n';
import { routes } from './app.routes';
import { authInterceptor } from './core/interceptors/auth.interceptor';
import { errorInterceptor } from './core/interceptors/error.interceptor';
import { EnvServiceProvider } from './core/services/env.service';
import { firstValueFrom, take, tap, finalize, catchError, throwError } from 'rxjs';
import { ValidationMessagesProps, updateValidationMessages } from './core/repos/validation-messages.repository';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes, withComponentInputBinding(), withInMemoryScrolling({ scrollPositionRestoration: 'top' })),
    EnvServiceProvider,
    provideNzI18n(en_US),
    provideAnimations(),
    provideAppInitializer(() => {
      const initializerFn = (initializeApp)(inject(HttpClient));
      return initializerFn();
    }),
    provideHttpClient(withInterceptors([authInterceptor, errorInterceptor])),

  ]
};
export function initializeApp(http: HttpClient): () => Promise<any> {
  return () => new Promise<any>((resolve: any) => firstValueFrom(http.get<ValidationMessagesProps>('/assets/i18n/en.json')
    .pipe(
      take(1),
      tap(updateValidationMessages),
      finalize(() => resolve(null)),
      catchError(err => {
        return throwError(() => err);
      })
    ))
  );
}


