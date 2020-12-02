import { TestBed } from '@angular/core/testing';

import { LoaderInterceptor } from './loader.interceptor';
import { HttpRequest } from '@angular/common/http';

fdescribe('LoaderInterceptor', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      LoaderInterceptor
      ]
  }));

  it(' interceptor should be created', () => {
    const interceptor: LoaderInterceptor = TestBed.inject(LoaderInterceptor);
    expect(interceptor).toBeTruthy();
  });

  // it(' interceptor should be created showLoader', () => {
  //   const interceptor: LoaderInterceptor = TestBed.inject(LoaderInterceptor);
   
  //     const spy = spyOn(interceptor,'showLoader').and.callThrough();
     
  //      const  request = {
  //        url: "www.abc.com"
  //      } 
  //     interceptor.showLoader(request ,true);
  //     expect(spy).toBeDefined();
  //     expect(spy).toHaveBeenCalled();
  //     expect(interceptor.showLoader).toBeTruthy;

  // });

});
