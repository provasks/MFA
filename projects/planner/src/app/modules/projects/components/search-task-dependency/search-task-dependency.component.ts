import { Component, OnInit, HostListener, Output, EventEmitter, Input } from '@angular/core';
import { UtilityService } from '../../../../shared/services/utility.service';
import { ApiService } from '../../../../api.service';
import { environment } from '../../../../../environments/environment';
import { Subscription } from 'rxjs';
import * as moment from 'moment';

@Component({
  selector: 'app-search-task-dependency',
  templateUrl: './search-task-dependency.component.html',
  styleUrls: ['./search-task-dependency.component.scss']
})
export class SearchTaskDependencyComponent implements OnInit {
  dependecyTableData: any;
  dependecyTableDataTemp: any;
  searchTask = '';
  setDependencyFlag = false;
  taskContainerFlag = false;
  addDependencySubscription$: Subscription;
  taskId: any;
  parentTaskId: any;
  dependenciesList: any = [];
  dependencyValue: any;
  isOpenMenu = false;
  dependencyTypeId: any;
  @Output() closeDependencyModalEmit = new EventEmitter<any>();
  @Input() parentTaskData: any;
  isUpdated = false;
  isSetDependency = true;
  taskManipulateDataSubscription$: Subscription;
  dependenciesTypeSubscription$: Subscription;
  predecessorStartDate: any;
  predecessorDueDate: any;
  successorStartDate: any;
  successorDueDate: any;
  dependencyTypesList = [];
  dependencyTypesError = false;
  dependenceAdded = false;

  @HostListener('document:click', ['$event'])
  clickout(event) {
    // console.log(event)
    if ((event.target.parentElement?.classList.contains("dependency-type"))
      // || event.target.parentElement.offsetParent?.classList.contains("dependency-comp")
      || event.target.parentElement?.classList.contains("dropdown-dependency-container")) {
      this.isOpenMenu = true;
    } else {
      this.isOpenMenu = false;
    }
  }

  constructor(private utility: UtilityService, private apiSer: ApiService) { }

  ngOnInit(): void {

    // console.log('test parentTaskData', this.parentTaskData)
    this.predecessorStartDate = moment(this.parentTaskData.startDate, "DD/MM/YYYY");
    this.predecessorDueDate = moment(this.parentTaskData.dueDate, "DD/MM/YYYY");

    this.taskManipulateDataSubscription$ = this.utility.getTaskManipulatedData().subscribe(tasks => {
      this.dependecyTableData = tasks.filter((x) => (x.hierarchy != "parent") && (x.id != '' + this.parentTaskData.id));
      this.dependecyTableDataTemp = tasks.filter((x) => (x.hierarchy != "parent") && (x.id != '' + this.parentTaskData.id));
    });

    this.dependenciesTypeSubscription$ = this.apiSer.getDependencyTypes().subscribe(resp => {
      this.dependenciesList = resp;
      // console.log('dependency list', resp);
      // this.dependencyValue = this.dependencyTypesList[0]?.name;
      // this.dependencyTypeId = this.dependencyTypesList[0]?.id;
    })

  }

  filterTaskData(event) {
    // console.log(event)
    this.searchTask = event.target.value;
    this.dependecyTableData = this.dependecyTableDataTemp.filter(x => x.title.toLowerCase().indexOf(event.target.value.toLowerCase()) != -1)
    this.taskContainerFlag = true;
    if (this.searchTask == '') {
      this.isSetDependency = true;
    }
  }

  toggleDependency() {
    this.setDependencyFlag = !this.setDependencyFlag;
  }

  selectDependecyTitle(task) {
    this.dependencyTypesList = [];
    // console.log(task);
    this.searchTask = task.title;
    this.taskId = task.id;
    this.successorStartDate = moment(task.startDate, "DD/MM/YYYY");
    this.successorDueDate = moment(task.dueDate, "DD/MM/YYYY");
    this.taskContainerFlag = false;
    this.isSetDependency = false;

    if (this.predecessorDueDate <= this.successorStartDate) {
      // this.dependenciesList.push("Finish-Start");
      this.dependenciesList.filter((v) => {
        if (v.name == 'Finish-Start') {
          this.dependencyTypesList.push(v)
        }
      });
    }

    if (this.predecessorStartDate <= this.successorStartDate) {
      // this.dependenciesList.push("Start-Start");
      this.dependenciesList.filter((v) => {
        if (v.name == 'Start-Start') {
          this.dependencyTypesList.push(v)
        }
      });
    }

    if (this.predecessorDueDate <= this.successorDueDate) {
      // this.dependenciesList.push("Finish-Finish");
      this.dependenciesList.filter((v) => {
        if (v.name == 'Finish-Finish') {
          this.dependencyTypesList.push(v)
        }
      });
    }

    if (this.predecessorStartDate <= this.successorDueDate) {
      // this.dependenciesList.push("Start-Finish");
      this.dependenciesList.filter((v) => {
        if (v.name == 'Start-Finish') {
          this.dependencyTypesList.push(v)
        }
      });
    }
    // console.log('dependencyTypesList', this.dependencyTypesList)
    this.dependencyValue = this.dependencyTypesList[0]?.name;
    this.dependencyTypeId = this.dependencyTypesList[0]?.id;

    if (this.dependencyTypesList.length == 0) {
      this.dependencyTypesError = true;
    } else {
      this.dependencyTypesError = false;
    }

    // this.parentTaskId = task.parentTaskId;

  }

  addDependency() {
    const url = `${environment.apiUrl}Tasks/AddDependency`;
    let dependencyObj = {
      // "Id": 0, 
      "planId": this.utility.planId,
      "TaskId": this.taskId,
      "ParentTaskId": this.parentTaskData.id,
      "TypeId": this.dependencyTypeId, // dependency type id
      // "DependencyType": this.dependencyValue,
      // "Title": this.searchTask
    };

    // console.log(dependencyObj);
    this.isUpdated = true;
    this.addDependencySubscription$ = this.apiSer.addDependencyTask(url, dependencyObj).subscribe(
      resp => {
        // console.log(resp);
        this.setDependencyFlag = false;
        this.searchTask = '';
        this.isSetDependency = true;
        this.dependencyValue = this.dependenciesList[0].name;
        this.dependencyTypeId = this.dependenciesList[0].id;
        this.sendMessageToParent()
        this.utility.setdependencyUpdate(true);
        this.dependenceAdded = true;
      },
      error => {

      }
    );
  }


  dependencyChange(event, dependency) {
    // console.log(dependency.name);
    this.dependencyValue = dependency.name;
    this.dependencyTypeId = dependency.id;
    this.isOpenMenu = false;
  }

  cancel() {
    // console.log('cancel');
    this.searchTask = '';
    this.dependencyValue = this.dependenciesList[0].name;
    this.dependencyTypeId = this.dependenciesList[0].id;
    this.setDependencyFlag = false;
  }

  openLabelMenu() {
    this.isOpenMenu = !this.isOpenMenu;
  }


  activeType(dependency) {
    if (dependency?.name.toLowerCase() == this.dependencyValue.toLowerCase()) {
      return true;
    }
  }

  sendMessageToParent() {
    let obj = {
      "isEnable": false,
      "isUpdate": this.isUpdated
    }
    this.closeDependencyModalEmit.emit(obj);
  }

  ngOnDestroy() {
    this.utility.unsubscribe(this.addDependencySubscription$);
    this.utility.unsubscribe(this.taskManipulateDataSubscription$);
    this.utility.unsubscribe(this.dependenciesTypeSubscription$);
    if (this.dependenceAdded) {
      // console.log("sarch task destroy, ", this.dependenceAdded)
      // this.utility.setTaskTableFlag(false);
      // setTimeout(() => this.utility.setTaskTableFlag(true), 100)
      this.utility.triggerReloadTasks(true)
    }
  }

}
