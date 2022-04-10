import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpEvent, HttpResponse, HttpRequest, HttpHandler } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, filter } from 'rxjs/operators';

@Injectable()
export class UserDataInterceptor implements HttpInterceptor {
  intercept(httpRequest: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(httpRequest).pipe(
      filter(event => event instanceof HttpResponse && httpRequest.url.includes('/api/user/login')),
      map((event: HttpResponse<any>) => {
        localStorage.setItem("gecdi.user.data",JSON.stringify(event.body));
        return event;
      })
    );
  }
}
