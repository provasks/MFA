import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Subscription } from 'rxjs';
import { DomSanitizer } from "@angular/platform-browser";
import { Resource } from '../../../../models/resource.model';
import { ApiService } from '../../../../api.service';
import { UtilityService } from '../../../../shared/services/utility.service';
import { Assignment } from '../../../../models/assignment.model';

declare var $: any;

@Component({
  selector: 'app-resouce-management',
  templateUrl: './resouce-management.component.html',
  styleUrls: ['./resouce-management.component.scss']
})
export class ResouceManagementComponent implements OnInit {
  @Output() closeResourceManagementEmitter = new EventEmitter<boolean>();
  resources: Resource[];
  filteredResources: Resource[];
  showHideDetailSubscription$: Subscription;
  showDetails: boolean = false;
  isFullScreen: boolean = false;

  dataCountStyle: { width: string } = { width: "" };
  availabilityTableStyle: { width: string, left?: string, height?: string } = { width: "", left: "", height: "" }
  resourceTableStyle: { width: string, height?: string } = { width: "", height: "" }

  resourceViewerTypes: any = [
    {
      text: "Tasks per Day",
      value: 1
    }, {
      text: "Hours per Day",
      value: 2
    }
  ];
  selectedViewer = 1;

  assignees = []
  resourceSubscription: Subscription;
  groupMemberSubscription$: Subscription;

  constructor(private apiService: ApiService, public utility: UtilityService, public domSanitizer: DomSanitizer) { }

  ngOnInit(): void {
    this.resourceSubscription = this.apiService.getResources(this.utility.planId).subscribe(resources => {
      this.resources = resources
      this.filteredResources = [...resources];
      this.assignees = this.resources.map(r => r.displayName)
    })
    this.groupMemberSubscription$ = this.apiService.getAllGroupMembers(this.utility.groupId).subscribe(members=>{
      this.utility.addAssigneeInfo(this.resources, members)
    })
    this.setStyles();
    this.showHideDetailSubscription$ = this.utility.showHideResourceDetails().subscribe(flag => {
      this.showDetails = flag;
    })
    setTimeout(() => {
      $(".availability-table").scrollLeft($("#right_panel").scrollLeft());
    }, 500);
  }

  onClick(event) {
    event.stopPropagation();
    this.showDetails = false;
  }

  filterAssignee(event) {
    this.filteredResources = event.value.length
      ? this.resources.filter(r => event.value.includes(r.displayName))
      : [...this.resources]
    this.setStyles();
  }

  setStyles() {
    this.resourceTableStyle = {
      width: `${$("#left_panel").width()}px`
    };
    const position = $("#right_panel").position() || { left: 10 }; //fault handing for unit testing

    this.availabilityTableStyle = {
      left: `${position.left}px`,
      width: `${$("#right_panel").width()}px`,
    };
    this.dataCountStyle.width = $('.gantt-calender .header').width() + "px";
  }

  closeResourceManagement(event) {
    this.closeResourceManagementEmitter.emit(false);
  }
  onAvailabilityClick(assignment: Assignment, resource: Resource, event: any) {
    assignment.assignee = {
      name: resource.displayName,
      photo: resource.photo
    };
    assignment.click = {
      x: event.x,
      y: event.y
    };
    // console.log(event.clientY)
    if (assignment.tasks.length) {
      this.utility.setAssignment(assignment);
      this.showDetails = true;
      event.stopPropagation();
    }
    else {
      this.showDetails = false;
    }
    // console.log(event.x, event.y);
  }

  getAvailabilityValue(day: any) {
    return this.formatAvailablityValue(this.selectedViewer === 1 ? day.taskCount : day.hourCount);
  }

  formatAvailablityValue(value: number) {
    return Number.isInteger(value) ? value : value.toFixed(2);
  }

  onScroll(event) {
    $(".resource-table").scrollTop($(".availability-table").scrollTop()); //common scrollbar
  }

  ngOnDestroy() {
    this.utility.unsubscribe(this.showHideDetailSubscription$);
    this.utility.unsubscribe(this.resourceSubscription);
    this.utility.unsubscribe(this.groupMemberSubscription$);
  }
}
