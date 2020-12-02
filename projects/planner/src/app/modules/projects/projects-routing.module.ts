import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GanttViewComponent } from './components/gantt-view/gantt-view.component';
import { ProjectListComponent } from './components/project-list/project-list.component';

const routes: Routes = [
  {
    path: '',
    component: ProjectListComponent
  },
  {
    path: ':groupId',
    component: ProjectListComponent
  },
  {
    path: ':groupId/:projectId/:id/:title',
    component: GanttViewComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProjectsRoutingModule { }
