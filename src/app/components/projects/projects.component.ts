import { Component, effect, inject, OnInit, Signal } from '@angular/core';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { Router, RouterModule } from '@angular/router';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzModalModule, NzModalService } from 'ng-zorro-antd/modal';
import { CreateProjectModalComponent } from './create-project-modal/create-project-modal.component';
import { CategoryModalComponent } from './category-modal/category-modal.component';
import { ProjectService } from '../../core/services/projects.service';
import { NzGridModule } from 'ng-zorro-antd/grid';
@Component({
  selector: 'app-projects',

  imports: [NzCardModule, NzGridModule, NzButtonModule, NzModalModule, NzDropDownModule, RouterModule],
  templateUrl: './projects.component.html',
  styleUrl: './projects.component.less'
})
export class ProjectsComponent implements OnInit {
  private modalSvc = inject(NzModalService);
  private router = inject(Router);
  posts: Signal<any> = this.projectSvc.projectSignal;;

  constructor(private projectSvc: ProjectService) {
    effect(() => {
      console.log('Loading:', this.posts().isLoading);
      console.log('Projects:', this.posts().data);
    });
  }
  ngOnInit(): void {
    this.projectSvc.getProjects();

    // Effect to watch for changes

  }

  createProject() {
    this.modalSvc.create<CreateProjectModalComponent>({
      nzTitle: "Create Project",
      nzContent: CreateProjectModalComponent,
      nzFooter: null
    });
  }

  createCategory(item: any) {
    this.modalSvc.create<CategoryModalComponent>({
      nzTitle: "Create Category",
      nzContent: CategoryModalComponent,
      nzData: { name: item.name },
      nzFooter: null
    });
  }

  getTasks() {
    this.router.navigate(['projects/tasks']);
  }
}
