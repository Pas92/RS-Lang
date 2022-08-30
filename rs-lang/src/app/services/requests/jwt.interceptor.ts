import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {

  constructor(private authService: AuthService) {
    this.authService.isSignIn$.subscribe(value => {
      this._isSignIn = value
    })
  }

  private _isSignIn: boolean = false

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    console.log(this._isSignIn)
    if (this._isSignIn) {
      const token = localStorage.getItem('userToken')

      request = request.clone({
        setHeaders: { Authorization: `Bearer ${token}` }
      })
    }

    return next.handle(request);
  }
}
