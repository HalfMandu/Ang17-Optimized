import { finalize, tap } from 'rxjs';
import { Injectable } from '@angular/core';
// import { HttpInterceptor, HttpClient, HttpErrorResponse } from '@angular/common/http';
import {
  HttpEvent,
  HttpHeaders,
  HttpInterceptor,
  HttpResponse,
  HttpErrorResponse,
  HttpHandler,
  HttpRequest,
} from '@angular/common/http';
import { MessageService } from '../services/message.service';

//Using Injectable Class (implementing HttpInterceptor) instead of exported const
//maybe just < Ang 17
@Injectable()
export class LoggingInterceptor3 implements HttpInterceptor {
  constructor(private messenger: MessageService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    const started = Date.now();
    let ok: string;

    console.log('INTERCEPTER 3');

    // extend server response observable with logging...error is an HttpErrorResponse
    return next.handle(req).pipe(
      tap({
        next: (event) =>
          (ok = event instanceof HttpResponse ? 'succeeded' : ''),
        error: (_error) => (ok = 'failed'), 
      }),
      // Log when response observable either completes or errors
      finalize(() => {
        const elapsed = Date.now() - started;
        const msg = `${req.method} "${req.urlWithParams}"
             ${ok} in ${elapsed} ms.`;
        this.messenger.add(msg);
        console.log('Final message: ' + msg);
      })
    );
  }
}

//Intercept both outgoing and returning HTTP calls
// @Injectable()
// export class LoggingInterceptor3 implements HttpInterceptor {
//   constructor() {}

//   intercept(
//     request: HttpRequest<any>,
//     next: HttpHandler
//   ): Observable<HttpEvent<any>> {
//     console.log('Outgoing HTTP request', request);
//     return next.handle(request).pipe(
//       tap((event: HttpEvent<any>) => {
//         console.log('Incoming HTTP response', event);
//       })
//     );
//   }
// }
