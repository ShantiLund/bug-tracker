import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpResponse } from '../model/api.model';
import { EnvService } from './env.service';

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  private env = inject(EnvService);
  private http = inject(HttpClient)
  private api = this.env.apiUrl;
  constructor() { }

  get(route: string, params: { [key: string]: string | boolean | number; } = {}) {
    return this.http.get<HttpResponse>(`${this.api}${route}`, { params });
  }

  post(route: string, body: any, params: { [key: string]: string | boolean | number; } = {}) {
    return this.http.post<HttpResponse>(`${this.api}${route}`, body, { params });
  }

  put(route: string, body: any, params: { [key: string]: string | boolean | number; } = {}) {
    return this.http.put<HttpResponse>(`${this.api}${route}`, body, { params });
  }

  delete(route: string, params: { [key: string]: string | boolean | number; }, body: any = {}) {
    return this.http.delete<HttpResponse>(`${this.api}${route}`, { params, body });
  }
}
