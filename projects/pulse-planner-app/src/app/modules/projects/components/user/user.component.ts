import { Component, Input, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { UtilityService } from 'projects/planner/src/app/shared/services/utility.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

  @Input() user: any;
  @Input() showName: any;

  constructor(public utility: UtilityService, public domSanitizer: DomSanitizer) { }

  ngOnInit(): void {
  }

}
