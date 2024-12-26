import { Component } from '@angular/core';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { CommonModule } from '@angular/common';
import { NzPopconfirmModule } from 'ng-zorro-antd/popconfirm'

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [NzMenuModule, NzIconModule, NzPopconfirmModule, CommonModule],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.css'
})
export class MenuComponent {
  confirm() {

  }

  cancel() {

  }
}
