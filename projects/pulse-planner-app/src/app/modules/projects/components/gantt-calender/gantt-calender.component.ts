import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { settings } from "./../../../../contents/config";
import { UtilityService } from '../../../../shared/services/utility.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-gantt-calender',
  templateUrl: './gantt-calender.component.html',
  styleUrls: ['./gantt-calender.component.scss']
})
export class GanttCalenderComponent implements OnInit {

  days: any[];
  months: any[];
  distinctYears: any[];
  headerWidth: string;
  dayWidth: string;
  // startDate: moment.Moment;
  // endDate: moment.Moment;
  today: moment.Moment;
  todayIndex: number;
  headerTop: string;
  taskSubscription$: Subscription;
  headerSubscription$: Subscription;

  @Output() calenderDrawn: EventEmitter<any> = new EventEmitter();
  tasksSubscription$: Subscription;

  constructor(private utility: UtilityService) { }

  ngOnInit(): void {
    this.tasksSubscription$ = this.utility.getFilteredTasks().subscribe(tasks => {
      if (!tasks.length) return;
      const calenderInfo = this.getCalenderInfo();
      this.calenderDrawn.emit(calenderInfo)
      this.utility.setParameters(calenderInfo);
    });

    this.taskSubscription$ = this.utility.getTaskManipulatedData().subscribe(tasks => {
      if (!tasks.length) return;
      const calenderInfo = this.getCalenderInfo();
      this.calenderDrawn.emit(calenderInfo)
      this.utility.setParameters(calenderInfo);
    })

    this.headerSubscription$ = this.utility.getHeaderTop().subscribe(value => {
      this.headerTop = value + "px";
    })
  }
  private getCalenderInfo() {
    this.days = this.utility.getCalenderDays(this.utility.calenderStartDate, this.utility.calenderEndDate);
    this.todayIndex = this.utility.getToday().diff(this.utility.calenderStartDate, 'd');

    this.distinctYears = this.utility.getDistinctYears(this.days);
    this.headerWidth = settings.project.ganttChart.dayWidth * this.days.length + 2 + 'px'; //1px for border-right
    this.dayWidth = settings.project.ganttChart.dayWidth + "px";
    const calenderInfo = {
      headerWidth: this.headerWidth,
      dayWidth: this.dayWidth,
      days: this.days,
      dayCount: this.days.length,
      todayIndex: this.todayIndex
    };
    return calenderInfo;
  }

  // match(day) {
  //   return day.dayValue === this.today.format('D') &&
  //     day.monthValue === this.today.format('MM') &&
  //     day.year === this.today.format('YYYY');
  // }
  
  getMonths(year) {
    return this.utility.getDistinctMonths(this.days, year);
  }

  ngOnDestroy() {
    this.utility.unsubscribe(this.taskSubscription$);
    this.utility.unsubscribe(this.headerSubscription$);
    this.utility.unsubscribe(this.tasksSubscription$);
  }
}
