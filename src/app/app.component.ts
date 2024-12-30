import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { MenuComponent } from './components/menu/menu.component';
import { SideBarComponent } from './components/menu/side-bar/side-bar.component';

@Component({
  selector: 'app-root',

  imports: [RouterOutlet, NzLayoutModule, MenuComponent, SideBarComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.less'
})
export class AppComponent {
  title = 'bug-tracker';
}
