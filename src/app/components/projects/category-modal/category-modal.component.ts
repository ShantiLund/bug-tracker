import { Component, inject, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NZ_MODAL_DATA, NzModalModule, NzModalRef } from 'ng-zorro-antd/modal';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { CategoryService } from '../../../core/services/categories.service';

@Component({
  selector: 'app-category-modal',
  imports: [NzFormModule, NzSelectModule, NzInputModule, NzButtonModule, NzModalModule, ReactiveFormsModule],
  templateUrl: './category-modal.component.html',
  styleUrl: './category-modal.component.css'
})
export class CategoryModalComponent implements OnInit {
  private categorySvc = inject(CategoryService);
  readonly modal = inject(NzModalRef);
  readonly nzModalData: any = inject(NZ_MODAL_DATA);
  @Input() name: string = this.nzModalData.name;
  form: FormGroup = new FormGroup({
    name: new FormControl({ value: this.nzModalData.name ?? null, disabled: true }, [Validators.required, Validators.maxLength(100)]),
    categoryName: new FormControl(null, [Validators.required, Validators.maxLength(200)])
  })

  ngOnInit(): void {
    console.log(this.nzModalData);
    // throw new Error('Method not implemented.');
  }

  submit() {
    if (this.form.invalid) return;
    const value = this.form.getRawValue();
    const req = {
      category_name: value.categoryName,
      role: "admin"
    }
    this.categorySvc.createCategory(req);
    this.modal.destroy();
  }

  cancel() {
    this.modal.destroy();
  }
}
