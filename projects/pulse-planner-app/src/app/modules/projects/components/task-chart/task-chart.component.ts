import { Component, OnInit, ViewChild, ElementRef, ViewEncapsulation, Output, EventEmitter } from '@angular/core';
import { settings } from '../../../../contents/config';
import { Dependency } from '../../../../models/dependency.model';
import { AccessorType, Direction, LineDirection } from '../../../../models/enums';
import { Task } from '../../../../models/task.model';
import { UtilityService } from '../../../../shared/services/utility.service';
import { Subscription } from 'rxjs';

declare var $: any;
// import panzoom from 'panzoom';


@Component({
  selector: 'app-task-chart',
  templateUrl: './task-chart.component.html',
  styleUrls: ['./task-chart.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class TaskChartComponent implements OnInit {
  /* Variables */
  taskList: Task[];
  chartStyle: { width?: string, height: string, "background-image"?: string };

  @ViewChild("taskChart") taskChart: ElementRef;
  expandCollapseSubscription$: Subscription;
  tasksSubscription$: Subscription;
  parameterSubscription$: Subscription;
  // dependency: any;
  arrowWidth: number = 5;
  accessorLineDefaultLength = 10;
  showDependency: boolean = false;
  @Output() calenderDrawn: EventEmitter<any> = new EventEmitter();


  constructor(private utility: UtilityService) {
    this.chartStyle = { height: "0px" }
  }

  closeDependency(event) {
    // console.log(event)
    this.showDependency = false;
  }

  ngOnInit(): void {
    this.tasksSubscription$ = this.utility.getTaskManipulatedData().subscribe(tasks => {
      if (!tasks.length) return;
      this.taskList = this.addLateStatus(tasks as Task[]);
      this.drawDependencies(this.utility.dependencies);
    });

    this.tasksSubscription$ = this.utility.getFilteredTasks().subscribe(tasks => {
      if (!tasks.length) return;
      this.taskList = tasks;// this.utility.manipulateData(tasks)
      this.removeAllDependenciesLines();
      const dependencies = this.getDependencies(this.utility.dependencies);
      this.drawDependencies(dependencies);
    });
  }
  getDependencies(dependencies: Dependency[]) {
    const filterdDependencies: Dependency[] = [];
    dependencies.forEach(d => {
      const task = this.taskList.find(task => d.taskId === task.id);
      const parent = this.taskList.find(task => d.parentTaskId === task.id);
      if (task && parent) {
        filterdDependencies.push(d);
      }
    })
    return filterdDependencies;
    //return dependencies with unique taskId
    // return Array.from(new Set(filterdDependencies.map(d => d.taskId)))
    //   .map(taskId => {
    //     return filterdDependencies.find(d => d.taskId === taskId)
    //   })
  }
  removeAllDependenciesLines() {
    $('div[id^="dep-"]').remove();
  }

  onCalenderDrawn(calenderInfo: any) {
    const dayWidth = settings.project.ganttChart.dayWidth;
    const rowHeight = settings.project.taskTable.rowHeight;
    const todayIndicatorWidth = settings.project.ganttChart.todayIndicatorThickness;

    this.chartStyle = {
      width: calenderInfo["headerWidth"],
      height: (this.taskList.length * settings.project.taskTable.rowHeight) + "px",
      "background-image": `
        `+ this.drawVerticalLines(dayWidth) + `,
        `+ this.drawHorizontalLines(rowHeight) + `,
        `+ this.drawTodayIndicator(dayWidth, calenderInfo["todayIndex"], calenderInfo["dayCount"], todayIndicatorWidth) + `
        `+ this.drawOffdaysBackground(calenderInfo["days"], dayWidth)
    }
    // this.calenderDrawn.emit(calenderInfo);
    // this.utility.setParameters(calenderInfo)
  }

  drawDependencies(dependencies: Dependency[]) {
    setTimeout(() => {
      dependencies.forEach(dependency => {
        this.drawDependency(dependency);
      })
    }, 1000);
  }

  getAccessorIndicator(accessor: string) {
    return accessor === AccessorType.Successor ? 2 : accessor === AccessorType.Predecessor ? 1 : 5;
  }

  drawDependency(dependency: Dependency) {
    dependency.drawingInfo = this.getBarProperties(dependency);
    const deviderInfo = this.getDeviderInfo(dependency);
    const devider: HTMLElement = this.drawDevider(dependency, deviderInfo)
    this.drawArrow(dependency);
    this.drawConnectors(dependency, devider);
  }


  drawConnectors(dependency: Dependency, devider: HTMLElement) {
    this.drawConnectingLines(dependency, devider, AccessorType.Predecessor);
    this.drawConnectingLines(dependency, devider, AccessorType.Successor);
  }

  drawConnectingLines(dependency: Dependency, devider: HTMLElement, accessor: string) {
    const horizontal: HTMLElement = this.drawHorizontalLine(dependency, accessor);
    this.drawVerticalLine(dependency, devider, horizontal, accessor);
  }

  drawVerticalLine(dependency: Dependency, devider: HTMLElement, horizontal: HTMLElement, accessor: string) {
    const verticalLine = this.getLine(dependency, accessor, 'vertical');
    const left = dependency.leftAccessor === accessor ? parseInt(devider.style.left) : parseInt(devider.style.left) + parseInt(devider.style.width);
    const diff = parseInt(horizontal.getAttribute("top")) - parseInt(devider.getAttribute("top"))
    const height = Math.abs(diff)
    let top = 0;//dependency.higherAccessor === accessor ? settings.project.taskTable.rowHeight / 2 + height : settings.project.taskTable.rowHeight / 2 - height;

    if (dependency.higherAccessor === accessor)
      top = accessor === AccessorType.Predecessor ? settings.project.taskTable.rowHeight / 2 - diff : 0;
    else
      top = settings.project.taskTable.rowHeight / 2;

    verticalLine.style.top = `${top - settings.project.ganttChart.dependency.lineThickness / 2}px`;
    verticalLine.style.height = `${height + settings.project.ganttChart.dependency.lineThickness}px`;
    verticalLine.style.left = `${left}px`;

    this.getTaskbar(accessor === AccessorType.Predecessor ? dependency.parentTaskId : dependency.taskId).append(verticalLine);
  }

  private drawHorizontalLine(dependency: Dependency, accessor: string): HTMLElement {
    const horizontalLine = this.getLine(dependency, accessor, 'horizontal');
    let left: number = 0, width: number = 0;

    // left = (dependency.drawingInfo[accessor].type.toLowerCase() === Direction.Start ?
    //   (dependency.drawingInfo[accessor].left - this.accessorLineDefaultLength) : dependency.drawingInfo[accessor].right);
    // width = this.accessorLineDefaultLength;

    //adjustment due to line thickness
    if (dependency.drawingInfo[accessor].type.toLowerCase() === Direction.Start) {
      left = (dependency.drawingInfo[accessor].left - this.accessorLineDefaultLength);
      if (accessor === AccessorType.Successor) {
        width = this.accessorLineDefaultLength - settings.project.ganttChart.dependency.lineThickness / 2;
      }
      else {
        width = this.accessorLineDefaultLength;
      }
    }
    else {
      if (accessor === AccessorType.Successor) {
        left = dependency.drawingInfo[accessor].right + settings.project.ganttChart.dependency.lineThickness / 2
        width = this.accessorLineDefaultLength - settings.project.ganttChart.dependency.lineThickness / 2
      }
      else {
        left = dependency.drawingInfo[accessor].right;
        width = this.accessorLineDefaultLength;
      }
    }

    horizontalLine.style.left = `${left}px`;
    horizontalLine.style.width = `${width}px`;
    horizontalLine.style.top = `${settings.project.taskTable.rowHeight / 2 - 1}px`; //added top position for the browser compatibility issue

    this.getTaskbar(accessor === AccessorType.Predecessor ? dependency.parentTaskId : dependency.taskId).append(horizontalLine);
    return horizontalLine
  }

  private drawArrow(dependency: Dependency) {
    const arrow = this.getSuccessorArrow(dependency, 6);
    this.getTaskbar(dependency.taskId).append(arrow);
  }

  drawDevider(dependency: Dependency, deviderInfo: any) {
    const devider = this.getLine(dependency, AccessorType.Successor, LineDirection.Horizontal, true);
    devider.style.top = `${deviderInfo.top - settings.project.ganttChart.dependency.lineThickness / 2}px`;
    devider.style.left = `${deviderInfo.left}px`;
    devider.style.width = `${deviderInfo.width}px`;
    this.getTaskbar(dependency.taskId).append(devider);
    return devider;
  }
  getDeviderInfo(dependency: Dependency): any {
    const deviderInfo = { left: 0, width: 0, top: 0, leftAccessor: "", higherAccessor: "" }
    dependency.drawingInfo.predecessor.endpoint = this.getEndpoint(dependency, AccessorType.Predecessor);
    dependency.drawingInfo.successor.endpoint = this.getEndpoint(dependency, AccessorType.Successor);
    const distance = dependency.drawingInfo.predecessor.endpoint - dependency.drawingInfo.successor.endpoint;

    dependency.higherAccessor = this.getHigherAccessor(dependency);
    dependency.leftAccessor = distance > 0 ? AccessorType.Successor : AccessorType.Predecessor;
    deviderInfo.width = Math.abs(distance);
    deviderInfo.top = dependency.higherAccessor === AccessorType.Successor ?
      0 : settings.project.taskTable.rowHeight
    deviderInfo.left = dependency.leftAccessor === AccessorType.Predecessor ?
      dependency.drawingInfo.predecessor.endpoint : dependency.drawingInfo.successor.endpoint
    return deviderInfo;
  }

  getHigherAccessor(dependency: Dependency): string {
    return dependency.drawingInfo.predecessor.top > dependency.drawingInfo.successor.top ?
      AccessorType.Predecessor : AccessorType.Successor
  }
  getEndpoint(dependency, accessor: string) {
    dependency.drawingInfo[accessor].type = dependency.drawingInfo[accessor].type || Direction.Start;
    return dependency.drawingInfo[accessor].type.toLowerCase() === Direction.Start ?
      dependency.drawingInfo[accessor].left - this.accessorLineDefaultLength :
      dependency.drawingInfo[accessor].left + dependency.drawingInfo[accessor].width + this.accessorLineDefaultLength;
  }

  getSuccessorArrow(dependency: Dependency, serial: number) {
    const arrow = document.createElement('div');
    arrow.id = `dep-${dependency.id}-${serial}`;
    let left = 0, direction = "";
    if (dependency.drawingInfo.successor.type.toLowerCase() === Direction.Start) {
      direction = "right";
      left = dependency.drawingInfo.successor.left - this.arrowWidth
    }
    else {
      direction = "left";
      left = dependency.drawingInfo.successor.right
    }
    arrow.className = `${dependency.dependencyType} arrow-head ${direction}`;
    arrow.style.left = `${left}px`;
    return arrow;
  }



  getTaskbar(id: string) {
    return $(`app-gantt-bar>div`).filter((i, v) => v.id == id);
    // return $(`app-gantt-bar>div#${id}`);
  }

  getMinAccessorType(dependency: Dependency, attr: string) {
    return dependency.drawingInfo.successor[attr] < dependency.drawingInfo.predecessor[attr] ? AccessorType.Successor : AccessorType.Predecessor;
  }

  getBarProperties(dependency: Dependency) {
    const token = dependency.dependencyType.split('-');
    const successor = this.getDependencyMeasurements(dependency.taskId);
    successor.type = token[1];
    const predecessor = this.getDependencyMeasurements(dependency.parentTaskId)
    predecessor.type = token[0];

    const widthDiff = predecessor.width - successor.width;
    const positionDiff = predecessor.left - successor.left;
    dependency.correction = (widthDiff + positionDiff) / 2;

    return {
      successor: successor, predecessor: predecessor
    }
  }

  private getDependencyMeasurements(taskId: string) {
    const part = $(`div#${taskId || 'v6_rIjeoukq5SdaaMm9EG8kALorI'} div`).css(['left', 'width']) || { left: "0px", width: "0px" };
    part.left = parseInt(part.left);
    part.width = parseInt(part.width);
    part.top = this.getBarTop(taskId);
    part.right = part.left + part.width;
    return part;
  }

  private getBarTop(taskId: string) {
    return this.taskList.findIndex(task => task.id === taskId)
      * settings.project.taskTable.rowHeight + settings.project.taskTable.rowHeight / 2;
  }

  getLine(dependency: Dependency, accessor: string, direction: string = LineDirection.Horizontal, isDevider = false): HTMLElement {
    const div = document.createElement('div');
    div.id = `dep-${dependency.id}-${isDevider ? 5 : this.getAccessorIndicator(accessor)}-${direction === LineDirection.Horizontal ? 1 : 2}`
    div.className = `${dependency.dependencyType} line ${direction}`;
    if (direction === LineDirection.Horizontal) {
      const top = isDevider ? dependency.drawingInfo.successor.top + settings.project.taskTable.rowHeight / 2 * (dependency.higherAccessor === AccessorType.Successor ? -1 : 1)
        : dependency.drawingInfo[accessor].top
      div.setAttribute("top", `${top}px`);
    }
    div.onclick = (e) => {
      const data = this.getDependencyPopupInfo(e, dependency);
      this.showDependency = true;
      this.utility.setLineClicked(data)
    }
    this.highlightPath(div);
    return div;
  }

  private getDependencyPopupInfo(e: MouseEvent, dependency: Dependency) {
    e.stopPropagation();;

    const popupWidth = settings.project.ganttChart.dependency.popupWidth
    const minLeft = Math.ceil($('#right_panel').position().left + 20);
    const maxLeft = Math.floor($('#right_panel').position().left + parseInt($('#right_panel').css('width')) - popupWidth + 20);

    const leftPosition = e.clientX - popupWidth / 2;
    let left: number = 0, diff: number = 0;

    if (leftPosition < minLeft) {
      left = minLeft;
      diff = -Math.abs(minLeft - leftPosition)
    }
    else if (leftPosition > maxLeft) {
      left = maxLeft;
      diff = Math.abs(leftPosition - maxLeft)
    }
    else {
      left = leftPosition
      diff = 0;
    }
    left = leftPosition < minLeft ? minLeft : leftPosition > maxLeft ? maxLeft : leftPosition;
    diff = diff - this.arrowWidth / 2;
    const data = {
      position: {
        left: `${left}px`,
        top: `${e.clientY + 3}px`
      },
      arrow: { left: `${diff}px` },
      dependency: this.getDependencyWithTitle(dependency)
    };
    return data;

  }
  // private getDependencyPopupInfo(e: MouseEvent, dependency: Dependency) {
  //   const leftPanelWidth = $('#left_panel').width();
  //   const rightPanelWidth = $('#right_panel').width();
  //   const leftPadding = parseInt($('.app').css("padding-left"));
  //   const splitterWidth = $('#drag').width();
  //   // const navbarHeight = parseInt($('.navbar').css("height"));
  //   const popupWidth = settings.project.ganttChart.dependency.popupWidth
  //   event.stopPropagation();


  //   const minLeft = leftPanelWidth + leftPadding + splitterWidth;
  //   const maxLeft = leftPadding + leftPanelWidth + splitterWidth + rightPanelWidth - popupWidth / 2 - settings.project.ganttChart.scrollbarWidth;
  //   let left = e.clientX + $('#right_panel').scrollLeft() - minLeft - popupWidth / 2; //200 for half of the dependency popup width
  //   let diff = 0;
  //   if (e.clientX - minLeft < popupWidth / 2) {
  //     diff = e.clientX - minLeft - popupWidth / 2;
  //     left = $('#right_panel').scrollLeft();
  //   }
  //   else if (e.clientX > maxLeft) {
  //     diff = e.clientX - maxLeft;
  //     left = left - diff;
  //   }
  //   else {
  //     diff = 0;
  //   }

  //   //Header_hight (51) + padding-top (20) = 71
  //   let top = e.clientY - 71 + $('#right_panel').scrollTop() + settings.project.ganttChart.dependency.lineThickness;
  //   const data = {
  //     position: {
  //       left: `${left}px`,
  //       top: `${top}px`
  //     },
  //     arrow: { left: `${diff}px` },
  //     dependency: this.getDependencyWithTitle(dependency)
  //   };
  //   return data;
  // }

  getDependencyWithTitle(dependency: Dependency) {
    dependency.drawingInfo.predecessor.title = this.taskList.filter(task => task.id === dependency.parentTaskId)[0]["title"]
    dependency.drawingInfo.successor.title = this.taskList.filter(task => task.id === dependency.taskId)[0]["title"]
    return dependency
  }

  private highlightPath(div: HTMLDivElement) {
    let id = "";
    $(div).on('mouseenter', function () {
      const token = this.id.split('-');
      id = `${token[0]}-${token[1]}`;
      // id = this.getDependencyId(dependencyId);
      $(`[id*="${id}"]`).addClass('over');
    }).on('mouseleave', function () {
      $(`[id*="${id}"]`).removeClass('over');
    });
  }

  private getDependencyId(id: string) {
    const token = id.split('-');
    return `${token[0]}-${token[1]}`;

  }

  isBothAccessorVisible(dependencyId: number): boolean {
    const dependency: Dependency = this.utility.dependencies.filter(dep => dep.id === dependencyId)[0]
    return this.isTaskVisible(dependency.taskId) && this.isTaskVisible(dependency.parentTaskId);
  }
  isTaskVisible(taskId: string): boolean {
    const visible = $(`#${taskId}`).css('display');
    return visible === 'none' ? false : true;
  }
  toggleDependency(expression: string, show) {
    const list = $.map($(expression), (v) => this.getDependencyId(v.id))
    const uniqueList = [...new Set(list)];
    $(uniqueList).each((index, value) => {
      if (show && this.isBothAccessorVisible(parseInt(value.split('-')[1]))) {
        $(`[id*="${value}"]`).show();
      }
      else { $(`[id*="${value}"]`).hide(); }
    })
  }

  ngAfterViewInit() {
    this.taskChart.nativeElement.onclick = (e) => {
      // console.log(e.clientX, e.clientY)
      this.showDependency = false;
    }
    this.expandCollapseSubscription$ = this.utility.getDatarowExpandCollapseEvent().subscribe(parent => {
      if (!parent.id) return;
      const parentExpression = `app-gantt-bar div[class*='${parent.relation}']`; //select all app-gantt-bar having relation class in the child div
      const childs = $(parentExpression).closest('app-gantt-bar').filter((i: number) => i !== 0);
      const dependenciesExpression = `app-gantt-bar div[class*='${parent.relation}'] div[id*='dep-']`
      setTimeout(() => {
        if (parent.expanded) {
          childs.slideDown('slow')
          this.toggleDependency(dependenciesExpression, true)
          this.adjustVerticalLineHeight(parent.id, childs.length, parent.expanded)
        }
        else {
          childs.slideUp('slow')
          this.toggleDependency(dependenciesExpression, false)
          this.adjustVerticalLineHeight(parent.id, childs.length, parent.expanded)
        }
      }, 500);
    })
    // const instance = panzoom(this.taskChart.nativeElement, {
    //   // zoomDoubleClickSpeed: 1,
    //   maxZoom: 1,
    //   bounds:true
    //   // beforeMouseDown: function(e) {
    //   //   // allow mouse-down panning only if altKey is down. Otherwise - ignore
    //   //   var shouldIgnore = !e.altKey;
    //   //   return shouldIgnore;
    //   // },
    //   // onTouch: function(e) {
    //   //   // `e` - is current touch event.

    //   //   return false; // tells the library to not preventDefault.
    //   // }

    // });
    // instance.on('pan', (e) => {
    //   console.log('Fired when the `element` is being panned', e);
    // })

  }
  adjustVerticalLineHeight(taskId: string, childsCount: number, expanded: boolean = false) {
    const min = this.utility.getTaskIndex(taskId, this.taskList);
    const max = min + childsCount;
    const adjustableDependencies = this.utility.dependencies.filter(dependency =>
      (dependency.successorIndex < min && dependency.predecessorIndex > max) ||
      (dependency.predecessorIndex < min && dependency.successorIndex > max)
    )
    adjustableDependencies.forEach(dependency => {
      const css = $(`#dep-${dependency.id}-1-2`).css(['height', 'top']);
      const delta = childsCount * settings.project.taskTable.rowHeight * (expanded ? 1 : -1);
      if (css && parseInt(css.top) < 0)
        $(`#dep-${dependency.id}-1-2`).css({
          'height': `${parseInt(css.height) + delta}px`,
          'top': `${parseInt(css.top) - delta}px`
        })
      else
        $(`#dep-${dependency.id}-1-2`).css({ 'height': `${parseInt(css.height) + delta}px` })
    })
  }


  addLateStatus(tasks: Task[]): Task[] {
    const today = (new Date()).toLocaleDateString('en-GB')
    tasks.forEach(task => {

      task.status = this.utility.getDateDifference(today, task.dueDate, settings.dateFormat, 'days') < 0 && task.status != "Completed" ? "Late" : task.status;
    })
    return tasks;
  }

  drawHorizontalLines(rowHeight: any) {
    return `repeating-linear-gradient(to bottom, lightgray 0px, transparent 1px, transparent ${rowHeight}px)`
  }

  drawOffdaysBackground(days, dayWidth: number) {
    const offDays = settings.project.offDays;
    let expression = "";
    offDays.forEach(offDay => {
      const oDay = days.filter(day => day.dayName.toLowerCase() === offDay.toLowerCase())[0];
      const offDayIndex = days.indexOf(oDay);
      expression += `,repeating-linear-gradient(to right, transparent ${(offDayIndex + 1) * dayWidth}px, transparent ${(offDayIndex + 7) * dayWidth}px, #f6f6f6 0px, #f6f6f6 ${(offDayIndex + 8) * dayWidth}px)`
    });
    return expression;
  }

  drawTodayIndicator(dayWidth: number, todayIndex: number, dayCount: number, todayIndicatorWidth: number) {
    let todayIndicatorX = 0;
    let direction: string;
    if (todayIndex >= dayCount / 2) {
      todayIndicatorX = dayWidth * (todayIndex + .5);
      direction = 'right'; //toward right
    }
    else {
      todayIndicatorX = dayWidth * (dayCount - todayIndex - .5);
      direction = 'left'; //toward left
    }
    return `repeating-linear-gradient(to ${direction}, transparent,transparent ${todayIndicatorX - (todayIndicatorWidth / 2)}px, #039cce 0px, #039cce ${todayIndicatorX + (todayIndicatorWidth / 2)}px)`
  }

  drawVerticalLines(dayWidth: any) {
    return `repeating-linear-gradient(to right, lightgray 0px, transparent 1px, transparent ${dayWidth}px)`
  }

  ngOnDestroy() {
    this.utility.unsubscribe(this.expandCollapseSubscription$)
    this.utility.unsubscribe(this.tasksSubscription$)
    this.utility.unsubscribe(this.parameterSubscription$)
    this.utility.setParameters({});
  }
}
