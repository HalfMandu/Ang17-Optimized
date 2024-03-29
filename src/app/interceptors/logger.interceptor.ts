import { HttpInterceptorFn, HttpRequest } from '@angular/common/http';

//Intercept All outgoing HTTP requests and adjust Headers (add Token)
export const loggerInterceptor: HttpInterceptorFn = (req, next) => {
  console.log('Intercepting outgoing request...');
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
    headers: req.headers.set(
      'Authorization', 'Bearer '),
  });
  console.log('Adjusted request:');
  console.log(authReq);
  return next(authReq);
};
