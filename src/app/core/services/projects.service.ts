import { inject, Injectable, signal } from "@angular/core";
import { HttpService } from "./http.service";
import { map } from "rxjs";
import { Projects } from "../../components/projects.model";
import { API } from "../constants/api.constants";


@Injectable({
  providedIn: 'root'
})

export class ProjectService {
  private http = inject(HttpService);
  projectSignal = signal<any>({ data: [], isLoading: false })
  constructor() { }

  getProjects() {
    this.projectSignal.set({ ...this.projectSignal(), isLoading: true });
    this.http.get(API.Projects.get).pipe(map(res => res.data)).subscribe((data) => this.projectSignal.set({ data, isLoading: false }));
  }

  createProject(params: any) {
    this.projectSignal.set({ ...this.projectSignal(), isLoading: true });
    this.http.post(API.Projects.project, params).pipe(map(res => res.data)).subscribe((data) => {
      this.getProjects();
    });
  }

  updateProject(params: any) {
    return this.http.post(API.Projects.project, params).pipe(map(res => res.data));
  }

  deleteProject(id: string) {
    return this.http.delete(API.Projects.project, { idEncrypted: id }).pipe(map(res => res.data));
  }

  uploadFile(file: any) {
    console.log(file);
    return this.http.post(API.Upload.upload, { file }).pipe(map(res => res));
  }
}