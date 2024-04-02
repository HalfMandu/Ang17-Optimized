import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
} from '@angular/common/http';
import { tap } from 'rxjs/operators';

//Measure and log the time taken for each HTTP request...helps find bottlenecks
@Injectable()
export class RequestTimingInterceptor implements HttpInterceptor {

  intercept(request: HttpRequest<any>, next: HttpHandler) {

    const startTime = Date.now();
    return next.handle(request).pipe(
      tap(() => {
        const endTime = Date.now();
        const duration = endTime - startTime;
        console.log(`Request to ${request.url} took ${duration}ms`);
      })
    );
  }
  
}
