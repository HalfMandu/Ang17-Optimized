import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpResponse,
} from '@angular/common/http';
import { Observable, of, tap } from 'rxjs';

// Basic working version of Caching Interceptor
@Injectable()
export class CacheInterceptor implements HttpInterceptor {

  private cache = new Map<string, any>();

  //implementing intercept
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {

    console.log('Caching Interceptor...');
    
    // Only cache GET requests
    if (req.method !== 'GET') {
      return next.handle(req);
    }

    const cachedResponse = this.cache.get(req.urlWithParams);

    //Found in the Cache
    if (cachedResponse) {
      console.log('Retrieving from cache instead of HTTP...');
      return of(cachedResponse); // Serve from cache
    }

    return next.handle(req).pipe(
      tap((event) => {
        if (event instanceof HttpResponse) {
          this.cache.set(req.urlWithParams, event);   // Cache the new response
        }
      })
    );
  }
}
