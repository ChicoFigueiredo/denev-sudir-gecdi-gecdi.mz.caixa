import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest
} from "@angular/common/http";
import { Observable } from "rxjs";
import { Injectable, Injector } from "@angular/core";
import { UserService } from "../../services/user/user.service";
import { NbAuthJWTToken, NbAuthService } from "@nebular/auth";

@Injectable()
export class JwtHeaderInterceptor implements HttpInterceptor {

  private currentToken: string = "";
  //private tokenService : NbAuthJWTToken;
  //private authService: NbAuthService;

  constructor(
    private injector: Injector,
    authService: NbAuthService
  ) {

    //this.tokenService = injector.get(NbAuthJWTToken);
    //this.authService  = injector.get(NbAuthService);

    //this.currentToken = this.tokenService.getValue();

    authService.onTokenChange()
        .subscribe((token: NbAuthJWTToken) => {
          if (token.isValid()) {
            this.currentToken = token.getValue();
          }
        });
  }

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    // Adiciona a cada chamada de API as headers Authorization Bearer
    if ( this.currentToken != "") {
        const clonedRequest = req.clone({
          headers: req.headers.set(
            "Authorization",
            `Bearer ${this.currentToken}` //${this.userService.currentUser.tokens.access_token}`
          )
        });
        return next.handle(clonedRequest);
    } else {
      return next.handle(req);
    }
  }
}
