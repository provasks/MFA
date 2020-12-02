import { Injectable } from '@angular/core';
import { Subscription } from 'rxjs';
import { UtilityService } from './utility.service';
import { ApiService } from '../../api.service';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  profileSubcription$: Subscription;



  constructor(
    private apiService: ApiService,
    private utility: UtilityService,
  ) { }

  init() {
    this.storeAllowedActions();

  }


  storeToken(payload: any) {
    const token = payload.idToken.rawIdToken;
    if (token) {
      sessionStorage.setItem('pmPlannerAccessToken', token);
      sessionStorage.setItem("tokenExpiryTime", payload.expiresOn);
    }
  }


  login() {

  }

  /***************************************************
   * This method should be responsible to logout user
   ***************************************************/
  logout() {

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


  storeAllowedActions() {
    if (!sessionStorage.getItem('pmPlannerAccessToken')) return;
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


  ngOnDestroy() {
    this.utility.unsubscribe(this.profileSubcription$);
  }
}
