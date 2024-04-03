import { HttpRequest, HttpEvent, HttpHandler, HttpContextToken, HttpInterceptor } from '@angular/common/http';
import { LoadingService } from '../services/loading.service';
import { Observable, finalize } from 'rxjs';
import { Injectable } from '@angular/core';

export const SkipLoading = new HttpContextToken<boolean>(() => false);

/* 
Global Spinner (Angular Material)
Interceptor uses LoadingService to access Observable
Toggles loading-indicator on/off at the beginning/end of each intercepted request
*/
@Injectable()
export class LoadingInterceptor implements HttpInterceptor {

  constructor(private loadingService: LoadingService) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    
    // Check for custom attribute to avoid showing loading spinner
    if (req.context.get(SkipLoading)) {
      return next.handle(req);  // Pass the request directly to the next handler
    }

    this.loadingService.loadingOn();

    return next.handle(req).pipe(
      finalize(() => {
        setTimeout(() => {
          console.log("Delayed for 1/2 second to display loading spinner...");
          this.loadingService.loadingOff();
        }, 500);
      })
    );
  }
}
