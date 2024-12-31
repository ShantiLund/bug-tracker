import { inject, Injectable } from '@angular/core';
import { NzNotificationService } from 'ng-zorro-antd/notification';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  private notification = inject(NzNotificationService);

  success(message: string, debug = false) {
    this.notification.success('', message, { nzClass: { 'mtfx-notification': true, 'mtfx-notification-success': true, }, nzDuration: debug ? 0 : 4500 });
  }

  warning(message: string, debug = false) {
    this.notification.warning('', message, { nzClass: { 'mtfx-notification': true, 'mtfx-notification-warning': true, }, nzDuration: debug ? 0 : 4500 });
  }

  error(message: string, debug = false) {
    this.notification.error('', message, { nzClass: { 'mtfx-notification': true, 'mtfx-notification-error': true, }, nzDuration: debug ? 0 : 4500 });
  }
}
