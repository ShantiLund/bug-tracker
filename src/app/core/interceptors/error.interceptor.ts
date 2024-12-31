import { HttpErrorResponse, HttpInterceptorFn, HttpResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { NzModalService } from 'ng-zorro-antd/modal';
import { catchError, tap, throwError } from 'rxjs';
import { cancelled$ } from '../repos/auth.repository';
import { AuthService } from '../services/auth.service';
import { EnvService } from '../services/env.service';
import { NotificationService } from '../services/notification.service';
// import { NotificationService } from '../services/notification.service';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  const router = inject(Router);
  const notification = inject(NotificationService);
  const env = inject(EnvService);
  const authSvc = inject(AuthService);
  // const modalSvc = inject(NzModalService);

  if (env.reqLogging && ['GET', 'POST', 'PUT'].includes(req.method) && !req.url.match('assets')) {
    console.group('%cREQ: ' + req.url, 'color: brown');
    let params = Array.from((req.params as any).map, ([name, value]) => ({ name, value }));
    if (params.length) console.info("%cPARAMS: " + req.params.toString().replaceAll('&', ', '), "color: green");
    console.info("BODY: ", JSON.parse(JSON.stringify(req.body, null, 2)));
    console.groupEnd();
  }

  return next(req).pipe(
    tap((evt) => {
      if (!(evt instanceof HttpResponse)) return;

      if (env.reqLogging && !req.url.match('assets')) {
        console.group('RES: ', evt.url);
        console.info("BODY: ", JSON.parse(JSON.stringify(evt.body)));
        console.groupEnd();
      }
    }),
    catchError((error: HttpErrorResponse) => {
      if (error.status === 401) {
        cancelled$.next(true);
        authSvc.resetCachedStores();
        // modalSvc.closeAll();
        let url = 'login';
        router.navigateByUrl(url);
        notification.error('Session Timed Out.');
        return throwError(() => error);
      }

      let message = '';

      error.error?.messages?.forEach((m: any) => {
        // if (!message) {
        //   message = m?.messageDescription;
        //   return;
        // }
        message = `${message} ${m?.messageDescription}<br>`;
      });

      if (error.error?.data?.error?.details) {
        error.error?.data?.error?.details?.forEach((m: any) => {
          message = `${message} \n ${m.description}`;
        });
      }

      if (error.error?.data?.error?.message) {
        const errorMsg = error.error?.data?.error?.message;
        message = `${message} \n ${errorMsg}`;
      }
      if (message) notification.error(message);

      return throwError(() => error);
    })
  );
};
