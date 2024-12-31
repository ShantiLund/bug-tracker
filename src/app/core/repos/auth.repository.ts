import { JwtHelperService } from '@auth0/angular-jwt';
import { withProps, select, createStore } from '@ngneat/elf';
import { localStorageStrategy, persistState } from '@ngneat/elf-persist-state';
import { Subject } from 'rxjs';
import { take } from 'rxjs/operators';
import { updateUserDetail, UserProps } from './user.repository';

const helper = new JwtHelperService();

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface AuthProps {
	token: string | null;
}

const store = createStore({ name: "mtfx0auth" }, withProps<AuthProps>({ token: null }));

export const token$ = store.pipe(select(state => state.token));
export const tokenQ = () => store.value.token;
export const cancelled$ = new Subject();

export const persist = persistState(store, {
	key: 'mtfx0auth',
	storage: localStorageStrategy,
});

persist.initialized$.pipe(take(1)).subscribe(x => {
	if (x) {
		let token = tokenQ();
		let user: UserProps['detail'] = null;
		if (token) user = helper.decodeToken(token);
		updateUserDetail(user);
	}
});

export function updateAuthToken(data: AuthProps) {
	store.update((state) => ({
		...state,
		...data
	}));
}