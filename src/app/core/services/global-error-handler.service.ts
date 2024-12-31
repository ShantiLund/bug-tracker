import { ErrorHandler, Injectable } from '@angular/core';

@Injectable()
export class GlobalErrorHandler implements ErrorHandler {

  handleError(error: any): void {
    const chunkFailedMessage = /Loading chunk [\d]+ failed/;

    if (chunkFailedMessage.test(error.message)) {
      window.location.reload();
    }
    // else {
    //   if (this.env.errorLogToApi)
    //     this.http.post(API.Identity.logError, { message: error.message }).pipe(catchError(err => EMPTY)).subscribe();
    //   console.error(error);
    // }
  }
}
