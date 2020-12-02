import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { AddEditTaskComponet } from '../AddEditTask/add-edit-task.component';
import { FormBuilder } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { UtilityService } from 'src/app/shared/services/utility.service';
import { of } from 'rxjs';
import {
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialog,
  MatDialogRef,
} from '@angular/material/dialog';
import { ApiService } from 'src/app/api.service';
import { Component } from '@angular/core';
//import { AddEditTaskComponet } from './task-model.component';
declare var $: any;

let mockUtility = {
  getTaskDeleted() { return of(false) },
  setTaskDeleted() { return of(false) },
  getTaskAdded() { return of(false) },
  setTaskAdded() { return of(false) },
  getparentTaskName() {
    return of(true);
  },
  triggerReloadTasks() {
    return of(true);
  },

  unsubscribe() {

  },

  setparentTaskName() {

  },

  getTaskData() {
    return of({ parentTaskId: "123" });
  },

  isMangerRole() {
    return true
  },

  setDateTaskManagement() {

  },

  setAssigneeData() {

  },

  setTaskTableFlag() {

  }
}

let mocApiService = {
  getBuckets() {
    return of([])
  },

  getGroupMembers() {
    return of([])
  },
  getTaskById() {
    return of([])
  },

  postTaskComments() {
    return of([])
  },

  getTaskDetails() {
    return of([])
  },

  addTask() {
    return of({})
  },

  getAttachments() {
    return of({})
  },

  updateTask() {
    return of({})
  },

  uploadFiles() {
    return of({})
  },

  addEstimate() {
    return of({})
  },

  updateEstimate() {
    return of({})
  },

  getTaskComments() {
    return of([])
  },


  unsubscribe() {

  },


}



fdescribe('AddEditTaskComponet', () => {
  let component: AddEditTaskComponet;
  let fixture: ComponentFixture<AddEditTaskComponet>;
  let input: HTMLElement;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AddEditTaskComponet],
      imports: [HttpClientModule, MatDialogModule],
      providers: [FormBuilder,
        {
          provide: UtilityService, useValue: mockUtility
        },
        {
          provide: ApiService, useValue: mocApiService
        }
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddEditTaskComponet);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create add edit task component', () => {
    expect(component).toBeTruthy();
  });

  it('should be called sendMessageToParent', () => {
    const spy = spyOn(component, 'sendMessageToParent').and.callThrough();
    component.sendMessageToParent();
    expect(spy).toBeDefined();
    expect(spy).toHaveBeenCalled();
    expect(component.sendMessageToParent).toBeTruthy;
  });

  it('should be called commentUserAdd', () => {
    const spy = spyOn(component, 'commentUserAdd').and.callThrough();

    component.commentUserAdd(true);
    expect(spy).toBeDefined();
    expect(spy).toHaveBeenCalled();
    expect(component.commentUserAdd).toBeTruthy;
  });

  it('should be called updatePercentage', () => {
    const spy = spyOn(component, 'updatePercentage').and.callThrough();

    component.updatePercentage(70);
    expect(spy).toBeDefined();
    expect(spy).toHaveBeenCalled();
    expect(component.updatePercentage).toBeTruthy;
  });
  it('should be called updatePercentage is 0', () => {
    const spy = spyOn(component, 'updatePercentage').and.callThrough();

    component.updatePercentage(0);
    expect(spy).toBeDefined();
    expect(spy).toHaveBeenCalled();
    expect(component.updatePercentage).toBeTruthy;
  });
  it('should be called updatePercentage is 100', () => {
    const spy = spyOn(component, 'updatePercentage').and.callThrough();

    component.updatePercentage(100);
    expect(spy).toBeDefined();
    expect(spy).toHaveBeenCalled();
    expect(component.updatePercentage).toBeTruthy;
  });
  it('should be called updateLabel', () => {
    const spy = spyOn(component, 'updateLabel').and.callThrough();

    component.updateLabel(true);
    expect(spy).toBeDefined();
    expect(spy).toHaveBeenCalled();
    expect(component.updateLabel).toBeTruthy;
  });
  it('should be called ngOnInit', () => {
    const spy = spyOn(component, 'ngOnInit').and.callThrough();
    component.parentTaskData = { startDate: "" };

    component.ngOnInit();
    expect(spy).toBeDefined();
    expect(spy).toHaveBeenCalled();
    expect(component.ngOnInit).toBeTruthy;
  });
  it('should be called ngOnDestroy', () => {
    const spy = spyOn(component, 'ngOnDestroy').and.callThrough();

    component.ngOnDestroy();
    expect(spy).toBeDefined();
    expect(spy).toHaveBeenCalled();
    expect(component.ngOnInit).toBeTruthy;
  });
  it('should be called getAllFiles', () => {
    const spy = spyOn(component, 'getAllFiles').and.callThrough();

    component.getAllFiles();
    expect(spy).toBeDefined();
    expect(spy).toHaveBeenCalled();
    expect(component.getAllFiles).toBeTruthy;
  });
  it('should be called addLinkFormValid', () => {
    const spy = spyOn(component, 'addLinkFormValid').and.callThrough();

    component.addLinkFormValid();
    expect(spy).toBeDefined();
    expect(spy).toHaveBeenCalled();
    expect(component.addLinkFormValid).toBeTruthy;
  });
  it('should be called postComments', () => {
    const spy = spyOn(component, 'postComments').and.callThrough();
    component.comments = [{ id: 0, name: '' }];
    component.postComments();
    expect(spy).toBeDefined();
    expect(spy).toHaveBeenCalled();
    expect(component.postComments).toBeTruthy;
  });
  it('should be called commentsSubscribe', () => {
    const spy = spyOn(component, 'commentsSubscribe').and.callThrough();

    component.commentsSubscribe();
    expect(spy).toBeDefined();
    expect(spy).toHaveBeenCalled();
    expect(component.commentsSubscribe).toBeTruthy;
  });
  it('should be called TasksGetByIdSubscribe', () => {
    const spy = spyOn(component, 'TasksGetByIdSubscribe').and.callThrough();

    const tsk = {
      id: '1',
      title: '',
      description: '',
      bucket: '',
      startDate: '',
      dueDate: '',
      assignees: [],
      status: '',
      progressValue: 0,
      comments: [],
      checklist: [],
      percentComplete: 0,
      subTasks: [],
      hierarchy: '', //normal, parent, child
      relation: '',
      parentTaskId: '',
      expanded: false,
    };
    component.TasksGetByIdSubscribe(tsk);
    expect(spy).toBeDefined();
    expect(spy).toHaveBeenCalled();
    expect(component.TasksGetByIdSubscribe).toBeTruthy;
  });
  it('should be called subscribetaskDeatails', () => {
    const spy = spyOn(component, 'subscribetaskDeatails').and.callThrough();

    component.subscribetaskDeatails(1);
    expect(spy).toBeDefined();
    expect(spy).toHaveBeenCalled();
    expect(component.subscribetaskDeatails).toBeTruthy;
  });
  it('should be called editFormDataGetRow', () => {
    const spy = spyOn(component, 'editFormDataGetRow').and.callThrough();

    component.editFormDataGetRow();
    expect(spy).toBeDefined();
    expect(spy).toHaveBeenCalled();
    expect(component.editFormDataGetRow).toBeTruthy;
  });
  it('should be called isCommentsValid', () => {
    const spy = spyOn(component, 'isCommentsValid').and.callThrough();

    component.isCommentsValid();
    expect(spy).toBeDefined();
    expect(spy).toHaveBeenCalled();
    expect(component.isCommentsValid).toBeTruthy;
  });
  it('should be called sendComment', () => {
    const spy = spyOn(component, 'sendComment').and.callThrough();
    component.comments = [{ id: 0, name: '' }];
    component.sendComment();
    expect(spy).toBeDefined();
    expect(spy).toHaveBeenCalled();
    expect(component.sendComment).toBeTruthy;
  });
  it('should be called addCheckList', () => {
    const spy = spyOn(component, 'addCheckList').and.callThrough();
    component.addchecklistItem = "test"
    component.checkListData = [];
    component.createCheckListItem = function () {
      return {
        title: "",
        isChecked: true
      };
    }

    component.addCheckList();
    expect(spy).toBeDefined();
    expect(spy).toHaveBeenCalled();
    expect(component.addCheckList).toBeTruthy;
  });
  it('should be called closeAssigneesDropDown', () => {
    const spy = spyOn(component, 'closeAssigneesDropDown').and.callThrough();

    component.closeAssigneesDropDown();
    expect(spy).toBeDefined();
    expect(spy).toHaveBeenCalled();
    expect(component.closeAssigneesDropDown).toBeTruthy;
  });
  it('should be called selectProgress', () => {
    const spy = spyOn(component, 'selectProgress').and.callThrough();
    component.selectedProgess = "Completed"
    component.percentage = 0;
    component.selectProgress("Completed");
    expect(spy).toBeDefined();
    expect(spy).toHaveBeenCalled();
    expect(component.selectProgress).toBeTruthy;
  });

  it('should be called updateStartDate', () => {
    const spy = spyOn(component, 'updateStartDate').and.callThrough();

    component.updateStartDate(true);
    expect(spy).toBeDefined();
    expect(spy).toHaveBeenCalled();
    expect(component.updateStartDate).toBeTruthy;
  });
  it('should be called updateEndDate', () => {
    const spy = spyOn(component, 'updateEndDate').and.callThrough();

    component.updateEndDate(true);
    expect(spy).toBeDefined();
    expect(spy).toHaveBeenCalled();
    expect(component.updateEndDate).toBeTruthy;
  });
  it('should be called addTask', () => {
    const spy = spyOn(component, 'addTask').and.callThrough();
    component.parentTaskNameFlag = false;
    component.parentTaskId = null;
    component.addTask();
    expect(spy).toBeDefined();
    expect(spy).toHaveBeenCalled();
    expect(component.addTask).toBeTruthy;
  });
  it("should be called updateTask", () => {

    const spy = spyOn(component, 'updateTask').and.callThrough();

    // component.TimeManagementComponent.updateEstimates =  function(){
    //     return ""
    //   }

    component.isFileUpload = true;
    component.References = [{ url: "", name: "" }];
    component.updateTask();
    expect(spy).toBeDefined();
    expect(spy).toHaveBeenCalled();
    expect(component.updateTask).toBeTruthy;

  });
  it('should be called getAssigneesInfo', () => {
    const spy = spyOn(component, 'getAssigneesInfo').and.callThrough();
    component.getAssigneesInfo();
    expect(spy).toBeDefined();
    expect(spy).toHaveBeenCalled();
    expect(component.getAssigneesInfo).toBeTruthy;
  });
  it('should be called selectBucket', () => {
    const spy = spyOn(component, 'selectBucket').and.callThrough();
    const evt = {
      target: {
        value: '',
      },
    };
    component.selectBucket(evt);
    expect(spy).toBeDefined();
    expect(spy).toHaveBeenCalled();
    expect(component.addBucketChange).toBeTruthy;
  });
  it('should be called clickout', () => {
    const spy = spyOn(component, 'clickout').and.callThrough();
    component.assigneeDropDown = true;
    let event = {
      target: {
        value: ''
      }
    }

    component.clickout(event);
    expect(spy).toBeDefined();
    expect(spy).toHaveBeenCalled();
    expect(component.clickout).toBeTruthy;
  });
  it('should be called filterAssignees', () => {
    const spy = spyOn(component, 'filterAssignees').and.callThrough();
    const evt = {
      target: {
        value: '',
      },
    };

    component.tempAssignListLocal = [{ id: 0, displayName: "" }];
    component.usersList = [{ id: 0, displayName: "" }];
    component.tempUsersList = [{ id: 0, displayName: "" }];
    component.filterAssignees(evt);
    expect(spy).toBeDefined();
    expect(spy).toHaveBeenCalled();
    expect(component.filterAssignees).toBeTruthy;
  });

  it('should be called filterAssignees with searchVal', () => {
    const spy = spyOn(component, 'filterAssignees').and.callThrough();
    const evt = {
      target: {
        value: 'test',
      },
    };

    component.tempAssignListLocal = [{ id: 0, displayName: "test" }];
    component.usersList = [{ id: 0, displayName: "" }];
    component.tempUsersList = [{ id: 0, displayName: "" }];
    component.filterAssignees(evt);
    expect(spy).toBeDefined();
    expect(spy).toHaveBeenCalled();
    expect(component.filterAssignees).toBeTruthy;
  });


  it('should be called commentsAssignee', () => {
    const spy = spyOn(component, 'commentsAssignee').and.callThrough();
    const evt = {
      target: {
        value: '',
      },
    };
    component.commentsAssignee(evt);
    expect(spy).toBeDefined();
    expect(spy).toHaveBeenCalled();
    expect(component.commentsAssignee).toBeTruthy;
  });
  it('should be called fileUpload', () => {
    const spy = spyOn(component, 'fileUpload').and.callThrough();
    const evt = {
      target: {
        files: [
          {
            name: "sample.txt"
          }
        ]
      },
    };
    component.fileUploadData = [];
    component.References = [];

    component.fileUpload(evt);
    expect(spy).toBeDefined();
    expect(spy).toHaveBeenCalled();
    expect(component.fileUpload).toBeTruthy;
  });
  // it('should be called formateDateComment', () => {
  //   const spy = spyOn(component, 'formateDateComment').and.callThrough();
  //   const cdt = '';
  //   component.formateDateComment(cdt);
  //   expect(spy).toBeDefined();
  //   expect(spy).toHaveBeenCalled();
  //   expect(component.formateDateComment).toBeTruthy;
  // });
  it('should be called splitUrl', () => {
    const spy = spyOn(component, 'splitUrl').and.callThrough();
    const file = '';
    component.splitUrl(file);
    expect(spy).toBeDefined();
    expect(spy).toHaveBeenCalled();
    expect(component.splitUrl).toBeTruthy;
  });
  it('should be called lastModified', () => {
    const spy = spyOn(component, 'lastModified').and.callThrough();
    const item = '';
    component.lastModified(item);
    expect(spy).toBeDefined();
    expect(spy).toHaveBeenCalled();
    expect(component.lastModified).toBeTruthy;
  });
  it('should be called isMangerRole', () => {
    const spy = spyOn(component, 'isMangerRole').and.callThrough();
    const actionName = '';
    component.isMangerRole(actionName);
    expect(spy).toBeDefined();
    expect(spy).toHaveBeenCalled();
    expect(component.isMangerRole).toBeTruthy;
  });
  it("should be called addToAssigned", () => {
    const spy = spyOn(component, 'addToAssigned').and.callThrough();
    const event = {
      type: '',
      stopPropagation: function () { }
    };
    const assign = {
      id: 0
    }
    component.assignListLocal = [];
    component.usersList = [{ id: 0, displayName: "test" }, { id: 3, displayName: "test2" }];


    var stopPropagationSpy = spyOn(event, 'stopPropagation');
    component.addToAssigned(assign, 1, event);
    expect(spy).toBeDefined();
    expect(spy).toHaveBeenCalled();
    expect(stopPropagationSpy).toHaveBeenCalledWith();
    expect(component.addToAssigned).toBeTruthy;

  });

  it("should be called addBucketChange", () => {

    const spy = spyOn(component, 'addBucketChange').and.callThrough();
    const evt = {
      target: {
        value: ""
      }
    }
    component.bucketList = [{ "name": "", "id": 0 }]
    component.addTaskForm.controls.bucketValue.setValue("");
    component.addTaskForm.controls.bucketId.setValue(0);
    component.addBucketChange(evt);
    expect(spy).toBeDefined();
    expect(spy).toHaveBeenCalled();
    expect(component.addBucketChange).toBeTruthy;

  });
  it('should be called createCheckListItem', () => {
    const spy = spyOn(component, 'createCheckListItem').and.callThrough();

    component.createCheckListItem('title');
    expect(spy).toBeDefined();
    expect(spy).toHaveBeenCalled();
    expect(component.createCheckListItem).toBeTruthy;
  });
  it('should be called updateCheckList', () => {
    const spy = spyOn(component, 'updateCheckList').and.callThrough();
    const check = {
      "title": ""
    };
    const i = 0;
    const evt = {
      target: {
        value: '',
      },
    };
    component.checkListData = [{ title: "" }]
    component.updateCheckList(evt, check, 0);
    expect(spy).toBeDefined();
    expect(spy).toHaveBeenCalled();
    expect(component.updateCheckList).toBeTruthy;
  });
  it('should be called checkListToggle', () => {
    const spy = spyOn(component, 'checkListToggle').and.callThrough();
    const check = '';
    const evt = {
      target: {
        value: '',
      },
    };

    component.checkListData = [{ isChecked: true }];
    component.checkListToggle(evt);
    expect(spy).toBeDefined();
    expect(spy).toHaveBeenCalled();
    expect(component.checkListToggle).toBeTruthy;
  });
  it('should be called deleteCheckList', () => {
    const spy = spyOn(component, 'deleteCheckList').and.callThrough();
    component.checkListData = [{ title: "test" }]
    component.deleteCheckList(0);
    expect(spy).toBeDefined();
    expect(spy).toHaveBeenCalled();
    expect(component.deleteCheckList).toBeTruthy;
  });
  it('should be called deleteAttachment', () => {
    const spy = spyOn(component, 'deleteAttachment').and.callThrough();

    component.References = [{ name: "test" }]
    component.deleteAttachment(0);
    expect(spy).toBeDefined();
    expect(spy).toHaveBeenCalled();
    expect(component.deleteAttachment).toBeTruthy;
  });
  it('should be called deleteListItem', () => {
    const spy = spyOn(component, 'deleteListItem').and.callThrough();
    component.References = [{ name: "test" }]
    component.deleteListItem(0);
    expect(spy).toBeDefined();
    expect(spy).toHaveBeenCalled();
    expect(component.deleteListItem).toBeTruthy;
  });
  it('should be called sharepointSelectRow', () => {
    const spy = spyOn(component, 'sharepointSelectRow').and.callThrough();
    const row = '';
    const evt = {
      target: {
        value: '',
      },
    };
    component.sharepointSelectRow(row, 1);
    expect(spy).toBeDefined();
    expect(spy).toHaveBeenCalled();
    expect(component.sharepointSelectRow).toBeTruthy;
  });

  it('should be called TasksGetByIdSubscribe', () => {
    const spy = spyOn(component, 'TasksGetByIdSubscribe').and.callThrough();

    component.TasksGetByIdSubscribe(1);
    expect(spy).toBeDefined();
    expect(spy).toHaveBeenCalled();
    expect(component.TasksGetByIdSubscribe).toBeTruthy;
  });
  it('should be called linkSave', () => {
    const spy = spyOn(component, 'linkSave').and.callThrough();
    component.linkSave();
    expect(spy).toBeDefined();
    expect(spy).toHaveBeenCalled();
    expect(component.linkSave).toBeTruthy;
  });
  it('should be called closeAttachModal', () => {
    const spy = spyOn(component, 'closeAttachModal').and.callThrough();

    component.closeAttachModal();
    expect(spy).toBeDefined();
    expect(spy).toHaveBeenCalled();
    expect(component.closeAttachModal).toBeTruthy;
  });

  it('should be called getEstimations', () => {
    const spy = spyOn(component, 'getEstimations').and.callThrough();
    let obj = {
      TaskId: "",
      PlanId: "",
    }
    component.task = {
      estimations: null
    }
    component.estimations = obj;
    component.taskId = "";
    component.getEstimations(obj);
    expect(spy).toBeDefined();
    expect(spy).toHaveBeenCalled();
    expect(component.getEstimations).toBeTruthy;
  });

  it('should be called getEstimations else', () => {
    const spy = spyOn(component, 'getEstimations').and.callThrough();
    let obj = {
      TaskId: "",
      PlanId: "",

    }

    component.task = {
      estimations: ""
    }
    component.estimations = obj;
    component.taskId = {};

    component.getEstimations(obj);
    expect(spy).toBeDefined();
    expect(spy).toHaveBeenCalled();
    expect(component.getEstimations).toBeTruthy;
  });



  it('should be called getLocalDate', () => {
    const spy = spyOn(component, 'getLocalDate').and.callThrough();
    const date = ""
    component.getLocalDate(date);
    expect(spy).toBeDefined();
    expect(spy).toHaveBeenCalled();
    expect(component.getLocalDate).toBeTruthy;
  });
  it('should be called createdDate', () => {
    const spy = spyOn(component, 'createdDate').and.callThrough();
    const date = ""
    component.createdDate(date);
    expect(spy).toBeDefined();
    expect(spy).toHaveBeenCalled();
    expect(component.createdDate).toBeTruthy;
  });

  it('should be called removeAssignee', () => {
    const spy = spyOn(component, 'removeAssignee').and.callThrough();
    const event = {
      type: '',
      stopPropagation: function () { }
    };

    let asign = {
      id: 0
    }

    component.assignListLocal = [{ id: 0, displayName: "" }];
    component.usersList = [{ id: 0, displayName: "" }];

    component.removeAssignee(asign, 0, event);
    expect(spy).toBeDefined();
    expect(spy).toHaveBeenCalled();
    expect(component.removeAssignee).toBeTruthy;
  });


  it('should be called getAssignees', () => {
    const spy = spyOn(component, 'getAssignees').and.callThrough();
    component.assigneeDropDown = true;
    const event = {
      type: '',
      stopPropagation: function () { }
    };
    component.getAssignees(event);
    expect(spy).toBeDefined();
    expect(spy).toHaveBeenCalled();
    expect(component.getAssignees).toBeTruthy;
  });

  // it('should create addeditTask Component linkUpload', () => {
  //   const spy = spyOn(component, 'linkUpload').and.callThrough();
  //   // const node = $("#myModal");
  //   // node.modal = function(){
  //   //   return "show"
  //   // }
  //   // spyOn(node, 'modal').and.returnValue("show");

  //   // const node2 = $(".attachment-modal");
  //   // node2.css = function(){
  //   //   return {"display": "block"}
  //   // }
  //   // spyOn(node2, "css").and.returnValue({});
  //   component.fileuploadFlag  = false;
  //   component.linkUploadFlag = true;
  //   component.sharePointUploadFlag  = false;
  //   component.linkUpload();

  //   expect(spy).toBeDefined();
  //   expect(spy).toHaveBeenCalled();
  //   expect(component.linkUpload).toBeTruthy();
  //   // spyOn(node, "modal").and.returnValue({ });
  //   // expect(component).toBeTruthy();
  // });

  // it('should create addeditTask Component sharePointUpload', () => {
  //   const spy = spyOn(component, 'sharePointUpload').and.callThrough();
  //   component.sharepointSelected  = true;

  //   // const node = $("#myModal");
  //   // node.modal = function(){
  //   //   return "show"
  //   // }
  //   // spyOn(node, 'modal').and.returnValue("show");

  //   // const node2 = $(".attachment-modal");
  //   // node2.css = function(){
  //   //   return {"display": "block"}
  //   // }
  //   // spyOn(node2, "css").and.returnValue({"display": "block"});

  //   component.fileuploadFlag  = false;
  //   component.linkUploadFlag = false;
  //   component.sharePointUploadFlag  = true;

  //   component.sharePointUpload();
  //   expect(spy).toBeDefined();
  //   expect(spy).toHaveBeenCalled();
  //   expect(component.sharePointUpload).toBeTruthy();
  // });



  it('should be called sharePointSave', () => {
    const spy = spyOn(component, 'sharePointSave').and.callThrough();
    component.selectedAttachment = { webUrl: "", name: "" };
    component.References = [];
    component.sharePointSave();
    expect(spy).toBeDefined();
    expect(spy).toHaveBeenCalled();
    expect(component.sharePointSave).toBeTruthy;
  });

  it('should be called sharePointSave References', () => {
    const spy = spyOn(component, 'sharePointSave').and.callThrough();
    component.selectedAttachment = { webUrl: "", name: "" };
    component.References = [{ name: "test" }];
    component.sharePointSave();
    expect(spy).toBeDefined();
    expect(spy).toHaveBeenCalled();
    expect(component.sharePointSave).toBeTruthy;
  });



});
