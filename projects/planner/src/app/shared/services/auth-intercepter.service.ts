import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { BroadcastService, MsalService } from '@azure/msal-angular';
import { AuthenticationService } from './authentication.service';
import { UtilityService } from './utility.service';
import * as Msal from 'msal';
import { msalConfig, tokenRequest } from '../../MSAL.config';


@Injectable({
  providedIn: 'root'
})
export class AuthIntercepterService implements HttpInterceptor {
  tokenSubscription$: any;
  myMSALObj = new Msal.UserAgentApplication(msalConfig);

  constructor(private authService: AuthenticationService, private broadcastService: BroadcastService, private utility: UtilityService) { }
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (!this.authService.isTokenExpired()) {
      request = this.getRequest(sessionStorage.getItem('pmPlannerAccessToken'), request);
      return next.handle(request)
    }
    else {
      this.myMSALObj.acquireTokenSilent(tokenRequest).then(result => {
        this.authService.storeToken(result);
        request = this.getRequest(result.idToken.rawIdToken, request);
        return next.handle(request)
      }).catch(err => {
        this.myMSALObj.acquireTokenPopup(tokenRequest).then(result => {
          this.authService.storeToken(result);
          request = this.getRequest(result.idToken.rawIdToken, request);
          return next.handle(request)
        })
        .catch(err => {
          // this.myMSALObj.loginRedirect();
          this.authService.logout();
        });
      })
    }
  }


  private getRequest(token: string, request: HttpRequest<any>) {
    // const token = result.idToken.rawIdToken;
    request = request.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });
    return request;
  }

  ngOnDestroy() {
    this.utility.unsubscribe(this.tokenSubscription$);
  }
}
