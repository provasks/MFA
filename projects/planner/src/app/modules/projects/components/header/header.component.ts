import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  projectName: string;

  constructor(private titleService: Title, private router: Router, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.projectName = this.titleService.getTitle();
  }

  goBack() {
    this.activatedRoute.params.subscribe(params => {
      const groupId = params["groupId"] || '';
      this.router.navigate([`projects/${groupId}`]); /** planner/projects  for Pulse-Planner-App*/
    })
  }


}
