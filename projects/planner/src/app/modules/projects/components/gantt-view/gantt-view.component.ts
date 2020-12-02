import { Component, OnInit, ElementRef, ViewChild, ChangeDetectorRef } from '@angular/core';
import { AddEditTaskComponet } from '../AddEditTask/add-edit-task.component';
import { FormControl } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { MatTabChangeEvent } from '@angular/material/tabs';
import { Title } from '@angular/platform-browser';
import { Subscription } from 'rxjs';
import { UtilityService } from '../../../../shared/services/utility.service';
import { ApiService } from '../../../../api.service';
import { Resource } from '../../../../models/resource.model';
import { Assignment } from '../../../../models/assignment.model';
import { settings } from '../../../../contents/config';
import { Assignee } from '../../../../models/assignee.model';
import { Task } from '../../../../models/task.model';
// import * as jsPDF from 'jspdf'
declare var $: any;



@Component({
  selector: 'app-gantt-view',
  templateUrl: './gantt-view.component.html',
  styleUrls: ['./gantt-view.component.scss']
})

export class GanttViewComponent implements OnInit {
  panelOpenState = false;
  displayedColumns: string[] = ['bucket', 'start date', 'end date', 'assignee', 'label'];
  viewAllColumns = new FormControl();
  projectName: any;
  showResourceManagement: boolean = false;

  selectedDisplayedColumns: string[] = ['bucket', 'start date', 'end date', 'assignee'];


  selectedTab: any;
  selectedColumns: any = ['description', 'bucket', 'start date', 'end date', 'assignee'];
  childId: any;
  parameterSubscription$: Subscription;
  tableSubscription$: Subscription;

  offsetRight: number;
  isAddTaskFlag = false;
  isEditTaskFlag = false;
  selectedIndex: any;
  filteredColumns = "description";
  taskTableFlag = true;
  addEditModal = false;
  dependencyModalFlag = false;
  showHideViewPanel: boolean = true;
  columnViewerOpened: boolean = false;
  exportViewerOpened: boolean = false;
  groupId: any;
  parentTaskName: any;
  routeSubscription$: Subscription;
  dependecyTableData: any;
  dependentData: any;
  parentTaskData: any;
  currentRole: string;
  roleActions: any[];
  groupMembers: any;
  resourceSubscription$: Subscription;
  allTasks: string | Task[];
  allTasksSubscription$: Subscription;
  deleteTaskSubscription$: Subscription;
  addTaskSubscription$: Subscription;
  dependencyModalFlagSubscription$: Subscription;
  taskLoading: boolean;
  firstTimeLoading: boolean;
  viewFlag: boolean;
  groupMembersSubscription$: Subscription;
  errorSubscription$: Subscription;
  triggerResouces$: Subscription;
  resourceLoaded = false;

  constructor(public cd: ChangeDetectorRef,
    public utility: UtilityService,
    public router: Router,
    public activatedRoute: ActivatedRoute,
    private titleService: Title,
    private apiSer: ApiService
  ) { }

  @ViewChild("container") container: ElementRef;
  @ViewChild("left") leftPane: ElementRef;
  @ViewChild("right") rightPane: ElementRef;
  @ViewChild("handle") handle: ElementRef;
  @ViewChild(AddEditTaskComponet, { static: false }) taskModelComp: AddEditTaskComponet;
  @ViewChild('tabGroup') tabGroup;


  clear() {
    localStorage.clear();
  }

  closeResourceManagement() {
    this.showResourceManagement = false;
  }

  onClick() {
    this.utility.setShowHideResourceDetails(false);
  }

  onScroll() {
    this.leftPane.nativeElement.scrollTop = this.rightPane.nativeElement.scrollTop;
    this.utility.setHeaderTop(this.rightPane.nativeElement.scrollTop);
    $(".availability-table").scrollLeft(this.rightPane.nativeElement.scrollLeft); //common scrollbar
  }

  ngAfterViewInit() {
    this.errorSubscription$ = this.utility.triggerError().subscribe(err => {
      if (!Object.keys(err).length) return;
      const message = err as string
      if (message.includes("Tasks/GetAll"))
        this.taskLoading = false;
    });


    if (this.allTasks && this.allTasks.length) {
      this.handle.nativeElement.onclick = () => {
        // console.log("clicked")
        event.stopPropagation();
      }
    }
  }

  ngOnInit() {
    this.firstTimeLoading = true;
    this.routeSubscription$ = this.activatedRoute.params.subscribe((params) => {
      this.utility.groupId = params['groupId'];
      this.utility.planId = params['projectId'];
      this.titleService.setTitle(params["title"]);
      // this.selectedIndex = this.utility.getTabIndex(settings.tabs, params["id"]);
      this.projectName = params["projectId"];
      this.groupId = params["groupId"];
      if (params["id"] == 'Tasks') {
        this.showHideViewPanel = false;
      }
      else {
        this.showHideViewPanel = true;
      }
      this.loadTasks();
      this.deleteTaskSubscription$ = this.utility.getTaskDeleted().subscribe(flag => {
        if (flag)
          this.loadTasks();
      })
      this.addTaskSubscription$ = this.utility.reloadTasks().subscribe(flag => {
        if (flag)
          this.loadTasks();
      })
      this.dependencyModalFlagSubscription$ = this.utility.getdependencyModalFlag().subscribe(flag => {
        if (flag) {
          this.loadTasks();
        }
      });
    });
    this.triggerResouces$ = this.utility.triggerResources().subscribe(resp => {
      this.restoreResources();
    })
  }

  private restoreResources() {
    this.resourceLoaded = false;
    this.resourceSubscription$ = this.apiSer.getResources(this.utility.planId).subscribe(resources => {
      this.setResourcesPhotos(resources);
      this.setAvailabilityData(resources);
      this.resourceLoaded = true;
    });
  }

  setResourcesPhotos(resources) {
    if (resources[0].hasOwnProperty('photo')) return;
    this.groupMembersSubscription$ = this.apiSer.getAllGroupMembers(this.utility.groupId).subscribe(groupMembers => {
      this.utility.addAssigneeInfo(resources, groupMembers);
      resources.sort((a, b) => (a.displayName > b.displayName ? 1 : -1));
      this.setUserPhoto(groupMembers);
    });
  }

  setUserPhoto(groupMembers: Assignee[]) {
    const userProfile = JSON.parse(sessionStorage.getItem("user-profile"));
    if (!userProfile) return;
    const member = groupMembers.find(m => m.id === userProfile.id)
    userProfile.photo = member ? member.photo || null : null;
    sessionStorage.setItem("user-profile", JSON.stringify(userProfile));
  }

  setAvailabilityData(resources) {
    if (resources[0].hasOwnProperty('dayWiseTasks')) return;

    this.parameterSubscription$ = this.utility.getParameters().subscribe(params => {
      if (!params || !params["days"])
        return;
      resources.forEach(resource => {
        resource.dayWiseTasks = this.initDayWiseTasks(params["days"]);
        this.addAvailabilityData(resource);
      });

      const key = "all-resources";
      const allResources = JSON.parse(sessionStorage.getItem(key)) || {};
      allResources[this.utility.planId] = resources;
      sessionStorage.setItem(key, JSON.stringify(allResources));
    });
  }

  addAvailabilityData(resource: Resource) {
    resource.tasks.forEach(task => {
      let days = this.utility.getCalenderDays(
        this.utility.isoDateToMoment(task["startDateTime"]),
        this.utility.isoDateToMoment(task["dueDateTime"]));
      days.forEach(day => {
        let d = resource.dayWiseTasks.
          filter(i => i.date === `${day["dayValue"]}/${day["monthValue"]}/${day["year"]}`)[0];
        if (d) {
          d.taskCount += d.isOffday ? 0 : 1;
          d.hourCount += d.isOffday ? 0 : task["hours"];
          if (!d.isOffday)
            d.tasks.push({ title: task.title, hours: task["hours"] });
        }
      });
    });
  }

  initDayWiseTasks(days: []): any {
    let assignments: Array<Assignment> = [];
    days.forEach(day => {
      let dayname: string = day["dayName"];
      let assignment: Assignment = {
        // class: settings.project.offDays.includes(dayname.toLowerCase()) ? "offday" : "working-day",
        isOffday: settings.project.offDays.includes(dayname.toLowerCase()),
        date: `${day["dayValue"]}/${day["monthValue"]}/${day["year"]}`,
        taskCount: 0,
        hourCount: 0,
        tasks: [{ title: "", hours: 0 }],
        totalHours: 0
      }
      assignment.tasks.shift()
      assignments.push(assignment)
    })
    return assignments;
  }


  loadTasks() {
    if (!(this.utility.groupId)) return;
    this.taskLoading = true;
    this.allTasksSubscription$ =
      this.apiSer.getAllTasks()
        .subscribe(tasks => {
          this.taskLoading = false;
          this.allTasks = tasks;
          this.cd.detectChanges();

          this.parameterSubscription$ = this.utility.getParameters().subscribe(params => {
            if (Object.keys(params).length === 0) return;
            const todayLength = parseInt(params["todayIndex"]) * parseInt(params["dayWidth"]);
            setTimeout(() => {
              this.focusTodayIndicator(todayLength);
              this.utility.dragElement(
                this.handle.nativeElement,
                this.leftPane.nativeElement,
                this.rightPane.nativeElement);
            }, 1000)
          });
        },
          () => {
            this.allTasks = [];
            this.taskLoading = false
          })
  }

  /// Today indicator will in focus only for first time loading
  private focusTodayIndicator(todayLength: number) {
    if (!this.firstTimeLoading) return
    this.firstTimeLoading = false;
    const rightPaneWidth = this.rightPane.nativeElement.clientWidth;
    this.rightPane.nativeElement.scrollLeft += todayLength - (rightPaneWidth / 2);
  }

  toggleResourceManagement(event) {
    event.stopPropagation();
    this.showResourceManagement = !this.showResourceManagement
  }
  // onTablePagination(){
  //   console.log("Hello")
  //   this.commonService.notifyOther({option: 'call_child', value: 'From child'});
  // }
  isResizing: boolean = false;
  lastDownX: number = 0;

  addTaskModal() {
    this.addEditModal = true;
    // console.log('add task modal');
    this.isEditTaskFlag = false;
    this.isAddTaskFlag = true;
    // $(".add-task-modal").css("display", "block");
  }

  editTaskModal() {
    this.addEditModal = false;
    this.dependencyModalFlag = false;
    setTimeout(() => this.addEditModal = true, 100)

    // console.log('edit task modal');
    this.isEditTaskFlag = true;
    this.isAddTaskFlag = false;
    // $(".add-task-modal").css("display", "block");
  }

  subTaskModal(event) {
    // console.log(event)
    this.childId = event.childId;
    this.parentTaskName = event.parentTaskName;
    this.parentTaskData = event.parentTaskData;
    this.addEditModal = false;
    this.dependencyModalFlag = false;
    setTimeout(() => this.addEditModal = true, 100)
    // console.log('sub task modal', this.childId);
    this.isEditTaskFlag = false;
    this.isAddTaskFlag = true;
  }

  dependencyModal(event) {
    // this.dependencyModalFlag = event.isenable;
    this.dependencyModalFlag = false;
    setTimeout(() => this.dependencyModalFlag = true, 100)
    // console.log(event.data);
    this.dependentData = event.data;
    this.addEditModal = false;
  }


  closeAddEditModal($event) {
    this.addEditModal = $event;

  }

  closeDependenceModal($event) {
    // console.log('dp table modal', $event);
    this.dependencyModalFlag = $event.isEnable;
  }

  tabChanged(tabChangeEvent: MatTabChangeEvent) {
    // console.log(this.projectName)
    this.router.navigate(["projects/" + this.groupId + this.projectName + '/' + tabChangeEvent.tab['textLabel']]);
  }

  showColumns(event) {
    this.selectedColumns = [this.filteredColumns];
    // console.log('showColumns', event)
    if (event.type != 'click') {
      event.source.value.forEach(element => {
        this.selectedColumns.push(element);
        this.viewFlag = !this.viewFlag
        this.utility.setViewDropdownFlag(this.viewFlag);
        // console.log("inside", this.viewFlag)

      });

      //this.selectedColumns = event.source.value;
    }
    this.viewFlag = false;


  }

  clearView(type: string) {
    if (type == 'view') {
      this.selectedDisplayedColumns = [];
      this.showColumns(event);
    }
  }

  toggleColumnViewer(event) {
    this.columnViewerOpened = event;
    document.querySelectorAll<HTMLElement>('.cdk-overlay-pane')[0].style.left = "initial";
    document.querySelectorAll<HTMLElement>('.cdk-overlay-pane')[0].style.right = "18rem";
  }


  toggleExportViewer(event) {
    this.exportViewerOpened = event;
  }

  exportPNG() {
    const config = this.getStates()
    this.setExportableStates();
    this.utility.printToImage($(".wrapper")[0], 'gantt-chart', this.resetStates, config);
    // this.resetStates(config);


    // const wrapper = document.getElementsByClassName('wrapper')[0];
    // this.utility.printToImage(wrapper, 'wrapper');
  }

  private resetStates(config: { leftPanel: { width: any; }; rightPanel: { width: any; scrollLeft: any; }; wrapper: { width: any; height: any; border: string; }; }) {
    $("#left_panel").width(config.leftPanel.width);
    $("#right_panel").width(config.rightPanel.width);
    $("#right_panel").scrollLeft(config.rightPanel.scrollLeft);
    $(".wrapper").css({ "width": config.wrapper.width, "height": config.wrapper.height, "border": config.wrapper.border });

    $("#left_panel").css("overflow-x", 'scroll');
    $("#right_panel").css("overflow", 'scroll');
    console.log("Export completed")
  }

  private setExportableStates() {
    const tableWidth = $('.task-table').width();
    const lastColumnWidth = $('tbody > tr:first > td:last').width();
    const leftPanelWidth = tableWidth - lastColumnWidth - 5;
    const rightPaneWidth = $('.header').width();

    $(".wrapper").css({ "width": leftPanelWidth + rightPaneWidth, "height": "auto", "border": "2px dotted gray" });
    $("#left_panel").width(leftPanelWidth); //15px for margin
    $("#right_panel").width(rightPaneWidth).scrollLeft(0);

    $("#left_panel").css("overflow-x", 'hidden');
    $("#right_panel").css("overflow", 'hidden');
  }

  private getStates() {
    return {
      leftPanel: {
        width: $("#left_panel").width()
      },
      rightPanel: {
        width: $("#right_panel").width(),
        scrollLeft: $("#right_panel").scrollLeft()
      },
      wrapper: {
        width: $(".wrapper").width(),
        height: $(".wrapper").height(),
        border: 'none'
      }
    };
  }

  exportToExcel() {

    this.utility.setExcelUploadFlag(true);

  }

  ngOnDestroy() {
    this.utility.unsubscribe(this.parameterSubscription$);
    this.utility.unsubscribe(this.tableSubscription$);
    this.utility.unsubscribe(this.routeSubscription$);
    this.utility.unsubscribe(this.resourceSubscription$);
    this.utility.unsubscribe(this.allTasksSubscription$);
    this.utility.unsubscribe(this.addTaskSubscription$);
    this.utility.unsubscribe(this.deleteTaskSubscription$);
    this.utility.unsubscribe(this.groupMembersSubscription$);
    this.utility.unsubscribe(this.dependencyModalFlagSubscription$);
    this.utility.unsubscribe(this.errorSubscription$);
    this.utility.unsubscribe(this.triggerResouces$);

  }
}

