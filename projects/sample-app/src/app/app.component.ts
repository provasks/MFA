import { Component, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  encapsulation: ViewEncapsulation.ShadowDom
})
export class AppComponent {
  title = 'sample-app';

  constructor(private router: Router) { }

  ngOnInit() {
    this.router.navigate(["/sampleapp/home"])
  }
}

