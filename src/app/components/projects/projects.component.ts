import { Component, inject } from '@angular/core';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { Router, RouterModule } from '@angular/router';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzModalModule, NzModalService } from 'ng-zorro-antd/modal';
import { CreateProjectModalComponent } from './create-project-modal/create-project-modal.component';
import { CategoryModalComponent } from './category-modal/category-modal.component';
@Component({
  selector: 'app-projects',

  imports: [NzCardModule, NzButtonModule, NzModalModule, NzDropDownModule, RouterModule],
  templateUrl: './projects.component.html',
  styleUrl: './projects.component.less'
})
export class ProjectsComponent {
  private modalSvc = inject(NzModalService);
  private router = inject(Router);

  createProject() {
    this.modalSvc.create<CreateProjectModalComponent>({
      nzTitle: "Create Project",
      nzContent: CreateProjectModalComponent,
      nzFooter: null
    });
  }

  createCategory() {
    this.modalSvc.create<CategoryModalComponent>({
      nzTitle: "Create Category",
      nzContent: CategoryModalComponent,
      nzFooter: null
    });
  }

  getTasks() {
    this.router.navigate(['projects/tasks']);
  }
}
