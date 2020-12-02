import { Component, OnInit, ViewChild, EventEmitter, Output, Input, ElementRef } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ApiService } from '../../../../api.service';
import { Subscription } from 'rxjs';
import { FormControl } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { DatePipe } from '@angular/common';
import { DialogService } from '../task-table/dialog.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ExcelService } from '../task-table/excel.service';
import { AddEditTaskComponet } from '../AddEditTask/add-edit-task.component';
import { MatDialog } from '@angular/material/dialog';
import * as moment from 'moment';
import { Task } from '../../../../models/task.model';
import { Bucket } from '../../../../models/bucket.model';
import { Assignee } from '../../../../models/assignee.model';
import { UtilityService } from '../../../../shared/services/utility.service';
import { settings } from '../../../../contents/config';
declare var $: any;

@Component({
  selector: 'app-task-table',
  templateUrl: './task-table.component.html',
  styleUrls: ['./task-table.component.scss'],
})
export class TaskTableComponent implements OnInit {
  // displayedColumns: string[] = ['description', 'bucket', 'startDate', 'endDate', 'assignee', 'label'];

  @ViewChild('tasktable', { static: false }) tasktable: ElementRef;
  @ViewChild(AddEditTaskComponet, { static: false }) taskModelComp: AddEditTaskComponet;

  //@ViewChild('exportDialog') exportDialog: ExportDialogComponent;

  @Input() selectedColumns: any;
  @Input() allTasks: Task[];
  dataSource = new MatTableDataSource();
  rowData: any;
  catLabelArr: any = [];
  originalRowData: any;
  taskCount: any;
  isDescription: boolean = false;
  bucketList = [];
  assigneeList = [];
  filterBucketList = [];
  filterStartDateList = [];
  fromRow: number = 0;
  toRow: number;
  allFilterData: any = [];
  startDateList = [];
  endDateList = [];
  filterEndDateList = [];
  filterAssigneeList = [];
  bucketData = [];
  assigneeData = [];
  selectedBucketValue: any;
  selectedStartDateValue: any;
  selectedEndDateValue: any;
  selectedAssigneeValue: any;
  showLabelColumn: any;
  labelList: any = [];
  appliedCat: any;
  appliedCatColor: string;
  allLabelCat: any = [];
  selectedRow: any;
  allLabelList = [];
  filterLabelList = [];
  selectedLabelValue: any;
  uniqueArr = [];
  taskId: any;
  deleteError: string = '';
  deleteSuccess: string = '';
  colorPinkFlag: boolean = false;
  colorRedFlag: boolean = false;
  colorYellowFlag: boolean = false;
  colorGreenFlag: boolean = false;
  colorBlueFlag: boolean = false;
  colorPurpleFlag: boolean = false;
  labelColorArr = [];
  labelColumnColorArr = [];
  labelNamesData: any = {};
  labelData: any = [];
  addEditModal: boolean = false;
  isAddTaskFlag: boolean = false;
  isEditTaskFlag: boolean = false;
  childTaskId: any;
  parentTaskName: any;

  subtaskModal = false;
  @Output() AddEditModalEmit = new EventEmitter<boolean>();
  @Output() addSubTaskModalEmit = new EventEmitter<any>();
  @Output() dependencyModalEmit = new EventEmitter<any>();
  filterValues = {
    bucket: [],
    startDate: [],
    endDate: [],
    assignee: [],
    label: [],
  };

  bucketFilter = new FormControl('');
  multiControl = new FormControl();

  @ViewChild(MatSort, { static: true }) sort: MatSort;
  clearArray: any = ['bucket', 'startDate', 'endDate', 'assignee', 'label'];
  columnKeys: string[];
  setClickedRow: Function;
  events: any;
  selectedStartDate: any;
  filterPaneOpened: boolean[] = [false, false, false, false, false];
  parentTaskData: any;
  roleActions: any[];
  currentRole: string;

  labelSubscription$: Subscription;
  excelUploadSubscription$: Subscription;
  confirmDialogSubscription$: Subscription;
  deleteSubscription$: Subscription;
  parentNameSubscription$: Subscription;
  rowDataTemp: any;
  groupMembers: Assignee[];
  groupMemberSubscription$: Subscription;
  bucketSubscription$: Subscription;

  constructor(
    private apiService: ApiService,
    public utility: UtilityService,
    public domSanitizer: DomSanitizer,
    private dialogService: DialogService,
    public snackBar: MatSnackBar,
    private excelService: ExcelService,
    private dialogRef: MatDialog

  ) {
    this.dataSource = new MatTableDataSource(this.rowData);
    // this.apiService.getAllGroupMembers(this.utility.groupId).subscribe(gm => {
    //   this.groupMembers = gm;
    // })
  }

  ngOnInit(): void {
    this.dialogRef.closeAll();

    this.utility.getViewDropdownFlag().subscribe(
      () => {
        this.clearArray.forEach(element => {
          this.clear(element);
        });
      }
    )
    this.parentNameSubscription$ = this.utility.getparentTaskName().subscribe(res => {
      this.parentTaskName = res;
    })

    this.excelUploadSubscription$ = this.utility
      .getExcelUploadFlag()
      .subscribe((response) => {
        if (response) {
          this.exportToExcel();
        }
      });

    this.setClickedRow = function (index) {
      this.selectedRow = index;
    };

    if (this.selectedColumns) {
      this.selectedColumns?.forEach(() => {
        // if (item === 'label') this.selectedColumns.splice(index, 1);
      });
    }
    // this.selectedBucketValue = undefined;
    // this.selectedStartDateValue = undefined;
    // this.selectedEndDateValue = undefined;
  }

  ngAfterViewInit() {
    this.getTaskDetails();
  }
  ngOnChanges() {
    this.getTaskDetails();
  }

  getBoxes(relation: string) {
    const level = relation.match(/-/g) ? relation.match(/-/g).length - 1 : 0;
    return Array(level).fill(1);
  }
  // hideMe() { }
  // ngOnChanges() {
  //   // console.log(this.selectedColumns)
  // }
  getAssignees(assignees: Assignee[]) {
    const assigneeList = assignees?.map((a) => a.displayName);
    return assigneeList.join(', ');
  }

  getTaskDetails() {
    this.rowData = this.utility.manipulateData(this.allTasks);
    this.loadLabel();

    this.originalRowData = this.rowData;
    this.rowDataTemp = this.rowData
    //For StartDate//

    // this.startDateList = [...new Set(this.rowData.map(item => moment(item.startMoment).startOf('day')))]
    //   .filter(i => i !== undefined)


    this.rowData.map((item) => this.startDateList.push(moment(item.startMoment).startOf('day')));

    this.startDateList = this.startDateList.filter((n, i) =>
      this.startDateList.findIndex(value => n !== null && n.isSame(value)) == i
    );
    this.filterStartDateList = this.startDateList;


    //For EndDate//
    this.rowData.map((item) => this.endDateList.push(moment(item.dueMoment).startOf('day')));

    this.endDateList = this.endDateList.filter((v, i) =>
      this.endDateList.findIndex(value => v !== null && v.isSame(value)) == i
    );
    //console.log('distinctArray',this.endDateList);
    this.filterEndDateList = this.endDateList;

    //For Assignee
    //this.rowData.map((item) => this.assigneeList.push(this.getAssignees(item.assignees)));
    this.addAssigneeFilter();
    //console.log('assigneelist',this.assigneeList)

    //For Label
    this.rowData.map((item) => this.allLabelList.push(item.allLabelCat));
    this.allLabelList = this.allLabelList.filter(
      (n, i) => this.allLabelList.indexOf(n) === i
    );
    this.allLabelList = this.allLabelList.filter((x) => {
      if ((x != null) && (x != "undefined")) {
        return x;
      }
    })

    //this.uniqueArr = Array.from(new Set(this.allLabelList.map(JSON.stringify)), JSON.parse);
    this.filterLabelList = this.allLabelList;
    //console.log(this.filterLabelList);

    try {
      this.utility.projectStartDate = this.utility.getMinimumValue(
        this.rowData
      )
    } catch (e) {
      console.error(`Error: Problem with the Startdate data`);
    }
    try {
      this.utility.projectDueDate = this.utility.getMaximumValue(
        this.rowData
      )
    } catch (e) {
      console.error(`Error: Problem with the Enddate data`);
    }


    this.utility.setCalenderStartDate(this.utility.projectStartDate.clone())
    this.utility.setCalenderEndDate(this.utility.projectDueDate.clone())
    this.utility.setTaskManipulatedData(this.rowData);
    this.collapseAllChilds();
    this.showBuckets();
    this.showAssignees();
  }

  private loadLabel() {

    this.labelSubscription$ = this.apiService.getLabelNames().subscribe(res => {
      let colors = ['', 'Pink', 'Red', 'Yellow', 'Green', 'Blue', 'Purple'];

      var mykeys = Object.keys(res)
      mykeys?.forEach((x, i) => {
        if (res[x] == null || res[x] == '') {
          res[x] = colors[i]
        }
      })

      this.labelNamesData = res;
      this.showLabels();
    });

  }

  private showLabels() {
    this.labelList = this.rowData;
    this.labelList.map((listData) => {
      this.appliedCat = listData.appliedCategories;
      this.appliedCatColor = '';

      this.colorPinkFlag = false;
      this.colorRedFlag = false;
      this.colorYellowFlag = false;
      this.colorGreenFlag = false;
      this.colorBlueFlag = false;
      this.colorPurpleFlag = false;
      if (this.appliedCat['category1'] === true) {
        this.appliedCatColor = this.appliedCatColor + this.labelNamesData['category1'] + ",";
        this.colorPinkFlag = true;
        //this.appliedCatColor.push('Pink');
      }
      if (this.appliedCat['category2'] === true) {
        this.appliedCatColor = this.appliedCatColor + this.labelNamesData['category2'] + ",";
        this.colorRedFlag = true;
        //this.appliedCatColor.push('Red');
      }
      if (this.appliedCat['category3'] === true) {
        this.appliedCatColor = this.appliedCatColor + this.labelNamesData['category3'] + ",";
        this.colorYellowFlag = true;
        //this.appliedCatColor.push('Yellow');
      }
      if (this.appliedCat['category4'] === true) {
        this.appliedCatColor = this.appliedCatColor + this.labelNamesData['category4'] + ",";
        this.colorGreenFlag = true;
        //this.appliedCatColor.push('Green');
      }
      if (this.appliedCat['category5'] === true) {
        this.appliedCatColor = this.appliedCatColor + this.labelNamesData['category5'] + ",";
        this.colorBlueFlag = true;
        //this.appliedCatColor.push('Blue');
      }
      if (this.appliedCat['category6'] === true) {
        this.appliedCatColor = this.appliedCatColor + this.labelNamesData['category6'] + ",";
        this.colorPurpleFlag = true;
        //this.appliedCatColor.push('Purple');
      }

      //this.appliedCatColor.join(',');
      this.appliedCatColor = this.appliedCatColor.substring(
        0,
        this.appliedCatColor.length
      );

      this.labelColorArr = this.appliedCatColor.split(',');

      //this.appliedCatColor.join(',');
      this.appliedCatColor = this.appliedCatColor.substring(
        0,
        this.appliedCatColor.length - 1
      );

      this.labelColorArr = this.appliedCatColor.split(',');

      this.labelColumnColorArr = this.labelColorArr.slice(0, 2);

      listData.allLabelCat = this.appliedCatColor;


      listData.allLabelPink = this.colorPinkFlag;
      listData.allLabelRed = this.colorRedFlag;
      listData.allLabelYellow = this.colorYellowFlag;
      listData.allLabelGreen = this.colorGreenFlag;
      listData.allLabelBlue = this.colorBlueFlag;
      listData.allLabelPurple = this.colorPurpleFlag;

      listData.labelColorArr = this.labelColorArr;
      listData.labelColumnColorArr = this.labelColumnColorArr;
    });
  }

  private showAssignees() {
    this.groupMemberSubscription$ = this.apiService.getAllGroupMembers(this.utility.groupId).subscribe(groupMembers => {
      this.addAssigneePhotos(this.rowData, groupMembers);
      this.addAssigneeFilter();
    });
  }

  private showBuckets() {
    this.bucketSubscription$ = this.apiService.getBuckets(this.utility.planId).subscribe(buckets => {
      this.addBuckets(this.rowData, buckets);
      this.addBucketFilter();
    });
  }

  private addBucketFilter() {
    this.bucketList = [...new Set(this.rowData.map(item => item.bucket))]
      .filter(i => i !== undefined);
    this.filterBucketList = [...this.bucketList];
  }

  private addAssigneeFilter() {
    this.rowData.forEach((task) => {
      task.assignees?.forEach((assignee) => {
        this.assigneeList.push(assignee.displayName);
      });
    });

    this.assigneeList = [...new Set(this.assigneeList)].filter(a => a != null);
    this.filterAssigneeList = [...this.assigneeList];
  }

  addBuckets(tasks: Task[], buckets: Bucket[]) {
    tasks.forEach(task => {
      const bucket = buckets.find(b => b.id === task.bucketId);
      task.bucket = bucket.name;
    })
  }

  addAssigneePhotos(tasks: Task[], assignees: Assignee[]) {
    tasks.forEach(task => {
      task.assignees.forEach((assignee, i) => {
        const member: Assignee = assignees.filter(a => a.id === assignee.id)[0];
        // for those (Former member) who left the organization already. sometimes the information is not available.
        task.assignees[i] = member ? member : { id: assignee.id, displayName: "Former member" };
      })
    });
  }

  createLabelData(appliedCat) {
    Object.keys(appliedCat)?.forEach((x) => {
      let formatObj = {
        name: x,
        value: appliedCat[x],
      };
      this.labelData.push(formatObj);
    });
    //console.log(this.labelData);
  }

  doExpandCollapse(task: Task) {
    const tasks = $(`#${task.id}`)
      .closest('tr')
      .nextAll(`[class^='${task.relation}']`);
    if (task.expanded) {
      tasks.hide(1000, function () {
        $('.taskList').height(
          $('.task-table').height() - settings.project.taskTable.headerHeight
        ); //Adjust tasklist in the right panel
      });
      this.collapseParents(task);
    } else {
      tasks.show(1000, function () {
        $('.taskList').height(
          $('.task-table').height() - settings.project.taskTable.headerHeight
        ); //Adjust tasklist in the right panel
      });
      this.expandParent(task);
    }
    this.utility.setDatarowExpandCollapseEvent(task);
    // task.expanded = !task.expanded;
  }
  expandParent(task: Task) {
    this.rowData
      ?.filter((t) => t.relation.startsWith(task.relation))
      ?.forEach((t) => (t.expanded = true));
  }
  collapseParents(task: Task) {
    this.rowData
      ?.filter((t) => t.relation.startsWith(task.relation))
      ?.forEach((t) => (t.expanded = false));
  }

  private collapseAllChilds() {
    setTimeout(() => {
      // event.stopPropagation();
      $($("tr[relation='parent'] .arrow.expand").get().reverse()).click();
    }, 500);
  }

  private expandAllChilds() {
    setTimeout(() => {
      // event.stopPropagation();
      $($("tr[relation='parent'] .arrow.collapse").get().reverse()).click();
    }, 500);
  }

  getLabelName(catName) {
    return this.labelNamesData[catName];
  }

  editTaskData(row) {
    this.utility.setTaskData(row);
    this.AddEditModalEmit.emit();
    // console.log('editTaskData', row);
  }

  // onTableScroll() {
  //   if (this.rowData.length > this.dataSource.data.length) {
  //     this.dataSource.data = this.dataSource.data.concat(
  //       this.rowData.slice(
  //         this.dataSource.data.length,
  //         this.dataSource.data.length + settings.project.taskTable.recordPerPage
  //       )
  //     );
  //     //console.log(this.dataSource.data);
  //   }
  // }

  applyFilterBucket(filterValue: string) {
    this.filterBucketList = this.bucketList?.filter((str) => {
      if (str) {
        return str.toLowerCase().indexOf(filterValue.toLowerCase()) >= 0;
      }
    });
  }

  applyFilterStartDate(type: string, filterValue: string) {
    if (type == 'keyup') {
      this.startDateList = this.filterStartDateList?.filter((str) => {
        if (str) {
          return str.format("MM/DD/YYYY").indexOf(filterValue) >= 0;

        }
      });
    } else {
      const datePipe = new DatePipe('en-US');
      const formattedDate = datePipe.transform(filterValue, 'MM/dd/yyyy');


      this.startDateList = this.filterStartDateList?.filter((str) => {
        if (str) {
          return str.format("MM/DD/YYYY").toLowerCase().indexOf(formattedDate.toLowerCase()) >= 0;
        }
      });
    }
  }

  applyFilterEndDate(type: string, filterValue: string) {
    if (type == 'keyup') {
      this.endDateList = this.filterEndDateList?.filter((str) => {
        if (str) {
          return str.format("MM/DD/YYYY").toLowerCase().indexOf(filterValue.toLowerCase()) >= 0;
        }
      });
    } else {
      var dateVar = new DatePipe('en-US');
      var formattedDate = dateVar.transform(filterValue, 'MM/dd/yyyy');

      this.endDateList = this.filterEndDateList?.filter((str) => {
        if (str) {
          return str.format("MM/DD/YYYY").toLowerCase().indexOf(formattedDate.toLowerCase()) >= 0;
        }
      });
    }
  }

  applyFilterAssignee(filterValue: string) {
    this.filterAssigneeList = this.assigneeList?.filter((str) => {
      if (str) {
        return str.toLowerCase().indexOf(filterValue.toLowerCase()) >= 0;
      }
    });
  }

  applyFilterLabel(filterValue: string) {
    this.allLabelList = this.filterLabelList?.filter((str) => {
      if (str) {
        return str.toLowerCase().indexOf(filterValue.toLowerCase()) >= 0;
      }
    });
  }

  onFilterChange(event: any, column: string) {
    this.filterValues[column] = [];
    if (event.value) {
      if (event.value.length) {
        event.value?.forEach((value: string) => {
          this.filterValues[column].push(value);
        });
      }
    }

    this.rowData = this.originalRowData;

    if (this.filterValues.bucket.length) {
      this.rowData = this.rowData?.filter((el) => {
        return this.filterValues.bucket.some((f) => {
          return f === el.bucket;
        });
      });
    }
    if (this.filterValues.assignee.length) {
      this.rowData = this.rowData?.filter((el) => {
        return this.filterValues.assignee.some((f) => {
          // return f === this.getAssignees(el.assignees);
          return this.getAssignees(el.assignees).includes(f);
        });
      });
    }
    if (this.filterValues.startDate.length) {
      this.rowData = this.rowData.filter((el) => {
        if (el.startMoment) {
          return this.filterValues.startDate.some((f) => {
            return f.format("MM/DD/YYYY") === el.startMoment.format("MM/DD/YYYY");
          });
        }
        else {
          return false;
        }
      }
      );
    }
    if (this.filterValues.endDate.length) {
      this.rowData = this.rowData.filter((el) => {
        if (el.dueMoment) {
          return this.filterValues.endDate.some((f) => {
            return f.format("MM/DD/YYYY") === el.dueMoment.format("MM/DD/YYYY");
          });
        }
        else {
          return false;
        }

      });
    }
    if (this.filterValues.label.length) {
      this.rowData = this.rowData.filter((el) => {
        if (el.allLabelCat) {
          return this.filterValues.label.some((f) => {
            return f === el.allLabelCat;
          });
        }
        else {
          return false;
        }
      });
    }
    this.utility.setFilterTasks(this.rowData);
    this.expandAllChilds();
  }

  clear(column: string): void {
    switch (column) {
      case 'bucket':
        this.selectedBucketValue = undefined;
        break;
      case 'startDate':
        this.selectedStartDateValue = undefined;
        break;
      case 'endDate':
        this.selectedEndDateValue = undefined;
        break;
      case 'assignee':
        this.selectedAssigneeValue = undefined;
        break;
      case 'label':
        this.selectedLabelValue = undefined;
        break;
    }
    this.onFilterChange(event, column);
  }

  viewFilterPane(opened, index) {
    this.filterPaneOpened[index] = opened;
    if (opened) {
      document.querySelectorAll<HTMLElement>('.cdk-overlay-pane')[0].style.top = "129px";
    } else {
      document.querySelectorAll<HTMLElement>('.cdk-overlay-pane')[0].style.top = "0px";
    }
  }

  deleteTaskDetail(row) {
    const data = {
      title: "Are you sure?",
      message: "You won't be able to revert this!"
    }
    this.confirmDialogSubscription$ = this.dialogService
      .openConfirmDialog(data)
      .afterClosed()
      .subscribe((res) => {
        if (res) {
          this.deleteSubscription$ = this.apiService
            .deleteTask(row.id)
            .subscribe(
              () => {
                this.deleteSuccess = 'Record deleted successfully!';
                // this.getTaskDetails();
                this.utility.setTaskDeleted(true)
                let action = '';
                this.snackBar.open(this.deleteSuccess, action, {
                  duration: 5000,
                });
              },
              () => {
                this.deleteError = 'Unable to delete record. Please try again!';
                this.utility.setTaskDeleted(true)
                let action = '';
                this.snackBar.open(this.deleteError, action, {
                  duration: 5000,
                });
              }
            );
        }
      });
  }

  addDependency(row) {
    // console.log(row);
    let obj = {
      "data": row,
      "isenable": true
    }
    this.dependencyModalEmit.emit(obj)
  }


  addTaskDataModal(row) {
    // console.log('value of add task', row);

    // this.subtaskModal = true;
    // this.isAddTaskFlag = true;
    // this.addEditModal = false;

    // this.addEditModal = true;
    this.utility.setTaskTableFlag(row);
    this.utility.setparentTaskName(true);
    // this.isAddTaskFlag = true;
    this.parentTaskData = row;
    this.childTaskId = row.id;
    this.parentTaskName = row.title;
    // console.log('addTaskData', this.childTaskId)
    let parentTaskObj = { 'childId': this.childTaskId, 'parentTaskName': this.parentTaskName, 'parentTaskData': this.parentTaskData };
    this.addSubTaskModalEmit.emit(parentTaskObj);
    // this.isEditTaskFlag = false;
  }

  closeAddEditModal($event) {
    // console.log('close flag', $event);
    this.addEditModal = $event;
    this.isEditTaskFlag = false;
    this.addEditModal = false;

  }

  exportToExcel() {
    this.dialogService.openExportDialog().subscribe((data) => {

      var exportArray = [];
      let assigneeNames = '';
      const fromdate = new Date(data.startDateSelected);
      const todate = new Date(data.endDateSelected);

      for (var i = 0; i < this.originalRowData.length; i++) {
        assigneeNames = '';


        if (this.originalRowData[i].startMoment) {
          var startdate = new Date(
            this.originalRowData[i].startMoment.format('MM/DD/YYYY')
          );
        }
        // else if(this.originalRowData[i].startMoment == null){
        //   this.originalRowData[i].startMoment==" no date ";
        // }

        if (this.originalRowData[i].dueMoment) {
          var enddate = new Date(
            this.originalRowData[i].dueMoment.format('MM/DD/YYYY')
          );
        }
        // else if(this.originalRowData[i].dueMoment == null){
        //   this.originalRowData[i].dueMoment==" no date ";
        // }


        if (
          (!data.startDateSelected && !data.endDateSelected) ||
          (!data.endDateSelected && startdate >= fromdate) ||
          (!data.startDateSelected && enddate <= todate) ||
          (startdate >= fromdate && startdate <= todate && enddate >= fromdate && enddate <= todate)
        ) {

        }
        else {
          continue;
        }


        for (var j = 0; j < this.originalRowData[i].assignees.length; j++) {
          if (j == this.originalRowData[i].assignees.length - 1)
            assigneeNames += this.originalRowData[i].assignees[j].displayName;
          else
            assigneeNames +=
              this.originalRowData[i].assignees[j].displayName + ', ';
        }
        var obj: any = {};
        obj.TaskName = this.originalRowData[i].title;

        if (data.bucketEnabled) {
          obj.Bucket = this.originalRowData[i].bucket;

        }
        else if (data.bucketEnabled && this.originalRowData[i].bucket == null) {
          obj.Bucket = ""
        }

        if (data.startDateEnabled && this.originalRowData[i].startMoment) {
          obj.StartDate = this.originalRowData[i].startMoment.format(
            'MM/DD/YYYY'
          );
        }
        else if (data.startDateEnabled && this.originalRowData[i].startMoment == null) {
          obj.StartDate = " ";

        }
        if (data.endDateEnabled && this.originalRowData[i].dueMoment) {
          obj.EndDate = this.originalRowData[i].dueMoment.format('MM/DD/YYYY');
        }
        else if (data.endDateEnabled && this.originalRowData[i].dueMoment == null) {
          obj.EndDate = " ";

        }
        if (data.assgineeEnabled) {
          obj.Assignee = assigneeNames;
        }
        else if (data.assgineeEnabled && assigneeNames == null) {
          obj.Assignee = " ";

        }
        if (data.labelEnabled && this.originalRowData[i].allLabelCat) {
          obj.Label = this.originalRowData[i].allLabelCat;
        }
        else if (data.labelEnabled && this.originalRowData[i].allLabelCat == null) {
          obj.Label = " ";

        }
        exportArray.push(obj);
      }

      this.excelService.exportAsExcelFile(exportArray, 'task-details');

      this.utility.setExcelUploadFlag(false);
    }
    );

  }

  // isActionAllowed(actionName) {
  //   return this.utility.isActionAllowed(actionName);
  // }

  ngOnDestroy() {
    this.utility.unsubscribe(this.parentNameSubscription$);
    this.utility.unsubscribe(this.labelSubscription$);
    this.utility.unsubscribe(this.excelUploadSubscription$);
    this.utility.unsubscribe(this.confirmDialogSubscription$);
    this.utility.unsubscribe(this.deleteSubscription$);
    this.utility.unsubscribe(this.groupMemberSubscription$);
    this.utility.unsubscribe(this.bucketSubscription$);
  }
}
