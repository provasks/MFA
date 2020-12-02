import { TestBed } from '@angular/core/testing';
import { ApiService } from './api.service';
import { HttpClientModule } from '@angular/common/http';
import { componentFactoryName } from '@angular/compiler';

fdescribe('ApiService', () => {
  let service: ApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
    });
    service = TestBed.inject(ApiService);
  });

  it('should be created api service', () => {
    expect(service).toBeTruthy();
  });

  it('should be called addDependencyTask', () => {
    const spy = spyOn(service, 'addDependencyTask').and.callThrough();
    const url = '';
    const params = '';
    service.addDependencyTask(url, params);
    expect(spy).toBeDefined();
    expect(spy).toHaveBeenCalled();
    expect(service.addDependencyTask).toBeTruthy;
  });
  it('should be called addEstimate', () => {
    const spy = spyOn(service, 'addEstimate').and.callThrough();

    const params = '';
    service.addEstimate(params);
    expect(spy).toBeDefined();
    expect(spy).toHaveBeenCalled();
    expect(service.addEstimate).toBeTruthy;
  });
  it('should be called updateEstimate', () => {
    const spy = spyOn(service, 'updateEstimate').and.callThrough();

    const params = '';
    service.updateEstimate(params);
    expect(spy).toBeDefined();
    expect(spy).toHaveBeenCalled();
    expect(service.updateEstimate).toBeTruthy;
  });
  it('should be called getDependencyTypes', () => {
    const spy = spyOn(service, 'getDependencyTypes').and.callThrough();

    service.getDependencyTypes();
    expect(spy).toBeDefined();
    expect(spy).toHaveBeenCalled();
    expect(service.getDependencyTypes).toBeTruthy;
  });
  it('should be called getAllGroupMembers', () => {
    const spy = spyOn(service, 'getAllGroupMembers').and.callThrough();
    service.getAllGroupMembers(1);
    expect(spy).toBeDefined();
    expect(spy).toHaveBeenCalled();
    expect(service.getAllGroupMembers).toBeTruthy;
  });
  it('should be called getAllProjectsWithGroupId', () => {
    const spy = spyOn(service, 'getAllProjectsWithGroupId').and.callThrough();
    service.getProjectList(1);
    expect(spy).toBeDefined();
    expect(spy).toHaveBeenCalled();
    expect(service.getProjectList).toBeTruthy;
  });
  it('should be called getMyProfile', () => {
    const spy = spyOn(service, 'getMyProfile').and.callThrough();
    service.getMyProfile();
    expect(spy).toBeDefined();
    expect(spy).toHaveBeenCalled();
    expect(service.getMyProfile).toBeTruthy;
  });
  it('should be called updateLabelNames', () => {
    const spy = spyOn(service, 'updateLabelNames').and.callThrough();
    const CategoryDescriptions = '';
    service.updateLabelNames(CategoryDescriptions);
    expect(spy).toBeDefined();
    expect(spy).toHaveBeenCalled();
    expect(service.updateLabelNames).toBeTruthy;
  });
  it('should be called deleteTask', () => {
    const spy = spyOn(service, 'deleteTask').and.callThrough();
    service.deleteTask(1);
    expect(spy).toBeDefined();
    expect(spy).toHaveBeenCalled();
    expect(service.deleteTask).toBeTruthy;
  });
  it('should be called getResourceAvailability', () => {
    const spy = spyOn(service, 'getResourceAvailability').and.callThrough();
    service.getResourceAvailability();
    expect(spy).toBeDefined();
    expect(spy).toHaveBeenCalled();
    expect(service.getResourceAvailability).toBeTruthy;
  });
  it('should be called postTaskComments', () => {
    const spy = spyOn(service, 'postTaskComments').and.callThrough();
    const comments = '';
    service.postTaskComments(comments);
    expect(spy).toBeDefined();
    expect(spy).toHaveBeenCalled();
    expect(service.postTaskComments).toBeTruthy;
  });
  it('should be called updateTask', () => {
    const spy = spyOn(service, 'updateTask').and.callThrough();
    const url = '';
    const obj = '';
    service.updateTask(url, obj);
    expect(spy).toBeDefined();
    expect(spy).toHaveBeenCalled();
    expect(service.updateTask).toBeTruthy;
  });

  it('should be called getAllTasks', () => {
    const spy = spyOn(service, 'getAllTasks').and.callThrough();
    service.getAllTasks();
    expect(spy).toBeDefined();
    expect(spy).toHaveBeenCalled();
    expect(service.getAllTasks).toBeTruthy;
  });
  it('should be called getBuckets', () => {
    const spy = spyOn(service, 'getBuckets').and.callThrough();
    service.getBuckets();
    expect(spy).toBeDefined();
    expect(spy).toHaveBeenCalled();
    expect(service.getBuckets).toBeTruthy;
  });
  it('should be called getAttachments', () => {
    const spy = spyOn(service, 'getAttachments').and.callThrough();
    service.getAttachments();
    expect(spy).toBeDefined();
    expect(spy).toHaveBeenCalled();
    expect(service.getAttachments).toBeTruthy;
  });
  it('should be called getGroupMembers', () => {
    const spy = spyOn(service, 'getGroupMembers').and.callThrough();
    service.getGroupMembers();
    expect(spy).toBeDefined();
    expect(spy).toHaveBeenCalled();
    expect(service.getGroupMembers).toBeTruthy;
  });
  it('should be called getLabelNames', () => {
    const spy = spyOn(service, 'getLabelNames').and.callThrough();
    service.getLabelNames();
    expect(spy).toBeDefined();
    expect(spy).toHaveBeenCalled();
    expect(service.getLabelNames).toBeTruthy;
  });
  it('should be called getTaskDetails', () => {
    const spy = spyOn(service, 'getTaskDetails').and.callThrough();
    service.getTaskDetails(1);
    expect(spy).toBeDefined();
    expect(spy).toHaveBeenCalled();
    expect(service.getTaskDetails).toBeTruthy;
  });
  it('should be called getTaskById', () => {
    const spy = spyOn(service, 'getTaskById').and.callThrough();
    service.getTaskById(1);
    expect(spy).toBeDefined();
    expect(spy).toHaveBeenCalled();
    expect(service.getTaskById).toBeTruthy;
  });
  it('should be called getTaskComments', () => {
    const spy = spyOn(service, 'getTaskComments').and.callThrough();
    service.getTaskComments(1, 1);
    expect(spy).toBeDefined();
    expect(spy).toHaveBeenCalled();
    expect(service.getTaskComments).toBeTruthy;
  });
  it('should be called addTask', () => {
    const spy = spyOn(service, 'addTask').and.callThrough();
    const formObj = {};
    const url = '';
    service.addTask(url, formObj);
    expect(spy).toBeDefined();
    expect(spy).toHaveBeenCalled();
    expect(service.addTask).toBeTruthy;
  });
  it('should be called uploadFiles', () => {
    const spy = spyOn(service, 'uploadFiles').and.callThrough();

    let file:FileList;
    service.uploadFiles(file);
    expect(spy).toBeDefined();
    expect(spy).toHaveBeenCalled();
    expect(service.uploadFiles).toBeTruthy;
  });
  it('should be called getMyGroups', () => {
    const spy = spyOn(service, 'getMyGroups').and.callThrough();
    service.getMyGroups();
    expect(spy).toBeDefined();
    expect(spy).toHaveBeenCalled();
    expect(service.getMyGroups).toBeTruthy;
  });

  // it('should be called handleError', () => {
  //   const spy = spyOn(service, 'handleError').and.callThrough();
  //   const mockError = {
  //     status: 404,
  //     statustext:"",
  //     message:""
  //   }
  //   service.handleError(mockError);
  //   expect(spy).toBeDefined();
  //   expect(spy).toHaveBeenCalled();
  //   expect(service.handleError).toBeTruthy;
  // });
});
