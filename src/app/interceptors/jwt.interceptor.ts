import { Injectable } from '@angular/core';
import {
    HttpHandler,
    HttpRequest,
    HttpInterceptor,
    HttpEvent
  } from '@angular/common/http';
import { Observable } from 'rxjs';

// Using this Interceptor to retrieve a Token from the server
// Add that token to all outgoing HTTP requests

@Injectable()
export class JwtInterceptor implements HttpInterceptor 
{
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> 
  {
    let token = localStorage.getItem('access_token');
    
    if (token) {
    console.log("token found, adding to Header as Bearer...")  
    request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`
        }
      });
    }
    return next.handle(request);
  }
 }
