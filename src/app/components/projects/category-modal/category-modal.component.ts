import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzModalModule, NzModalRef } from 'ng-zorro-antd/modal';
import { NzSelectModule } from 'ng-zorro-antd/select';

@Component({
  selector: 'app-category-modal',
  imports: [NzFormModule, NzSelectModule, NzInputModule, NzButtonModule, NzModalModule, ReactiveFormsModule],
  templateUrl: './category-modal.component.html',
  styleUrl: './category-modal.component.css'
})
export class CategoryModalComponent {
  readonly modal = inject(NzModalRef);
  form: FormGroup = new FormGroup({
    name: new FormControl(null, [Validators.required, Validators.maxLength(100)])
  })

  cancel() {
    this.modal.destroy();
  }
}
