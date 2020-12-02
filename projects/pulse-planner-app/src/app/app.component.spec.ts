import { TestBed, async } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { BroadcastService, MsalService } from '@azure/msal-angular';
import { UtilityService } from './shared/services/utility.service';

import { HttpClientModule, HttpClient } from '@angular/common/http';
import { of } from 'rxjs';
import { nextTick } from 'process';
fdescribe('AppComponent', () => {
  let component: AppComponent;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule, HttpClientModule],
      declarations: [AppComponent],
      providers: [
        {
          provide: BroadcastService,
          useValue: {
            subscribe() {},
            getMSALSubject() {
              return of();
            },
       
            unsubscribe() {},
          },
        },
        {
          provide: UtilityService,
          useValue: {
            subscribe() {},
          },
          unsubscribe() {
            return of();
          },
        },
        {
          provide: MsalService,
          useValue: {
            logout() {
              return of();
            },
            getAccount() {
              return of();
            },
            handleRedirectCallback() {
              return of();
            },
            loginRedirect() {
              return of();
            },
            loginPopup() {
              return of();
            },
            setLogger() {
              return of();
            },
            unsubscribe() {},
          },
        },
      ],
    }).compileComponents();
  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'Planner-Plugin'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('Planner-Plugin');
  });

  it('should be called ngOnInit', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;

    const spy = spyOn(app, 'ngOnInit').and.callThrough();
    app.ngOnInit();
    expect(spy).toBeDefined();
    expect(spy).toHaveBeenCalled();
  });

  it('should be called login', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    const spy = spyOn(app, 'login').and.callThrough();
    app.login();
    expect(spy).toBeDefined();
    expect(spy).toHaveBeenCalled();
    expect(app.login).toBeTruthy;
  });
  it('should be called logout', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;

    const spy = spyOn(app, 'logout').and.callThrough();
    app.logout();
    expect(spy).toBeDefined();
    expect(spy).toHaveBeenCalled();
    expect(app.logout).toBeTruthy;
  });

  it('should be called checkAccount', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    const spy = spyOn(app, 'checkAccount').and.callThrough();
    app.checkAccount();
    expect(spy).toBeDefined();
    expect(spy).toHaveBeenCalled();
    expect(app.checkAccount).toBeTruthy;
  });

  // it('should be called ngOnDestroy', () => {
  //   const fixture = TestBed.createComponent(AppComponent);
  //   const app = fixture.componentInstance;

  //   const spy = spyOn(app, 'ngOnDestroy').and.callThrough();

  //   app.ngOnDestroy();
  //   expect(spy).toBeDefined();
  //   expect(spy).toHaveBeenCalled();
  //   expect(app.ngOnDestroy).toBeTruthy;
  // });

  
});
