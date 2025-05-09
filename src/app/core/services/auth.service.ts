import { inject, Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { map, tap } from 'rxjs';
import { updateAuthToken } from '../repos/auth.repository';
import { updateUserDetail, UserProps } from '../repos/user.repository';
import { HttpService } from './http.service';
import { getRegistry } from '@ngneat/elf';
import { LoginReqBody } from '../model/api.model';
import { API } from '../constants/api.constants';
import { clearRequestsResult } from '@ngneat/elf-requests';

const helper = new JwtHelperService();

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private http = inject(HttpService);

  constructor() { }

  login(body: LoginReqBody) {

    return this.http.post(API.Identity.login, body)
      .pipe(
        map((res) => ({ token: res.data.token })),
        tap(updateAuthToken),
        map(data => {
          let user: UserProps['detail'] = null;
          if (data.token) {
            user = helper.decodeToken(data.token)
          };
          return user;
        }),
        tap(updateUserDetail)
      );
  }
  resetCachedStores() {
    getRegistry().forEach(store => {
      if (store.name == 'validationMessages') return;
      store.reset();
    });

    clearRequestsResult();
  }

  getAllUsers() {
    return this.http.get(API.Users.users).pipe(map(res => res.data));
  }
}
