import { Routes } from '@angular/router';
import { TasksComponent } from './components/projects/tasks/tasks.component';

export const routes: Routes = [
  {
    path: 'projects',
    loadComponent: () => import('./components/projects/projects.component').then(x => x.ProjectsComponent),
  },
  {
    path: 'tasks',
    loadComponent: () => import('./components/projects/tasks/tasks.component').then(x => x.TasksComponent),
  }
];
