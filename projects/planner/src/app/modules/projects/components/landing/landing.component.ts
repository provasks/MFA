import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../../../shared/services/authentication.service';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss']
})
export class LandingComponent implements OnInit {
  constructor(private authService: AuthenticationService) { }

  ngOnInit(): void {
    this.authService.init();
  }

  login() {
    this.authService.login();
  }
}
