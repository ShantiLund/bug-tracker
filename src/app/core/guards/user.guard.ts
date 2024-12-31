import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { userQ } from '../repos/user.repository';

export const userGuard: CanActivateFn = (route, state) => {
	const router = inject(Router);
	const user = userQ();

	if (user) return true;

	const url: string = state.url;
	return router.createUrlTree(['login'], {
		queryParams: {
			redirect: url,
		},
	});
};
