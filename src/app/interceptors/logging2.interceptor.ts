import { HttpEvent, HttpInterceptorFn } from '@angular/common/http';
import { tap } from 'rxjs';

//Intercept both outgoing and returning HTTP calls
//Adjusting HTTP Headers in this example
export const LoggingInterceptor2: HttpInterceptorFn = (req, next) => {

  console.log('Logging Interceptor 2');
  console.log(req);
  // const token = localStorage.getItem('token');
  const token = 'sometoken';
  //   const authReq = req.clone({
  //     headers: req.headers.set(
  //       'Authorization',
  //       `Bearer
  // ${token}`
  //     ),
  //   });
  const authReq = req.clone({
    headers: req.headers.set('Authorization', 'Bearer '),
  });
  console.log('Modifying Authorization Header, adding Bearer Token:');
  console.log(authReq);
  return next(authReq).pipe(
    tap((event: HttpEvent<any>) => {
      console.log('Incoming HTTP response', event);
    })
  );
  // return next(authReq);    //can use this if no need to intercept incoming response...
};
