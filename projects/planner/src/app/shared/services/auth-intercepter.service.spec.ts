import { TestBed } from '@angular/core/testing';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { AuthIntercepterService } from './auth-intercepter.service';
import { MsalService } from '@azure/msal-angular';

fdescribe('AuthIntercepterService', () => {
  let service: AuthIntercepterService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [MsalService
      ],
      providers: [
      
        { provide: MsalService, useValue: {} },
      ],
    });
    service = TestBed.inject(AuthIntercepterService);
  });

  // it('should be created auth interceptor', () => {
  //   expect(service).toBeTruthy();
  // });
});
