import { Component, inject } from '@angular/core';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { CommonModule } from '@angular/common';
import { NzPopconfirmModule } from 'ng-zorro-antd/popconfirm';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { Router, RouterModule } from '@angular/router';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { cancelled$ } from '../../core/repos/auth.repository';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-menu',

  imports: [NzMenuModule, NzIconModule, NzDividerModule, NzDropDownModule, RouterModule, NzPopconfirmModule, CommonModule],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.less'
})
export class MenuComponent {
  private router = inject(Router);
  private authSvc = inject(AuthService);

  logOut() {
    cancelled$.next(true);
    this.authSvc.resetCachedStores();
    this.router.navigate(['login']);
  }

  cancel() {

  }
}
