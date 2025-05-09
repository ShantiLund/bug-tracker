import { Component, inject, OnInit } from '@angular/core';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzInputModule } from 'ng-zorro-antd/input';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { NzModalModule, NzModalRef } from 'ng-zorro-antd/modal';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { ProjectService } from '../../../core/services/projects.service';
import { AuthService } from '../../../core/services/auth.service';
import { lastValueFrom } from 'rxjs';
import { Form } from 'antd';

@Component({
  selector: 'app-create-project-modal',

  imports: [NzFormModule, NzButtonModule, NzModalModule, NzSelectModule, NzInputModule, ReactiveFormsModule],
  templateUrl: './create-project-modal.component.html',
  styleUrl: './create-project-modal.component.css'
})
export class CreateProjectModalComponent implements OnInit {

  readonly modal = inject(NzModalRef);
  private projectSvc = inject(ProjectService);
  private userSvc = inject(AuthService);

  users: any = [];
  isLoading = false;
  form: FormGroup = new FormGroup({
    name: new FormControl(null, [Validators.required, Validators.maxLength(100)]),
    description: new FormControl(null, [Validators.required, Validators.maxLength(100)]),
    users: new FormControl([], [Validators.required])
  })

  ngOnInit(): void {
    this.getUsers();
  }

  async getUsers() {
    this.users = await lastValueFrom(this.userSvc.getAllUsers()).catch(err => [])
  }

  cancel() {
    this.modal.destroy();
  }

  submit() {
    if (this.form.invalid) return;
    const value = this.form.getRawValue();
    console.log(value);
    this.projectSvc.createProject(value);
    this.modal.destroy();
  }
}
