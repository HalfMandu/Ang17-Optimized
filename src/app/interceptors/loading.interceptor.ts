import { HttpRequest, HttpEvent, HttpHandler, HttpContextToken, HttpInterceptor } from '@angular/common/http';
import { LoadingService } from '../services/loading.service';
import { Observable, finalize } from 'rxjs';
import { Injectable } from '@angular/core';

export const SkipLoading = 
  new HttpContextToken<boolean>(() => false);

@Injectable()
export class LoadingInterceptor 
    implements HttpInterceptor {
  constructor(private loadingService: LoadingService) {
  }

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    // Check for a custom attribute 
    // to avoid showing loading spinner
    if (req.context.get(SkipLoading)) {
      // Pass the request directly to the next handler
      return next.handle(req);
    }

    // Turn on the loading spinner
    this.loadingService.loadingOn();

    return next.handle(req).pipe(
      finalize(() => {
        // Turn off the loading spinner
        this.loadingService.loadingOff();
      })
    );
  }
}
