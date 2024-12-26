import { Component, inject } from '@angular/core';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzInputModule } from 'ng-zorro-antd/input';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { NzModalModule, NzModalRef } from 'ng-zorro-antd/modal';

@Component({
  selector: 'app-create-project-modal',
  standalone: true,
  imports: [NzFormModule, NzButtonModule, NzModalModule, NzInputModule, ReactiveFormsModule],
  templateUrl: './create-project-modal.component.html',
  styleUrl: './create-project-modal.component.css'
})
export class CreateProjectModalComponent {
  readonly modal = inject(NzModalRef);
  form: FormGroup = new FormGroup({
    name: new FormControl(null, [Validators.required, Validators.maxLength(100)])
  })

  cancel() {
    this.modal.destroy();
  }
}
