import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MsalGuard } from '@azure/msal-angular';
import { TestComponent } from './shared/components/test/test.component';
import { TermsComponent } from './shared/components/terms/terms.component';
import { PrivacyComponent } from './shared/components/privacy/privacy.component';
import { SettingsComponent } from './shared/components/settings/settings.component';
import { NotFoundComponent } from './modules/projects/components/not-found/not-found.component';
import { LandingComponent } from './modules/projects/components/landing/landing.component';
import { GanttViewComponent } from './modules/projects/components/gantt-view/gantt-view.component';
import { ProjectListComponent } from './modules/projects/components/project-list/project-list.component';

const routes: Routes = [
  {
    path: 'projects',
    component: ProjectListComponent,
    canActivate: [MsalGuard],
  },
  {
    path: 'projects/:groupId',
    component: ProjectListComponent,
    canActivate: [MsalGuard],
  },
  {
    path: 'projects/:groupId/:projectId/:id/:title',
    component: GanttViewComponent,
    canActivate: [MsalGuard],
  },
  {
    path: 'terms',
    component: TermsComponent
  },
  {
    path: '',
    component: LandingComponent
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
  { path: 'projects', redirectTo: '/projects', pathMatch: 'full' },
  { path: '404', component: NotFoundComponent },
  { path: '**', redirectTo: '/404' }

];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
