import { Component, ViewEncapsulation } from '@angular/core';
import { AuthenticationService } from './shared/services/authentication.service';
import { BnNgIdleService } from 'bn-ng-idle';
import { Title } from '@angular/platform-browser';
import { environment } from '../environments/environment';
import { ActivatedRoute, Router } from '@angular/router';
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
    private authService: AuthenticationService,
    private router: Router,
    private activatedRoute: ActivatedRoute
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

    /** Below 4 lines are only for Pulse-Planner-API */
    this.authService.init();
    const pattern = "planner/projects";
    const url = location.href.indexOf(pattern) >= 0 ? location.href.substr(location.href.indexOf(pattern)) : pattern;
    this.router.navigate([decodeURI(url)]);
  }

  logout() {
    this.authService.logout();
  }
  ngOnDestroy() { }
}