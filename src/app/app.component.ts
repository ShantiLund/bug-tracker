import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NzLayoutModule } from 'ng-zorro-antd/layout';

@Component({
  selector: 'app-root',

  imports: [RouterOutlet, NzLayoutModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.less'
})
export class AppComponent {
  title = 'bug-tracker';
}
