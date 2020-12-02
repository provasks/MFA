import { BrowserModule } from '@angular/platform-browser';
import { Injector, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './modules/material/material.module';
import { HttpClientModule } from '@angular/common/http';
import {
  MsalModule,
  MsalInterceptor
} from '@azure/msal-angular';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { LoaderComponent } from './shared/components/loader/loader.component';
import { LoaderService } from './shared/services/loader.service';
import { AuthIntercepterService } from './shared/services/auth-intercepter.service';
import { LoaderInterceptor } from './shared/services/loader.interceptor';
import { TestComponent } from './shared/components/test/test.component';
import { SettingsComponent } from './shared/components/settings/settings.component';
import { TermsComponent } from './shared/components/terms/terms.component';
import { PrivacyComponent } from './shared/components/privacy/privacy.component';
import { ExportDialogComponent } from './shared/components/export-dialog/export-dialog.component';
import { FileErrorDailogComponent } from './shared/components/file-error-dailog/file-error-dailog.component';
import { ProjectsRoutingModule } from './modules/projects/projects-routing.module';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { GanttViewComponent } from './modules/projects/components/gantt-view/gantt-view.component';
import { TaskTableComponent } from './modules/projects/components/task-table/task-table.component';
import { TaskChartComponent } from './modules/projects/components/task-chart/task-chart.component';
import { HeaderComponent } from './modules/projects/components/header/header.component';
import { AddEditTaskComponet } from './modules/projects/components/AddEditTask/add-edit-task.component';
import { GanttBarComponent } from './modules/projects/components/gantt-bar/gantt-bar.component';
import { GanttCalenderComponent } from './modules/projects/components/gantt-calender/gantt-calender.component';
import { RangeComponent } from './modules/projects/components/range/range.component';
import { AddProjectComponent } from './modules/projects/components/add-project/add-project.component';
import { DependencyComponent } from './modules/projects/components/dependency/dependency.component';
import { LabelsDropDownComponent } from './modules/projects/components/labels-drop-down/labels-drop-down.component';
import { LandingComponent } from './modules/projects/components/landing/landing.component';
import { NotFoundComponent } from './modules/projects/components/not-found/not-found.component';
import { ProgressDropdownComponent } from './modules/projects/components/progress-dropdown/progress-dropdown.component';
import { ProjectListComponent } from './modules/projects/components/project-list/project-list.component';
import { ResouceManagementComponent } from './modules/projects/components/resouce-management/resouce-management.component';
import { ResourceDetailComponent } from './modules/projects/components/resource-detail/resource-detail.component';
import { SearchTaskDependencyComponent } from './modules/projects/components/search-task-dependency/search-task-dependency.component';
import { TableDependencyComponent } from './modules/projects/components/table-dependency/table-dependency.component';
import { TaskDependencyComponent } from './modules/projects/components/task-dependency/task-dependency.component';
import { TimeManagementComponent } from './modules/projects/components/time-management/time-management.component';
import { UsersListComponent } from './modules/projects/components/users-list/users-list.component';
import { ConfirmDialogComponent } from './shared/components/confirm-dialog/confirm-dialog.component';
import { DialogService } from './modules/projects/components/task-table/dialog.service';
import { createCustomElement } from '@angular/elements';
import { environment } from '../environments/environment';
import { UserComponent } from './modules/projects/components/user/user.component';
import { UserListComponent } from './modules/projects/components/user-list/user-list.component';
//import { ConfirmDialogComponent } from './shared/components/confirm-dialog/confirm-dialog.component';


@NgModule({
  declarations: [
    AppComponent,
    LoaderComponent,
    TestComponent,
    SettingsComponent,
    TermsComponent,
    PrivacyComponent,
    ExportDialogComponent,
    FileErrorDailogComponent,
    //ConfirmDialogComponent,
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
    LandingComponent,
    AddProjectComponent,
    UserComponent,
    UserListComponent

  ],
  imports: [
    HttpClientModule,
    CommonModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    ProjectsRoutingModule,
    DragDropModule,

    MsalModule.forRoot({
      auth: {
        clientId: `${environment.auth.clientId}`,
        authority: `${environment.auth.authority}`,
        redirectUri: `${environment.auth.redirectUri}`,
        postLogoutRedirectUri: `${environment.auth.redirectUri}`,
      },
      cache: {
        cacheLocation: "localStorage", // This configures where your cache will be stored
        storeAuthStateInCookie: true, // Set this to "true" if you are having issues on IE11 or Edge
      }
    }, {
      popUp: true,
      consentScopes: [`https://graph.microsoft.com/v1.0/me/User.Read`],
      protectedResourceMap: [
        ['https://graph.microsoft.com/v1.0/me', ['user.read']]
      ]
    })
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: MsalInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthIntercepterService,
      multi: true
    },
    LoaderService,
    { provide: HTTP_INTERCEPTORS, useClass: LoaderInterceptor, multi: true },
    DialogService
  ],
  bootstrap: [AppComponent],
  // bootstrap: [],
  // entryComponents: [AppComponent]
})
export class AppModule {
  constructor(private injector: Injector) { }

  ngDoBootstrap() {
    const plannerApp = createCustomElement(AppComponent, { injector: this.injector });
    customElements.define('planner-app', plannerApp)
  }
}
