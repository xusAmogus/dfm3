import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HttpInterceptorService implements HttpInterceptor {

  constructor() { }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
      
      if (!req.headers.has('withCredentials')) {
        const request = req.clone({
          withCredentials: true,         
        });
        return next.handle(request);
      }
      
      return next.handle(req);    
  }
}