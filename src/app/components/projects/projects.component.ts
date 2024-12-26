import { Component, inject } from '@angular/core';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzModalModule, NzModalService } from 'ng-zorro-antd/modal';
import { CreateProjectModalComponent } from './create-project-modal/create-project-modal.component';
import { MenuComponent } from '../menu/menu.component';
@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [NzCardModule, NzButtonModule, NzModalModule, MenuComponent],
  templateUrl: './projects.component.html',
  styleUrl: './projects.component.less'
})
export class ProjectsComponent {
  private modalSvc = inject(NzModalService);

  createProject() {
    this.modalSvc.create<CreateProjectModalComponent>({
      nzTitle: "Create Project",
      nzContent: CreateProjectModalComponent,
      nzFooter: null
    });
  }
}
