import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { notLoggedInGuard } from './core/guards/not-logged-in.guard';
import { userGuard } from './core/guards/user.guard';

export const routes: Routes = [
  {
    path: '',
    canActivate: [userGuard],
    loadComponent: () => import('./components/dashboard/dashboard.component').then(x => x.DashboardComponent),
    children: [
      {
        path: 'projects',
        loadComponent: () => import('./components/projects/projects.component').then(x => x.ProjectsComponent),
      },
      {
        path: 'tasks',
        loadComponent: () => import('./components/projects/tasks/tasks.component').then(x => x.TasksComponent),
      }
    ]
  },
  {
    path: 'login',
    canActivate: [notLoggedInGuard],
    component: LoginComponent
  },
];
