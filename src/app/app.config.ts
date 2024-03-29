import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { loggerInterceptor } from './interceptors/logger.interceptor';
import { LoggingInterceptor2 } from './interceptors/logging2.interceptor';
import { LoggingInterceptor3 } from './interceptors/logging3.interceptor';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import {
  HttpClientModule,
  HttpClient,
  provideHttpClient,
  withInterceptorsFromDi,
  withInterceptors,
} from '@angular/common/http';

import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(withInterceptors([loggerInterceptor, LoggingInterceptor2])),
    // provideHttpClient(withInterceptors([LoggingInterceptor2])),
    // provideHttpClient(withInterceptorsFromDi()),    //DI being phazed out, advised-against...
    {
      provide: HTTP_INTERCEPTORS,
      useClass: LoggingInterceptor3,
      multi: true,
    },
    // {
    //   provide: HTTP_INTERCEPTORS, useClass: LoggingInterceptor, multi: true
    // },
    // HttpClientModule, HttpClient, provideHttpClient()
  ],
};
