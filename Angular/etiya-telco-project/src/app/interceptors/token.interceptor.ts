import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService) {}

  //* EGER AUTHENTICATED BIR KULLANICI VARSA HTTP ISTEKLERINE
  //* TOKENI HEADER OLARAK EKLE
  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    if (this.authService.isAuthenticated) {
      const modifiedRequest = request.clone({
        headers: request.headers.append(
          'Authorization',
          `Bearer ${this.authService.jwtToken}`
        ),
      });
      return next.handle(modifiedRequest);
    }
    return next.handle(request);
  }
}
