import { TestBed } from '@angular/core/testing';
import { LoaderService } from './loader.service';

fdescribe('LoaderService', () => {
  let service: LoaderService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LoaderService);
  });

  it('should be created loader service', () => {
    expect(service).toBeTruthy();
  });

  it('should be called show', () => {
    const spy = spyOn(service,'show').and.callThrough();
    
    service.show()
    expect(spy).toBeDefined();
    expect(spy).toHaveBeenCalled();
    expect(service.show).toBeTruthy;
  });
  it('should be called hide', () => {
    const spy = spyOn(service,'hide').and.callThrough();
    
    service.hide()
    expect(spy).toBeDefined();
    expect(spy).toHaveBeenCalled();
    expect(service.hide).toBeTruthy;
  });
});
