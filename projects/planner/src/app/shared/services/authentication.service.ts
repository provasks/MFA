import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { CryptoUtils, Logger } from 'msal';
import { Subscription } from 'rxjs';
import { UtilityService } from './utility.service';
// import { MsalService } from '@azure/msal-angular';
import { msalConfig } from '../../MSAL.config';
import * as Msal from 'msal';
import { BroadcastService, MsalService } from '@azure/msal-angular';
import { ApiService } from '../../api.service';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  loginSuccessSubscription$: Subscription;
  tokenFailureSubscription$: Subscription;
  tokenSuccessSubscription$: Subscription;
  profileSubcription$: Subscription;


  myMSALObj = new Msal.UserAgentApplication(msalConfig);
  loginSuccessSubscripiton$: Subscription;

  constructor(
    private apiService: ApiService,
    private utility: UtilityService,
    private router: Router,
    private msalService: MsalService,
    private broadcastService: BroadcastService
  ) { }

  init() {
    this.msalService.handleRedirectCallback((authError) => {
      if (authError) {
        console.error('Redirect Error: ', authError.errorMessage);
        return;
      }
    });

    this.loginSuccessSubscripiton$ = this.broadcastService.subscribe('msal:loginSuccess', (payload) => {
      console.log('Triggered the event: loginSuccess ');
      this.myMSALObj.ssoSilent({ loginHint: payload.idTokenClaims.preferred_username });
      this.storeToken(payload);
      this.storeAllowedActions();
      this.router.navigate(['/projects']);
    });



    this.tokenFailureSubscription$ = this.broadcastService.subscribe("msal:acquireTokenFailure", () => {
      console.log('Triggered the event: acquireTokenFailure ');
      this.logout()
    });



    this.myMSALObj.setLogger(new Logger(() => {
      //console.log('MSAL Logging: ', message);
    }, {
      correlationId: CryptoUtils.createNewGuid(),
      piiLoggingEnabled: false
    }));
  }

  // getNewToken(): Observable<string> {
  //   this.tokenSuccessSubscription$ = this.broadcastService.subscribe("msal:acquireTokenSuccess", payload => {
  //     console.log('Triggered the event: acquireTokenSuccess ');
  //     this.storeToken(payload);
  //     return of(payload.idToken.rawIdToken);
  //   });
  // }

  storeToken(payload: any) {
    const token = payload.idToken.rawIdToken;
    if (token) {
      sessionStorage.setItem('pmPlannerAccessToken', token);
      sessionStorage.setItem("tokenExpiryTime", payload.expiresOn);
    }
  }

  // checkAccount() {
  //   this.loggedIn = !!this.msalService.getAccount();
  // }

  login() {

    this.myMSALObj.loginRedirect();
    // this.msalService.loginPopup();
    // if (isIE) {
    // this.myMSALObj.loginRedirect();
    // } else {
    //   this.msalService.loginPopup();
    // }
  }

  /***************************************************
   * This method should be responsible to logout user
   ***************************************************/
  logout() {
    localStorage.clear();
    sessionStorage.clear();
    this.myMSALObj.logout();
    // this.router.navigate(["/landing"])
  }

  isTokenExpired(): boolean {
    const sExpiryTime = sessionStorage.getItem('tokenExpiryTime');
    if (sExpiryTime) {
      const expiryTime = Date.parse(sExpiryTime);
      const now = Date.now();
      // if (now > (expiryTime - 30*1000)) { this.logout(); return true; }
      if (now > expiryTime) return true;
      else return false;
    }
    else return false;
  }


  // private authenticationToken$ = new BehaviorSubject("");
  // setAuthenticationToken(value: string) {
  //   this.authenticationToken$.next(value);
  // }
  // getAuthenticationToken(): Observable<string> {
  //   if (this.isTokenExpired()){
  //     this.tokenSuccessSubscription$ = this.broadcastService.subscribe("msal:acquireTokenSuccess", payload => {
  //       this.storeToken(payload);
  //       this.setAuthenticationToken(payload.idToken.rawIdToken);
  //     });

  //     return this.authenticationToken$.asObservable();
  //   }
  //   else
  //     return of(sessionStorage.getItem('pmPlannerAccessToken'));
  // }

  storeAllowedActions() {
    if (!sessionStorage.getItem('pmPlannerAccessToken')) return;
    // const key = "allowed-actions";
    const key = "user-profile";
    this.profileSubcription$ = this.apiService.getMyProfile().subscribe(
      res => {
        const actions = res["actions"]?.map(x => x.toLowerCase().replace(" ", ""));
        res["actions"] = actions;
        sessionStorage.setItem(key, JSON.stringify(res));
      },
      error => {
        console.log('something went wrong with MyProfile api', error);
      });
  }

  // isTokenExpired() {
  //   const sExpiryTime = sessionStorage.getItem('tokenExpiryTime');
  //   if (sExpiryTime) {
  //     const expiryTime = Date.parse(sExpiryTime);
  //     const now = Date.now();
  //     if (now > expiryTime) { //token expired
  //       this.login();
  //     }
  //     else {
  //       // console.log("token not expired.");
  //       // console.log("Redirecting to /projects");
  //       // this.router.navigate(['/projects']);
  //       // window.location.reload();
  //     }
  //   } else {
  //     this.login();
  //   }
  // }

  ngOnDestroy() {
    this.utility.unsubscribe(this.loginSuccessSubscription$);
    this.utility.unsubscribe(this.profileSubcription$);
    this.utility.unsubscribe(this.tokenFailureSubscription$);
    this.utility.unsubscribe(this.tokenSuccessSubscription$);
  }
}
