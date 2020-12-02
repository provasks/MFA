import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
import { UtilityService } from '../../../../shared/services/utility.service';

@Component({
  selector: 'app-task-dependency',
  templateUrl: './task-dependency.component.html',
  styleUrls: ['./task-dependency.component.scss']
})
export class TaskDependencyComponent implements OnInit {
  isUpdate = false;
  isEnable = false;

  constructor(public utility: UtilityService) { }

  @Output() closeDependencyModalEmit = new EventEmitter<any>();
  @Input() rowData:any;
  ngOnInit(): void {
  }

  sendMessageToParent(ev) {
    this.isEnable = ev.isEnable?ev.isEnable: false;
    this.isUpdate = ev.isUpdate?ev.isUpdate: false;
  }

  closeModal() {
    let obj = {
      "isEnable": this.isEnable,
      "isUpdate": this.isUpdate
    }

    this.closeDependencyModalEmit.emit(obj);
  }

  ngOnDestroy() {
  this.utility.setdependencyModalFlag(this.isUpdate);
  }

}
