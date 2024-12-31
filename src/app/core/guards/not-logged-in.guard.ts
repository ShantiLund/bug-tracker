import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { userQ } from '../repos/user.repository';

export const notLoggedInGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  if (!userQ()) return true;
  return router.navigate(['']);
};
