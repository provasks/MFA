import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { AuthenticationService } from './authentication.service';
import { UtilityService } from './utility.service';


@Injectable({
  providedIn: 'root'
})
export class AuthIntercepterService implements HttpInterceptor {
  constructor(private authService: AuthenticationService, private utility: UtilityService) { }
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    request = this.getRequest(sessionStorage.getItem('pmPlannerAccessToken'), request);
    return next.handle(request)
  }


  private getRequest(token: string, request: HttpRequest<any>) {
    request = request.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });
    return request;
  }

  ngOnDestroy() {
  }
}
