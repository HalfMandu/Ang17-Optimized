import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import {
  HttpClientModule,
  HttpClient,
  provideHttpClient,
  withInterceptorsFromDi,
  withInterceptors,
} from '@angular/common/http';
import { LoggingInterceptor } from './interceptors/logger.interceptor';
import { LoggingInterceptor2 } from './interceptors/logging2.interceptor';
import { LoggingInterceptor3 } from './interceptors/logging3.interceptor';
import { CacheInterceptor } from './interceptors/cache.interceptor';
import { CacheInterceptor2 } from './interceptors/cache2.interceptor';
import { RequestTimingInterceptor } from './interceptors/request-timing.interceptor';
import { ErrorInterceptor } from './interceptors/error.interceptor';
import { JwtInterceptor } from './interceptors/jwt.interceptor';
import { MessageService } from './services/message.service';
import { RequestCacheService } from './services/requestCache.service';
import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    // provideHttpClient(withInterceptors([LoggingInterceptor2])),    //Angular 17 approach
    provideHttpClient(withInterceptorsFromDi()), //DI being phazed out...but needed for class/Injectable approach
    // {
    //   provide: HTTP_INTERCEPTORS,
    //   useClass: LoggingInterceptor3,
    //   multi: true,
    // },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: LoggingInterceptor,
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: CacheInterceptor,
      multi: true,
    },
    // {
    //   provide: HTTP_INTERCEPTORS,
    //   useClass: CacheInterceptor2,
    //   multi: true,
    // },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: RequestTimingInterceptor,
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ErrorInterceptor,
      multi: true,
    },
    MessageService,
    RequestCacheService,
    // HttpClientModule, HttpClient, provideHttpClient()
  ],
};
