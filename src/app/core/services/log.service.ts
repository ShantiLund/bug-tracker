import { Injectable, inject } from '@angular/core';
import { EnvService } from './env.service';
import { LogLevel } from '../constants/app.constant';


@Injectable({
  providedIn: 'root'
})
export class LogService {

  private env = inject(EnvService);

  private error(...messages: any) {
    console.log('🔴', messages);
  }

  private warning(...messages: any) {
    console.log('🟡', messages);
  }

  private info(...messages: any) {
    console.log('🔵', messages);
  }

  log(level: LogLevel, ...messages: any) {
    if (this.env.logLevel < level) return;
    switch (level) {
      case LogLevel.Error:
        this.error(messages);
        break;
      case LogLevel.Warn:
        this.warning(messages);
        break;
      case LogLevel.Info:
        this.info(messages);
    }
  }
}
