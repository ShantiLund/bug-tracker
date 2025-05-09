import { inject, Injectable, signal } from "@angular/core";
import { HttpService } from "./http.service";
import { map } from "rxjs";
import { API } from "../constants/api.constants";


@Injectable({
  providedIn: 'root'
})

export class CategoryService {
  private http = inject(HttpService);
  categorySignal = signal<any>({ data: [], isLoading: false })
  constructor() { }

  getCategories() {
    this.categorySignal.set({ ...this.categorySignal(), isLoading: true });
    this.http.get(API.Categories.categories).pipe(map(res => res.data)).subscribe((data) => this.categorySignal.set({ data, isLoading: false }));
  }

  createCategory(params: any) {
    this.categorySignal.set({ ...this.categorySignal(), isLoading: true });
    this.http.post(API.Categories.categories, params).pipe(map(res => res.data)).subscribe((data) => {
      console.log('Category created:', data);
    });
  }

  updateCategory(params: any) {
    return this.http.post(API.Projects.project, params).pipe(map(res => res.data));
  }

  deleteCategory(id: string) {
    return this.http.delete(API.Projects.project, { idEncrypted: id }).pipe(map(res => res.data));
  }
}