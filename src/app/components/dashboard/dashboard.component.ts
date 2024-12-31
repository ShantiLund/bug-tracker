import { Component } from '@angular/core';
import { SideBarComponent } from '../menu/side-bar/side-bar.component';
import { MenuComponent } from '../menu/menu.component';
import { NzLayoutModule } from 'ng-zorro-antd/layout'
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  imports: [NzLayoutModule, MenuComponent, SideBarComponent, RouterModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.less'
})
export class DashboardComponent {

}
