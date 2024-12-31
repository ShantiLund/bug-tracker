import { HttpInterceptorFn } from '@angular/common/http';
import { takeUntil } from 'rxjs';
import { cancelled$, tokenQ } from '../repos/auth.repository';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  if (req.headers.has('Authorization')) return next(req);
  const token = tokenQ();
  if (!token) return next(req).pipe(takeUntil(cancelled$));
  return next(req.clone({ setHeaders: { Authorization: `Bearer ${token}` } })).pipe(takeUntil(cancelled$));
};