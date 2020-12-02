import { Component, OnInit, Input } from '@angular/core';
import { settings } from '../../../../contents/config';
import { Task } from '../../../../models/task.model';
import { UtilityService } from '../../../../shared/services/utility.service';

@Component({
  selector: 'app-gantt-bar',
  templateUrl: './gantt-bar.component.html',
  styleUrls: ['./gantt-bar.component.scss']
})
export class GanttBarComponent implements OnInit {
  @Input() task: Task;
  @Input() index: number;
  @Input() relation: string;
  // @Input() parent: boolean = true;
  status: string;
  style: { top?: string; width: string; left: string, height?: string, display: string };
  parent: boolean = false;
  constructor(public utility: UtilityService) { }

  ngOnInit(): void {
  }

  ngOnChanges() {
    this.status = this.getTaskStatusClass(this.task.status.toLowerCase());
    this.style = {
      left: this.getLeftPosition(),
      width: this.getWidth(this.task),
      // height: (settings.project.taskTable.rowHeight) + "px",
      display: (this.task.startDate && this.task.dueDate) ? '' : 'none'
    }
  }
  getLeftPosition(): string {
    let difference = this.utility.getDateDifference(this.utility.calenderStartDate.format(settings.dateFormat), this.task.startDate, settings.dateFormat, "days")
    // + settings.project.ganttChart.extraDays
    return (difference * settings.project.ganttChart.dayWidth) + "px";
  }
  getWidth(task: Task): string {
    let difference = this.utility.getDateDifference(task.startDate, this.task.dueDate, settings.dateFormat, "days")
    return ((difference + 1) * settings.project.ganttChart.dayWidth) + "px";
  }

  getTaskStatusClass(status: string): string {
    return status.replace(" ", '-');
  }
}