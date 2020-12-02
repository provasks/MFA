import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProjectsRoutingModule } from './projects-routing.module';
import { GanttViewComponent } from './components/gantt-view/gantt-view.component';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { TaskTableComponent } from './components/task-table/task-table.component';
import { TaskChartComponent } from './components/task-chart/task-chart.component';
import { MaterialModule } from '../material/material.module';
import { HeaderComponent } from './components/header/header.component';
import { AddEditTaskComponet } from './components/AddEditTask/add-edit-task.component';
import { GanttBarComponent } from './components/gantt-bar/gantt-bar.component';
import { GanttCalenderComponent } from './components/gantt-calender/gantt-calender.component';
import { DialogService } from '../projects/components/task-table/dialog.service';
import { UsersListComponent } from './components/users-list/users-list.component';
import { RangeComponent } from './components/range/range.component';
import { ConfirmDialogComponent } from '../../shared/components/confirm-dialog/confirm-dialog.component';
import { ProjectListComponent } from './components/project-list/project-list.component';
import { LabelsDropDownComponent } from './components/labels-drop-down/labels-drop-down.component';
import { ProgressDropdownComponent } from './components/progress-dropdown/progress-dropdown.component';
import { TaskDependencyComponent } from './components/task-dependency/task-dependency.component';
import { TableDependencyComponent } from './components/table-dependency/table-dependency.component';
import { SearchTaskDependencyComponent } from './components/search-task-dependency/search-task-dependency.component';
import { HttpClientModule } from '@angular/common/http';
import { DependencyComponent } from './components/dependency/dependency.component';
import { TimeManagementComponent } from './components/time-management/time-management.component';
import { ResouceManagementComponent } from './components/resouce-management/resouce-management.component';
import { ResourceDetailComponent } from './components/resource-detail/resource-detail.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { AddProjectComponent } from './components/add-project/add-project.component';
import { UserComponent } from './components/user/user.component';
import { UserListComponent } from './components/user-list/user-list.component';

@NgModule({
  declarations: [
    GanttViewComponent,
    TaskTableComponent,
    TaskChartComponent,
    HeaderComponent,
    AddEditTaskComponet,
    GanttBarComponent,
    GanttCalenderComponent,
    RangeComponent,
    //MatConfirmDialogComponent, 
    UsersListComponent,
    ConfirmDialogComponent,
    ProjectListComponent,
    LabelsDropDownComponent,
    ProgressDropdownComponent,
    TaskDependencyComponent,
    TableDependencyComponent,
    SearchTaskDependencyComponent,
    DependencyComponent,
    TimeManagementComponent,
    ResouceManagementComponent,
    ResourceDetailComponent,
    NotFoundComponent,
    AddProjectComponent,
    UserComponent,
    UserListComponent
  ],
  imports: [
    CommonModule,
    ProjectsRoutingModule,
    DragDropModule,
    MaterialModule,
    HttpClientModule
  ],
  providers: [DialogService]
})
export class ProjectsModule { }
