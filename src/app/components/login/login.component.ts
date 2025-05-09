import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzSelectModule } from 'ng-zorro-antd/select';
// import { ValidationMessagePipe } from '../../../core/pipes/validation-messages.pipe';
// import { AuthService } from '../../../core/services/auth.service';
import { finalize } from 'rxjs';
import { AuthService } from '../../core/services/auth.service';
import { ValidationMessagePipe } from '../../core/pipes/validation-messages.pipe';
import { updateValidationMessages } from '../../core/repos/validation-messages.repository';
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    NzFormModule,
    NzSelectModule,
    NzInputModule,
    NzIconModule,
    NzButtonModule,
    ValidationMessagePipe
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.less'
})
export class LoginComponent {
  private router = inject(Router);
  private authSvc = inject(AuthService);
  // private idleStateSvc = inject(IdleStateService);

  isSessionExpired: boolean = false;

  loading = { orgs: false, submit: false };
  isVisible = false;

  loginForm = new FormGroup({
    email: new FormControl('', { nonNullable: true, validators: [Validators.required, Validators.email] }),
    password: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
    role: new FormControl({ value: "admin", disabled: true }, { nonNullable: true }),
  });

  async ngOnInit() {

  }

  submit() {
    for (const i in this.loginForm.controls) {
      this.loginForm.get(i)?.markAsDirty();
      this.loginForm.get(i)?.updateValueAndValidity();
    }
    if (this.loginForm.invalid) return;
    this.loading.submit = true;
    this.authSvc.login(this.loginForm.getRawValue())
      .pipe(finalize(() => {
        this.loading.submit = false;
      }))
      .subscribe((res) => {
        this.redirectToUrl();
      });
  }

  redirectToUrl() {
    this.router.navigate(['projects']);
  }
}
