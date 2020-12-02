import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { UtilityService } from '../../../../shared/services/utility.service';
import { ApiService } from '../../../../api.service';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-table-dependency',
  templateUrl: './table-dependency.component.html',
  styleUrls: ['./table-dependency.component.scss']
})
export class TableDependencyComponent implements OnInit {
  dependentData: any;
  @Input() dependecyTableData: any;
  @Output() closeDependencyModalEmit = new EventEmitter<any>();
  dependencyId: any;
  isUpdated = false;
  @Input() parentTaskId: any;
  dependencyUpdateSubscription$: Subscription;
  deleteDependancySubscription$: Subscription;
  getDependenciesDataSUbscription$: Subscription;
  dependenceIsDelete: boolean = false;


  constructor(private utility: UtilityService, private apiSer: ApiService) { }

  ngOnInit(): void {

    this.dependencyUpdateSubscription$ = this.utility.getdependencyUpdate().subscribe(res => {
      if (res) {

        this.getDependenciesData();
      }
    })

    // console.log('table', this.parentTaskId)
    this.getDependenciesData();
  }

  getDependenciesData() {
    this.getDependenciesDataSUbscription$ = this.apiSer.getDependencies(this.parentTaskId).subscribe(
      res => {

        this.dependecyTableData = res;
      },
      error => {

      })
  }

  deleteDependancy(dep) {
    this.dependencyId = dep.id; //  need to add dependency array obj id

    this.isUpdated = true;
    this.sendMessageToParent();
    this.deleteDependancySubscription$ = this.apiSer.deleteDependency(this.dependencyId).subscribe(
      resp => {
        // console.log(resp);
        this.dependenceIsDelete = true;
        this.getDependenciesData()
      },
      error => {

      }
    )
  }

  sendMessageToParent() {
    let obj = {
      "isEnable": false,
      "isUpdate": this.isUpdated
    }
    this.closeDependencyModalEmit.emit(obj);
  }

  ngOnDestroy() {
    this.utility.unsubscribe(this.getDependenciesDataSUbscription$)
    this.utility.unsubscribe(this.deleteDependancySubscription$);
    this.utility.unsubscribe(this.dependencyUpdateSubscription$);
    this.utility.setdependencyUpdate(false);
    if (this.dependenceIsDelete) {
      // this.utility.setTaskTableFlag(false);
      // setTimeout(() => this.utility.setTaskTableFlag(true), 100)
      this.utility.triggerReloadTasks(true)
    }
  }

}
