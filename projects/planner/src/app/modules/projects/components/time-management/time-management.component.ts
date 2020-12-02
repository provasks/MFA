import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import * as moment from 'moment';
import { UtilityService } from '../../../../shared/services/utility.service';
declare var $: any;
declare var require: any
var momentBusinessDays = require('moment-business-days');

@Component({
  selector: 'app-time-management',
  templateUrl: './time-management.component.html',
  styleUrls: ['./time-management.component.scss']
})
export class TimeManagementComponent implements OnInit {
  individualHours: number = 0;
  initailLoad = true;
  addEditDate: any;
  getDateTaskManagementSubscription$: any;
  getAssigneeDataSubscription$: any;

  constructor(public utility: UtilityService) { }

  @Input() actualStartDate: any;
  @Input() actualEndDate: any;
  @Input() TasksGetByIdResp: any = { estimations: null };

  durationDays: any;
  estimatedHours = 0;
  assignedList: any = [];
  // assignedListShare:any;
  assignListEnable = false;

  assignedUsers: any[] = [];
  unAssignedHours = 0;
  assignedHours = 0;
  estimations: any = {};
  @Output() estimationsEmit = new EventEmitter<boolean>();


  ngOnInit(): void {

    this.getDateTaskManagementSubscription$ = this.utility.getDateTaskManagement().subscribe(res => {
      this.addEditDate = res;
      if (Object.keys(res).length > 0) {
        this.actualStartDate = this.addEditDate.startDate;
        this.actualEndDate = this.addEditDate.dueDate;
        this.daysCount();
      }
    })

    this.estimations = {
      "AssigneeEfforts": [],
      "TaskId": "",
      "EstimatedHours": 0,
      "id": ""
    }

    if (this.TasksGetByIdResp.estimations == null) {
      this.daysCount();
      this.getAssigneeDataSubscription$ = this.utility.getAssigneeData().subscribe(res => {
        this.assignedList = res;
        // console.log(this.assignedList);
        this.tableDataFormat();
      })
    }
    else {
      this.getAssigneeDataSubscription$ = this.utility.getAssigneeData().subscribe(res => {
        this.assignedList = res;
        this.tableDataFormat();
      })

      this.durationDays = this.TasksGetByIdResp?.estimations?.assigneeEfforts[0].days;
      this.estimatedHours = this.TasksGetByIdResp?.estimations?.estimatedHours;
      this.assignedUsers = this.TasksGetByIdResp?.estimations?.assigneeEfforts;
      this.assignedHours = this.TasksGetByIdResp?.estimations?.assignedHours.toFixed(2);
      this.unAssignedHours = this.TasksGetByIdResp?.estimations?.nonAssignedHours.toFixed(2);
      this.unAssignedHours = this.unAssignedHours < 0 ? 0 : this.unAssignedHours;
      this.assignedList = this.assignedUsers;
      this.estimations["id"] = this.TasksGetByIdResp?.estimations?.id;
      this.tableDataFormat();
    }

    this.initailLoad = false;
  }

  daysCount() {
    this.actualStartDate = moment(this.actualStartDate).format('MM-DD-YYYY');
    this.actualEndDate = moment(this.actualEndDate).format('MM-DD-YYYY');
    let calculateBusinessDays = momentBusinessDays(this.actualStartDate).businessDiff(momentBusinessDays(this.actualEndDate).add(1, 'd'))
    // console.log('my days', calculateBusinessDays);
    this.durationDays = calculateBusinessDays;
    this.assignedUsers?.map(x => {
      // console.log("assignedList 89", this.assignedList)
      x.days = this.durationDays;
      x.totalHours = x.hours * this.durationDays;
    });
  }

  tableDataFormat() {
    if (this.assignedUsers.length > this.assignedList.length) {
      this.assignedUsers?.forEach((v, i) => {
        let isfind = true;
        // console.log("tableDataFormat", this.assignedList);
        this.assignedList?.map(x => {
          if (x.displayName.toLowerCase() == v.displayName.toLowerCase()) {
            isfind = false;
          }
        })
        if (isfind) {
          this.assignedHours -= this.assignedUsers[i].totalHours.toFixed(2);
          this.unAssignedHours = Number.parseFloat((this.estimatedHours - this.assignedHours).toFixed(2));
          this.unAssignedHours = this.unAssignedHours < 0 ? 0 : this.unAssignedHours;
          this.assignedUsers.splice(i, 1);
        }
      })

    }

    else if (this.assignedUsers.length > 0) {
      // console.log("assignedList 55", this.assignedList);
      this.assignedList?.map((x, i) => {
        let isAvailable = true;
        this.assignedUsers?.forEach((y, j) => {
          if (x.displayName.toLowerCase() == y.displayName.toLowerCase()) {
            isAvailable = false;
          }
        })
        if (isAvailable) {
          let assignObj = {
            "assigneeId": x.id,
            "displayName": x.displayName,
            "days": this.durationDays,
            "hours": 0,
            "totalHours": 0
          }
          this.assignedUsers.push(assignObj)
        }
      })
    } else {
      // console.log("assignedList 22", this.assignedList)
      if (this.assignedList.length > 0) {


        this.assignedList?.map(x => {
          let assignObj = {
            "assigneeId": x.id,
            "displayName": x.displayName,
            "days": this.durationDays,
            "hours": 0,
            "totalHours": 0
          }
          this.assignedUsers.push(assignObj)
        });
      } else {
        return false
      }
    }
    this.prepareObj();
  }

  toggleAssignees() {
    this.assignListEnable = !this.assignListEnable;
  }

  hoursChange(value, index?) {
    let updatedTotalHours = Number.parseFloat(value) * this.durationDays;
    this.assignedUsers[index].hours = Number.parseFloat(value).toFixed(2);
    this.assignedUsers[index].totalHours = Number.parseFloat('' + updatedTotalHours).toFixed(2);
    let totalCountHours = 0;
    this.assignedUsers?.forEach((x, i) => {
      totalCountHours = totalCountHours + parseFloat(x.totalHours);
    })

    this.assignedHours = totalCountHours;
    this.unAssignedHours = this.estimatedHours - this.assignedHours;
    this.unAssignedHours = this.unAssignedHours < 0 ? 0 : this.unAssignedHours;
  }

  totalHoursChange(value, index?) {
    let updateHours = Number.parseFloat(value) / this.durationDays;
    this.assignedUsers[index].totalHours = Number.parseFloat(value).toFixed(2);
    this.assignedUsers[index].hours = Number.parseFloat('' + updateHours).toFixed(2);
    let totalCountHours = 0;
    this.assignedUsers?.forEach((x, i) => {
      totalCountHours = totalCountHours + parseFloat(x.totalHours);
    })

    this.assignedHours = totalCountHours;

    this.unAssignedHours = this.estimatedHours - this.assignedHours;
    this.unAssignedHours = parseInt(this.unAssignedHours.toFixed(2));
    this.unAssignedHours = this.unAssignedHours < 0 ? 0 : this.unAssignedHours;
  }

  computeHours() {
    let employeeSomeHours = this.estimatedHours / this.assignedUsers.length
    this.individualHours = employeeSomeHours / this.durationDays;
    let tags = document.getElementsByClassName('hours-input');
    let tagsLength = tags.length;
    for (let i = 0; i < tagsLength; i++) {
      this.assignedUsers[i].hours = this.individualHours.toFixed(2);
      this.assignedUsers[i].totalHours = employeeSomeHours.toFixed(2);

    }

    this.assignedHours = this.estimatedHours;
    this.unAssignedHours = 0;
    this.prepareObj();
    this.estimationsEmit.emit(this.estimations);
  }

  updateEstimates() {
    this.prepareObj();
    this.estimationsEmit.emit(this.estimations);
  }

  clearHours() {
    // this.estimatedHours =0;
    this.unAssignedHours = this.estimatedHours;
    this.assignedHours = 0;
    this.assignedUsers?.forEach(x => {
      x.hours = 0;
      x.totalHours = 0;
    })
  }

  prepareObj() {

    this.estimations.AssigneeEfforts = [];
    this.assignedUsers?.forEach(x => {
      let obj = {
        "assigneeId": x.assigneeId,
        "displayName": x.displayName,
        "days": x.days,
        "hours": x.hours,
        "totalHours": x.totalHours
      }

      this.estimations.AssigneeEfforts.push(obj);
    })

    this.estimations.EstimatedHours = parseInt('' + this.estimatedHours);
    this.estimations.ActualStartDate = moment(this.actualStartDate).format('MM-DD-YYYY');
    this.estimations.ActualEndDate = moment(this.actualEndDate).format('MM-DD-YYYY');
    // console.log('prepare method', this.estimations)

  }

  deleteUser(event, index) {
    // console.log(event.target.value, 'index', index)
  }

  assignedHoursChamge(e) {
    if (e.target.value < 0) {
      this.estimations.EstimatedHours = 0;
      e.target.value = 0;
    } else {
      this.estimations.EstimatedHours = e.target.value;
    }
    // console.log('this.estimations.EstimatedHours', this.estimations.EstimatedHours)
    if (e.target.value == '') {
      this.unAssignedHours = 0;
    } else {
      if ((this.assignedHours) > parseFloat(e.target.value)) {
        this.unAssignedHours = 0;
      } else {
        let unAssignedCount = parseFloat((e.target.value - this.assignedHours).toFixed(2));
        this.unAssignedHours = unAssignedCount < 0 ? 0 : unAssignedCount;
      }
    }
  }

  // isActionAllowed(actionName) {
  //   return this.utility.isActionAllowed(actionName);
  // }

  ngOnDestroy() {

    this.utility.unsubscribe(this.getDateTaskManagementSubscription$);
    this.utility.unsubscribe(this.getAssigneeDataSubscription$);





  }

}
