import { HttpInterceptorFn } from '@angular/common/http';

export const demoInterceptor: HttpInterceptorFn = (req, next) => {
  const authToken = localStorage.getItem('token');

  if (authToken) {
    const authReq = req.clone({
      setHeaders: {
        Authorization: `Token ${authToken}`,
      },
    });
    return next(authReq);
  } else {
    return next(req);
  }
};
