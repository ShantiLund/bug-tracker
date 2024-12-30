import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzSpinModule } from 'ng-zorro-antd/spin';

@Component({
  selector: 'app-spinner',
  standalone: true,
  imports: [
    CommonModule,
    NzSpinModule,
    NzIconModule
  ],
  templateUrl: './spinner.component.html',
  styleUrl: './spinner.component.less',
})
export class SpinnerComponent {
  @Input() fontSize = 24;
  @Input({ transform: (a: string) => typeof a == 'string' }) overlay = false;
  @Input({ transform: (a: string) => typeof a == 'string' }) centered = false;
}
