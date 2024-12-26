import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', loadComponent: () => import('./components/projects/projects.component').then(x => x.ProjectsComponent) }
];
