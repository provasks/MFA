import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TestComponent } from './shared/components/test/test.component';
import { TermsComponent } from './shared/components/terms/terms.component';
import { PrivacyComponent } from './shared/components/privacy/privacy.component';
import { SettingsComponent } from './shared/components/settings/settings.component';
import { NotFoundComponent } from './modules/projects/components/not-found/not-found.component';
import { GanttViewComponent } from './modules/projects/components/gantt-view/gantt-view.component';
import { ProjectListComponent } from './modules/projects/components/project-list/project-list.component';

const routes: Routes = [
  {
    path: 'planner/projects',
    component: ProjectListComponent,
  },
  {
    path: 'planner/projects/:groupId',
    component: ProjectListComponent,
  },
  {
    path: 'planner/projects/:groupId/:projectId/:id/:title',
    component: GanttViewComponent,
  },
  {
    path: 'terms',
    component: TermsComponent
  },
  {
    path: 'privacy',
    component: PrivacyComponent
  },
  {
    path: 'settings',
    component: SettingsComponent
  },
  {
    path: 'test',
    component: TestComponent
  },
  { path: '404', component: NotFoundComponent },
  { path: '**', redirectTo: '/404' }

];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
