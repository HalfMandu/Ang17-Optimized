import { Injectable } from "@angular/core";
import { HttpEvent, HttpResponse } from "@angular/common/http";
import { RequestCacheService } from "../services/requestCache.service";
import { Observable, of, tap } from "rxjs";

import {
  HttpRequest,
  HttpHandler,
  HttpInterceptor
} from "@angular/common/http";


// This version of the Cache Interceptor uses a Cahce Service to help assist
// The Cache Service allows for more in-depth control on the cache, otherwise this approach is same
// TTl = 10 seconds....Cache lasts for 10 seconds then expires/deletes

const TTL: any = 10;

@Injectable()
export class CacheInterceptor2 implements HttpInterceptor {
  
  constructor(private cache: RequestCacheService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    const cachedResponse = this.cache.get(req.url);
    return cachedResponse
      ? of(cachedResponse)
      : this.sendRequest(req, next);
  }

  sendRequest(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    
    return next.handle(req).pipe(
      tap(event => {
        if (event instanceof HttpResponse) {
          // this.cache.set(req.urlWithParams, event);   // Cache the new response
          this.cache.set(req.url, event, TTL);
        }
      })
    );

  }
}
