import { Injectable } from '@angular/core';
import * as moment from 'moment';
import { Observable, BehaviorSubject, Subscription, of } from 'rxjs';
import { Dependency } from '../../models/dependency.model';
import { Resource } from '../../models/resource.model';
import { RestrictedActions } from '../../models/enums';
import { settings } from '../../contents/config';
import { Task } from '../../models/task.model';
import { Assignment } from '../../models/assignment.model';
import domtoimage from 'dom-to-image';
import { Assignee } from '../../models/assignee.model';



// import { $ } from 'protractor';
declare var $: any;



@Injectable({
  providedIn: 'root'
})
export class UtilityService {
  dependencies: Dependency[];
  parameters: any;
  resources: Resource[];


  groupId: any;
  planId: any;
  restrictedActions = RestrictedActions;

  projectStartDate: moment.Moment;
  projectDueDate: moment.Moment;
  calenderStartDate: moment.Moment;
  calenderEndDate: moment.Moment;


  profileDpName(name: string) {
    if (!name) return;
    const token = name.replace("(Trianz)", "").trim().toUpperCase().split(' ');
    return token.length > 1 ? token[0][0] + token[token.length - 1][0] : token[0].substring(0, 2);
  }

  setUserBg(name) {
    if (!name) return;
    return { "background-color": this.stringToColour(name) };
  }

  isNoLoadAPI(url: string): boolean {
    return settings.noLoaderAPIs              //list of No Load API
      .filter(api => url.toLowerCase()
        .indexOf(api.toLowerCase()) >= 0)   //Filter matching API
      .length > 0                             //return true if exists
  }

  manipulateData(tasks: Task[]): Task[] {
    const flattenTasks = this.flatten(tasks);
    this.dependencies?.forEach(dependency => {
      dependency.predecessorIndex = this.getTaskIndex(dependency.parentTaskId, flattenTasks);
      dependency.successorIndex = this.getTaskIndex(dependency.taskId, flattenTasks);
    })
    return flattenTasks
  }

  getTaskIndex(taskId: string, tasks: Task[]): number {
    return tasks?.map(function (task) { return task.id; }).indexOf(taskId);
  }



  private setMoment(task: Task) {
    task.startMoment = task.startDate ? this.stringToDate(task.startDate, 'DD/MM/YYYY hh:mm:ss') : null;
    task.dueMoment = task.dueDate ? this.stringToDate(task.dueDate, 'DD/MM/YYYY hh:mm:ss') : null;
    task.startDate = task.startDate ? task.startMoment.format("DD/MM/YYYY") : "";
    task.dueDate = task.dueDate ? task.dueMoment.format("DD/MM/YYYY") : "";
  }

  getPopupMaxLeft(popupWidth: number): number {
    return $('#right_panel').position().left
      + $('#right_panel').width()
      - popupWidth
      - settings.project.ganttChart.scrollbarWidth
  }

  setZeroTime(date: moment.Moment): moment.Moment {
    return date.set({ hour: 0, minute: 0, second: 0, millisecond: 0 });
  }
  getMinimumValue(tasks: Task[]): moment.Moment {
    const filteredTasks = tasks.filter(task => task.startMoment !== null)
    return this.setZeroTime(moment.min(filteredTasks.map(task => task.startMoment)));

  }
  getMaximumValue(tasks: Task[]): moment.Moment {
    const filteredTasks = tasks.filter(task => task.dueMoment !== null)
    return this.setZeroTime(moment.max(filteredTasks.map(task => task.dueMoment)));
  }

  getToday(): any {
    return moment();//.add(-10, 'days');
  }

  getDistinctMonths(days: any[], year: any) {
    //days for the perticular year
    const yearDays = days.filter(day => day["year"] === year)
    //distinct month name for the year
    const distinctMonths = [...new Set(yearDays?.map(day => day["monthName"]))];
    //array of month with their names and width (number of days * cellWidth)
    return distinctMonths?.map(month => { return { name: month, width: yearDays.filter(day => day.monthName === month).length * settings.project.ganttChart.dayWidth } });
  }

  getDistinctYears(days: any[]): any[] {
    return [...new Set(days?.map(day => day["year"]))]
  }

  getCalenderDays(startDate: moment.Moment, endDate: moment.Moment) {
    const diff = endDate.diff(startDate, "days")
    const days = [];

    for (let i = 0; i <= diff; i++) {
      let dateStart = startDate.clone();
      dateStart.add(i, 'days');
      days.push({
        dayName: dateStart.format('dd'),
        dayValue: dateStart.format('D'),
        monthName: dateStart.format('MMMM'),
        monthValue: dateStart.format('MM'),
        year: dateStart.format('YYYY')
      })
    }

    return days;
  }

  setCalenderEndDate(date: moment.Moment) {
    date.add(settings.project.ganttChart.extraDays, 'days');
    if (date.date() < settings.project.ganttChart.calenderMonthWidth)
      date.add(settings.project.ganttChart.calenderMonthWidth - date.date(), "days") //Extra days to fit the month name at the end (if needed)
    this.calenderEndDate = date;
  }

  setCalenderStartDate(date: moment.Moment) {
    date.add(-settings.project.ganttChart.extraDays, 'days');
    const diff = date.clone().endOf('month').diff(date, 'days') + 1;
    if (diff < settings.project.ganttChart.calenderMonthWidth) {
      date.add(diff - settings.project.ganttChart.calenderMonthWidth, "days");
    }
    this.calenderStartDate = date
  }

  stringToDate(sDate: string, format: string = settings.dateFormat): moment.Moment {
    return moment(sDate, format);
    // return date.toDate();
  }
  isoDateToMoment(date: string): moment.Moment {
    return moment(new Date(date), settings.dateFormat);
  }

  getDateDifference(startDate: string, endDate: string, format: string, unit): number {
    return this.stringToDate(endDate, format)
      .diff(this.stringToDate(startDate, format), unit)
  }

  getMomentDifference(startMoment: moment.Moment, endMoment: moment.Moment, unit) {
    return startMoment.diff(endMoment, unit, true)
  }

  // function is used for dragging and moving
  dragElement(separator, leftPanel, rightPanel, direction = "H") {
    let mouseDownInfo; // remember mouse down info
    separator.onmousedown = onMouseDown;

    function onMouseDown(e) {
      mouseDownInfo = {
        e,
        offsetLeft: separator.offsetLeft,
        offsetTop: separator.offsetTop,
        leftWidth: leftPanel.offsetWidth,
        rightWidth: rightPanel.offsetWidth
      };
      document.onmousemove = onMouseMove;
      document.onmouseup = () => {
        document.onmousemove = document.onmouseup = null;
      }
    }

    function onMouseMove(e) {
      const delta = {
        x: e.clientX - mouseDownInfo.e.x,
        y: e.clientY - mouseDownInfo.e.y
      };

      if (direction === "H") // Horizontal
      {
        // prevent negative-sized elements
        delta.x = Math.min(Math.max(delta.x, -mouseDownInfo.leftWidth),
          mouseDownInfo.rightWidth);

        separator.style.left = (mouseDownInfo.offsetLeft + delta.x) + "px";
        leftPanel.style.width = (mouseDownInfo.leftWidth + delta.x) + "px";
        rightPanel.style.width = (mouseDownInfo.rightWidth - delta.x) + "px";

        $('.resource-table').css("width", leftPanel.style.width);
        $('.availability-table').css({
          left: $("#right_panel").position().left + "px",
          width: $("#right_panel").width() + "px"
        });
      }
    }
  }

  printToImage(node, imageName = "image", callback, config) {
    domtoimage.toPng(node)
      .then(function (dataUrl) {
        var link = document.createElement('a');
        link.download = `${imageName}.png`;
        link.href = dataUrl;
        link.click();
        callback(config)
      })
      .catch(function (error) {
        console.error('oops, something went wrong!', error);
        callback(config)
      });
  }

  hasSubtasks(task: Task) {
    return task['subTasks']?.length ? true : false;
  }

  getNestedChildren(arr, parent) {
    var out = [];
    arr?.forEach(element => {
      if (element.parent === parent) {
        const children = this.getNestedChildren(arr, element.id);
        if (children.length) {
          element.children = children
        }
        out.push(element);
      }
    });

    return out
  }

  //   unflatten(array){
  //     var map = {};
  //     for(var i = 0; i < array.length; i++){
  //         var obj = array[i];
  //         obj.children= [];

  //         map[obj.Id] = obj;

  //         var parent = obj.parentTaskId || '-';
  //         if(!map[parent]){
  //             map[parent] = {
  //                 children: []
  //             };
  //         }
  //         map[parent].children.push(obj);
  //     }

  //     return map['-'].children;

  // }

  isActionAllowed(action) {
    const key = 'user-profile';
    const profile = JSON.parse(sessionStorage.getItem(key));
    const actions = profile["actions"];
    return actions?.includes(action);
    // return true;
  }

  unflatten(arr) {
    var tree = [],
      mappedArr = {},
      arrElem,
      mappedElem;

    // First map the nodes of the array to an object -> create a hash table.
    for (var i = 0, len = arr.length; i < len; i++) {
      arrElem = arr[i];
      mappedArr[arrElem.id] = arrElem;
      mappedArr[arrElem.id]['children'] = [];
    }

    for (var id in mappedArr) {
      if (mappedArr.hasOwnProperty(id)) {
        mappedElem = mappedArr[id];
        // If the element is not at the root level, add it to its parent array of children.
        if (mappedElem.parentTaskId) {
          mappedArr[mappedElem['parentTaskId']]['children'].push(mappedElem);
        }
        // If the element is at the root level, add it to first level elements array.
        else {
          tree.push(mappedElem);
        }
      }
    }
    return tree;
  }

  flatten(tasks: Task[]): Task[] {
    const taskList = []
    const dependencies: Dependency[] = []
    const printNode = (node) => {
      this.setMoment(node); //store moment data from date
      node.expanded = true;
      const clone = Object.assign({}, node);
      delete (clone.subTasks);
      taskList.push(clone);
      node.dependancies?.forEach(dependency => {
        dependencies.push(dependency);
      });
    };
    const recurse = (node) => {
      const parent = node;
      if (node.subTasks?.length) {//check if there is any child
        node.hierarchy = 'parent';
        // node.relation = 'parent';
        printNode(node);
        node.subTasks?.forEach((element, idx: number) => {
          // element.hierarchy = 'parent';
          element.relation = `${parent.relation}-${idx + 1}`;
          recurse(element);
        })
      }
      else {
        // node.relation = "child"
        node.hierarchy = "child";
        printNode(node);
      }
    };

    tasks?.forEach((element, idx: number) => {
      if (element.subTasks?.length) {
        element.hierarchy = 'parent';
        element.relation = `parent-${String(idx + 1).padStart(4, '0')}`; //used 4 digit index to avoid conflicts with other parent
        recurse(element)
      }
      else if (!element.subTasks?.length) {
        element.relation = "normal";
        element.hierarchy = "normal";
        printNode(element);
      }
      else {
        element.relation = "child";
        element.hierarchy = "child";
        printNode(element);
      }
    });
    this.dependencies = dependencies;
    return taskList;
  }

  getObjectProperty(obj: string, property: string) {
    return parseInt($(obj).css(property));
  }

  stringToColour(str: string) {
    var hash = 0;;
    for (var i = 0; i < str.length; i++) {
      hash = str.charCodeAt(i) + ((hash << 5) - hash);
    }
    var colour = '#';
    for (var i = 0; i < 3; i++) {
      var value = (hash >> (i * 8)) & 0xFF;
      colour += ('00' + value.toString(16)).substr(-2);
    }
    return colour;
  }

  unsubscribe(subscription$: Subscription) {
    subscription$?.unsubscribe();
  }


  addAssigneeInfo(resources: any, groupMembers: Assignee[]) {
    resources.forEach((resource, i) => {
      const member: Assignee = groupMembers.find(m => m.id === resource.id);
      if (member) {
        resource.displayName = member.displayName;
        resource.email = member.email;
        resource.photo = member.photo;
      }
      else {
        resource.displayName = "Former member";
        resource.email = "";
        resource.photo = null;
      }
    });
  }



  constructor() { }

  /*************************************
   * Different Observables
   *************************************/

  private parameters$ = new BehaviorSubject({})
  setParameters(value: any) {
    this.parameters = value;
    this.parameters$.next(value);
  }
  getParameters(): Observable<{}> {

    return this.parameters ? of(this.parameters) : this.parameters$.asObservable();
  }

  private taskManipulatedDData$ = new BehaviorSubject([]);
  setTaskManipulatedData(value) {
    this.taskManipulatedDData$.next(value);
  }
  getTaskManipulatedData(): Observable<any[]> {
    return this.taskManipulatedDData$.asObservable();
  }

  private headerWidth$ = new BehaviorSubject("")
  getHeaderWidth(): Observable<string> {
    return this.headerWidth$.asObservable();
  }
  setHeaderWidth(value: string) {
    this.headerWidth$.next(value);
  }

  private parentTaskName$ = new BehaviorSubject(false)
  getparentTaskName(): Observable<boolean> {
    return this.parentTaskName$.asObservable();
  }
  setparentTaskName(value: boolean) {
    this.parentTaskName$.next(value);
  }

  private datarowExpandCollaple$ = new BehaviorSubject(new Task())
  getDatarowExpandCollapseEvent(): Observable<Task> {
    return this.datarowExpandCollaple$.asObservable();
  }
  setDatarowExpandCollapseEvent(value: Task) {
    this.datarowExpandCollaple$.next(value);
  }
  /* for edit task */
  private taskData$ = new BehaviorSubject({})
  setTaskData(value: any) {
    this.taskData$.next(value);
  }
  getTaskData(): Observable<{}> {
    return this.taskData$.asObservable();
  }

  /* for add task */
  private taskTableflag = new BehaviorSubject(false)
  setTaskTableFlag(value: any) {
    this.taskTableflag.next(value);
  }
  getTaskTableFlag(): Observable<boolean> {
    return this.taskTableflag.asObservable();
  }

  private dependencyUpdate$ = new BehaviorSubject(false)
  getdependencyUpdate(): Observable<boolean> {
    return this.dependencyUpdate$.asObservable();
  }
  setdependencyUpdate(value: boolean) {
    this.dependencyUpdate$.next(value);
  }

  private dependencyModalClose$ = new BehaviorSubject(false);
  getdependencyModalFlag(): Observable<boolean> {
    return this.dependencyModalClose$.asObservable();
  }
  setdependencyModalFlag(value: boolean) {
    this.dependencyModalClose$.next(value);
  }

  private excelUploadFlag = new BehaviorSubject(false)
  setExcelUploadFlag(value: any) {
    this.excelUploadFlag.next(value);
  }
  getExcelUploadFlag(): Observable<boolean> {
    return this.excelUploadFlag.asObservable();
  }


  private commentsSearch = new BehaviorSubject('')
  setCommentsSearch(value: any) {
    this.commentsSearch.next(value);
  }
  getCommentsSearch(): Observable<any> {
    return this.commentsSearch.asObservable();
  }

  private lineClicked$ = new BehaviorSubject({})
  setLineClicked(value: any) {
    this.lineClicked$.next(value);
  }
  getLineClicked(): Observable<any> {
    return this.lineClicked$.asObservable();
  }

  headerTop$ = new BehaviorSubject(0);
  setHeaderTop(value: number) {
    this.headerTop$.next(value);
  }
  getHeaderTop(): Observable<number> {
    return this.headerTop$.asObservable();
  }

  /* for taskmanagement */
  private assigneeData$ = new BehaviorSubject({})
  setAssigneeData(value: any) {
    this.assigneeData$.next(value);
  }
  getAssigneeData(): Observable<{}> {
    return this.assigneeData$.asObservable();
  }

  /* for taskmanagement startdate and dueDate */
  private startDateTaskManagement$ = new BehaviorSubject({})
  setDateTaskManagement(value: any) {
    this.startDateTaskManagement$.next(value);
  }
  getDateTaskManagement(): Observable<{}> {
    return this.startDateTaskManagement$.asObservable();
  }

  private assignment$ = new BehaviorSubject({})
  setAssignment(value: Assignment) {
    this.assignment$.next(value);
  }
  getAssignment(): Observable<{}> {
    return this.assignment$.asObservable();
  }

  private showHideResourceDetails$ = new BehaviorSubject(false);
  setShowHideResourceDetails(value: boolean) {
    this.showHideResourceDetails$.next(value);
  }
  showHideResourceDetails(): Observable<boolean> {
    return this.showHideResourceDetails$.asObservable();
  }

  private taskDeleted$ = new BehaviorSubject(false);
  setTaskDeleted(value: boolean) {
    this.taskDeleted$.next(value);
  }
  getTaskDeleted(): Observable<boolean> {
    return this.taskDeleted$.asObservable();
  }

  private viewDropdownFlag$ = new BehaviorSubject(false)
  setViewDropdownFlag(value: boolean) {
    this.viewDropdownFlag$.next(value);
  }
  getViewDropdownFlag(): Observable<boolean> {
    return this.viewDropdownFlag$.asObservable();
  }

  private reloadTask$ = new BehaviorSubject(false);
  triggerReloadTasks(value: boolean) {
    this.reloadTask$.next(value);
  }
  reloadTasks(): Observable<boolean> {
    return this.reloadTask$.asObservable();
  }

  private error$ = new BehaviorSubject({});
  setError(value: any) {
    this.error$.next(value);
  }
  triggerError(): Observable<any> {
    return this.error$.asObservable();
  }

  private filteredTasks$ = new BehaviorSubject([]);
  setFilterTasks(value: any[]) {
    this.filteredTasks$.next(value);
  }
  getFilteredTasks(): Observable<any[]> {
    return this.filteredTasks$.asObservable();
  }

  private resources$ = new BehaviorSubject(false);
  resourcesUpdated(value: boolean) {
    this.resources$.next(value);
  }
  triggerResources(): Observable<boolean> {
    return this.resources$.asObservable();
  }

}
