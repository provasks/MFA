import { Component } from '@angular/core';
import { AuthenticationService } from './shared/services/authentication.service';
import { BnNgIdleService } from 'bn-ng-idle';
import { Title } from '@angular/platform-browser';
import { environment } from '../environments/environment';
declare var $: any;
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  // encapsulation: ViewEncapsulation.ShadowDom
})
export class AppComponent {

  sessioncard: boolean = true;

  constructor(
    private bnIdle: BnNgIdleService,
    private titleService: Title,
    private authService: AuthenticationService
  ) {
    this.titleService.setTitle(environment.projectName);
    this.bnIdle.startWatching(600).subscribe((res) => {
      if (res) {
        if (sessionStorage.getItem('pmPlannerAccessToken')) {
          this.sessioncard = true;
        }
      }
    });
  }

  ngOnInit() {

    $(document).ready(function () {
      $("body").tooltip({ selector: '[data-toggle=tooltip]' });
    });
  }

  logout() {
    this.authService.logout();
  }
  ngOnDestroy() { }
}