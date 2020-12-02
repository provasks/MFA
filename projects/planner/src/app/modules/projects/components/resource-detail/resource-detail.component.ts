import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from "@angular/platform-browser";
import { settings } from '../../../../contents/config';
import { Assignment } from '../../../../models/assignment.model';
import { UtilityService } from '../../../../shared/services/utility.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-resource-detail',
  templateUrl: './resource-detail.component.html',
  styleUrls: ['./resource-detail.component.scss']
})
export class ResourceDetailComponent implements OnInit {
  popupPosition: any;
  arrowPosition: any;
  arrowDirectionUp: boolean;
  assignment: Assignment;
  assignmentSubscription$: Subscription;
  constructor(public utility: UtilityService, public domSanitizer: DomSanitizer) { }

  ngOnInit(): void {
    this.assignmentSubscription$ = this.utility.getAssignment().subscribe(assignment => {
      if (!(assignment && assignment["tasks"])) return;
      this.assignment = assignment as Assignment;
      this.assignment.totalHours = 0;
      let date: moment.Moment = this.utility.stringToDate(assignment["date"])
      this.assignment.dateLong = `${date.format('Do')} ${date.format('MMMM')} ${date.format('YYYY')}`
      this.assignment.tasks.forEach(i => this.assignment.totalHours += i.hours)
      const maxLeft = this.utility.getPopupMaxLeft(settings.project.resourceManagement.resouceDetailPopupWidth)
      const left = this.assignment.click.x - settings.project.resourceManagement.resouceDetailPopupWidth / 2 - 20;
      const diff = left - maxLeft;
      setTimeout(() => {
        this.arrowDirectionUp = this.assignment.click.y < (this.utility.getObjectProperty('.resource-detail-wrapper', 'height') + 30);
        // console.log(this.assignment.click.y, this.utility.getObjectProperty('.resource-detail-wrapper', 'height'))
        if (this.arrowDirectionUp) {
          this.popupPosition = {
            top: `${this.assignment.click.y - this.utility.getObjectProperty(".resource-management", 'top') - 15}px`,
            left: `${diff > 0 ? maxLeft : left}px`
          }
        }
        else {
          this.popupPosition = {
            bottom: `${this.utility.getObjectProperty('#container', 'height') - this.assignment.click.y - 20}px`,
            left: `${diff > 0 ? maxLeft : left}px`
          }

        }
        this.arrowPosition = {
          left: `${diff > 0 ? diff : 0}px`
        }

      }, 10);
      // const maxLeft =  - settings.project.resourceManagement.resouceDetailPopupWidth / 2 - settings.project.ganttChart.scrollbarWidth;
    })
  }



  onClick(event) {
    event.stopPropagation();
  }

  ngOnDestroy() {
    this.utility.unsubscribe(this.assignmentSubscription$);
  }

}
