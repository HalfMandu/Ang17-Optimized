import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';

// Cach Service which assists CacheInterceptor2
// This approach allows more control over the cache 
// E.g. 10 seconds TTL for cache 

@Injectable()
export class RequestCacheService {
  private cache = new Map<string, [Date, HttpResponse<any>]>();

  get(key: any): any {
    console.log('GETTING...');

    const tuple = this.cache.get(key);
    if (!tuple) return null;

    const expires = tuple[0];
    const httpResponse = tuple[1];

    // Don't observe expired keys
    const now = new Date();
    if (expires && expires.getTime() < now.getTime()) {
      this.cache.delete(key);
      return null;
    }

    return httpResponse;
  }

  set(key: any, value: any, ttl = null) {
    console.log('SETTING...');
    if (ttl) {
      const expires = new Date();
      expires.setSeconds(expires.getSeconds() + ttl);
      this.cache.set(key, [expires, value]);
    } else {
      this.cache.set(key, [new Date(), value]);
    }
  }
}
