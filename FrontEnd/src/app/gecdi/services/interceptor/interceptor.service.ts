import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest
} from "@angular/common/http";
import { Observable } from "rxjs";
import { Injectable } from "@angular/core";
import { UserService } from "../../services/user/user.service";

@Injectable()
export class JwtHeaderInterceptor implements HttpInterceptor {
  constructor(private userService: UserService) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    // Adiciona a cada chamada de API as headers Authorization Bearer
    if (
      this.userService /*&&
      this.userService.currentUser &&
      this.userService.currentUser.tokens &&
      this.userService.currentUser.tokens.access_token*/
    ) {
      const clonedRequest = req.clone({
        headers: req.headers.set(
          "Authorization",
          `Bearer aaa` //${this.userService.currentUser.tokens.access_token}`
        )
      });
      return next.handle(clonedRequest);

    } else {

      return next.handle(req);

    }
  }
}
