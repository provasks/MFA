import { TestBed } from '@angular/core/testing';

import { UtilityService } from './utility.service';
import { Assignment } from 'src/app/models/assignment.model';
import { Task } from 'src/app/models/task.model';
import * as moment from 'moment';
import { Accessor } from 'src/app/models/accessor.model';

let accessor = Accessor;
fdescribe('UtilityService', () => {
  let service: UtilityService;
  let assignment = Assignment;
  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UtilityService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
  it('should be called getToday', () => {
    const spy = spyOn(service,'getToday').and.callThrough();
    service.getToday();
    expect(spy).toBeDefined();
    expect(spy).toHaveBeenCalled();
    expect(service.getToday).toBeTruthy;
  });
  it('should be called getDateTaskManagement', () => {
    const spy = spyOn(service,'getDateTaskManagement').and.callThrough();
    service.getDateTaskManagement();
    expect(spy).toBeDefined();
    expect(spy).toHaveBeenCalled();
    expect(service.getDateTaskManagement).toBeTruthy;
  });
  it('should be called getAssigneeData', () => {
    const spy = spyOn(service,'getAssigneeData').and.callThrough();
    service.getAssigneeData();
    expect(spy).toBeDefined();
    expect(spy).toHaveBeenCalled();
    expect(service.getAssigneeData).toBeTruthy;
  });
  it('should be called setAssigneeData', () => {
    const spy = spyOn(service,'setAssigneeData').and.callThrough();
    service.setAssigneeData("john");
    expect(spy).toBeDefined();
    expect(spy).toHaveBeenCalled();
    expect(service.setAssigneeData).toBeTruthy;
  });
  it('should be called setHeaderTop', () => {
    const spy = spyOn(service,'setHeaderTop').and.callThrough();
    service.setHeaderTop(10);
    expect(spy).toBeDefined();
    expect(spy).toHaveBeenCalled();
    expect(service.setHeaderTop).toBeTruthy;
  });
  it('should be called setDateTaskManagement', () => {
    const spy = spyOn(service,'setDateTaskManagement').and.callThrough();
    service.setDateTaskManagement("john");
    expect(spy).toBeDefined();
    expect(spy).toHaveBeenCalled();
    expect(service.setDateTaskManagement).toBeTruthy;
  });

  it('should be called setShowHideResourceDetails', () => {
    const spy = spyOn(service,'setShowHideResourceDetails').and.callThrough();
    service.setShowHideResourceDetails(false);
    expect(spy).toBeDefined();
    expect(spy).toHaveBeenCalled();
    expect(service.setShowHideResourceDetails).toBeTruthy;
  });

  it('should be called showHideResourceDetails', () => {
    const spy = spyOn(service,'showHideResourceDetails').and.callThrough();
    service.showHideResourceDetails();
    expect(spy).toBeDefined();
    expect(spy).toHaveBeenCalled();
    expect(service.showHideResourceDetails).toBeTruthy;
  });

  it('should be called setTaskDeleted', () => {
    const spy = spyOn(service,'setTaskDeleted').and.callThrough();
    service.setTaskDeleted(false);
    expect(spy).toBeDefined();
    expect(spy).toHaveBeenCalled();
    expect(service.setTaskDeleted).toBeTruthy;
  });

  it('should be called getTaskDeleted', () => {
    const spy = spyOn(service,'getTaskDeleted').and.callThrough();
    service.getTaskDeleted();
    expect(spy).toBeDefined();
    expect(spy).toHaveBeenCalled();
    expect(service.getTaskDeleted).toBeTruthy;
  });

  it('should be called triggerReloadTasks', () => {
    const spy = spyOn(service,'triggerReloadTasks').and.callThrough();
    service.triggerReloadTasks(false);
    expect(spy).toBeDefined();
    expect(spy).toHaveBeenCalled();
    expect(service.triggerReloadTasks).toBeTruthy;
  });

  it('should be called reloadTasks', () => {
    const spy = spyOn(service,'reloadTasks').and.callThrough();
    service.reloadTasks();
    expect(spy).toBeDefined();
    expect(spy).toHaveBeenCalled();
    expect(service.reloadTasks).toBeTruthy;
  });

  it('should be called setLineClicked', () => {
    const spy = spyOn(service,'setLineClicked').and.callThrough();
    service.setLineClicked("");
    expect(spy).toBeDefined();
    expect(spy).toHaveBeenCalled();
    expect(service.setLineClicked).toBeTruthy;
  });
  it('should be called getLineClicked', () => {
    const spy = spyOn(service,'getLineClicked').and.callThrough();
    service.getLineClicked();
    expect(spy).toBeDefined();
    expect(spy).toHaveBeenCalled();
    expect(service.getLineClicked).toBeTruthy;
  });
  it('should be called getCommentsSearch', () => {
    const spy = spyOn(service,'getCommentsSearch').and.callThrough();
    service.getCommentsSearch();
    expect(spy).toBeDefined();
    expect(spy).toHaveBeenCalled();
    expect(service.getCommentsSearch).toBeTruthy;
  });
  it('should be called setCommentsSearch', () => {
    const spy = spyOn(service,'setCommentsSearch').and.callThrough();
    service.setCommentsSearch("john");
    expect(spy).toBeDefined();
    expect(spy).toHaveBeenCalled();
    expect(service.setCommentsSearch).toBeTruthy;
  });

  it('should be called getExcelUploadFlag', () => {
    const spy = spyOn(service,'getExcelUploadFlag').and.callThrough();
    service.getExcelUploadFlag();
    expect(spy).toBeDefined();
    expect(spy).toHaveBeenCalled();
    expect(service.getExcelUploadFlag).toBeTruthy;
  });
  it('should be called setExcelUploadFlag', () => {
    const spy = spyOn(service,'setExcelUploadFlag').and.callThrough();
    service.setExcelUploadFlag("john");
    expect(spy).toBeDefined();
    expect(spy).toHaveBeenCalled();
    expect(service.setExcelUploadFlag).toBeTruthy;
  });

  it('should be called getTaskTableFlag', () => {
    const spy = spyOn(service,'getTaskTableFlag').and.callThrough();
    service.getTaskTableFlag();
    expect(spy).toBeDefined();
    expect(spy).toHaveBeenCalled();
    expect(service.getTaskTableFlag).toBeTruthy;
  });

  it('should be called getHeaderWidth', () => {
    const spy = spyOn(service,'getHeaderWidth').and.callThrough();
    service.getHeaderWidth();
    expect(spy).toBeDefined();
    expect(spy).toHaveBeenCalled();
    expect(service.getHeaderWidth).toBeTruthy;
  });
  it('should be called setHeaderWidth', () => {
    const spy = spyOn(service,'setHeaderWidth').and.callThrough();
    service.setHeaderWidth("john");
    expect(spy).toBeDefined();
    expect(spy).toHaveBeenCalled();
    expect(service.setHeaderWidth).toBeTruthy;
  });

  it('should be called getTaskIndex', () => {
    const spy = spyOn(service,'getTaskIndex').and.callThrough();
    const tsk=[]
    service.getTaskIndex("1", tsk)
    expect(spy).toBeDefined();
    expect(spy).toHaveBeenCalled();
    expect(service.getTaskIndex).toBeTruthy;
  });

  it('should be called isNoLoadAPI', () => {
    const spy = spyOn(service,'isNoLoadAPI').and.callThrough();
    const url="www.abc.com"
    service.isNoLoadAPI(url)
    expect(spy).toBeDefined();
    expect(spy).toHaveBeenCalled();
    expect(service.isNoLoadAPI).toBeTruthy;
  });

  it('should be called getMinimumValue', () => {
    const spy = spyOn(service,'getMinimumValue').and.callThrough();
    const tsk=[];
    const e = {
      target: {
        value: ''
      }
    }
    service.getMinimumValue(tsk)
    expect(spy).toBeDefined();
    expect(spy).toHaveBeenCalled();
    expect(service.getMinimumValue).toBeTruthy;
  });

  it('should be called getMaximumValue', () => {
    const spy = spyOn(service,'getMaximumValue').and.callThrough();
    const tsk=[];
    const e = {
      target: {
        value: ''
      }
    }
    service.getMaximumValue(tsk)
    expect(spy).toBeDefined();
    expect(spy).toHaveBeenCalled();
    expect(service.getMaximumValue).toBeTruthy;
  });

  it('should be called getDistinctMonths', () => {
    const spy = spyOn(service,'getDistinctMonths').and.callThrough();
    const days=[{"year":"1994", "monthName": "May"}]
    service.getDistinctMonths(days,"1994")
    expect(spy).toBeDefined();
    expect(spy).toHaveBeenCalled();
    expect(service.getDistinctMonths).toBeTruthy;
  });
  it('should be called getDistinctYears', () => {
    const spy = spyOn(service,'getDistinctYears').and.callThrough();
    const days=[{"year": "2020"}]
    service.getDistinctYears(days)
    expect(spy).toBeDefined();
    expect(spy).toHaveBeenCalled();
    expect(service.getDistinctYears).toBeTruthy;
  });

  it('should be called unflatten', () => {
    const spy = spyOn(service,'unflatten').and.callThrough();
    const arr=[{"id":0}]
    service.unflatten(arr);
    expect(spy).toBeDefined();
    expect(spy).toHaveBeenCalled();
    expect(service.unflatten).toBeTruthy;
  });

  it('should be called flatten when there is no subTask', () => {
    const spy = spyOn(service,'flatten').and.callThrough();
    const tasks = [{"id":"5B8O885_gUiypfWvCSdi-MkAJMME","parentTaskId":null,"planId":null,"groupId":null,"description":null,"title":"testing","bucket":"To do","bucketId":"BKswskVRFk6KTjJ9yc3hOckALNim","startDate":"23/08/2020 10:00:00","createdDateTime":"2020-08-24T08:30:58.5788929+00:00","dueDateTime":"2020-08-25T10:00:00+00:00","startDateTime":"2020-08-23T10:00:00+00:00","dueDate":"25/08/2020 10:00:00","status":"Not Started","eTag":"W/\"JzEtVGFzayAgQEBAQEBAQEBAQEBAQEBATCc=\"","percentComplete":0,"assignees":[],"checkLists":null,"references":null,"subTasks":[],"dependancies":[],"appliedCategories":{"category1":false,"category2":false,"category3":false,"category4":false,"category5":false,"category6":false}}];
    service.flatten(tasks);
    expect(spy).toBeDefined();
    expect(spy).toHaveBeenCalled();
    expect(service.flatten).toBeTruthy;
  });

  it('should be called flatten when there is subTask', () => {
    const spy = spyOn(service,'flatten').and.callThrough();
    const task = {
      "id": "8nAtZUyDYU28WUyWunJqwMkAEUlI",
      "parentTaskId": null,
      "planId": null,
      "groupId": null,
      "description": null,
      "title": "API Integration",
      "bucket": "UI Development",
      "bucketId": "rmoUUvmG406Kw5VIqpZPgMkAEKDj",
      "startDate": "15/06/2020 00:00:00",
      "createdDateTime": "2020-07-01T05:35:07.5666216+00:00",
      "dueDateTime": "2020-06-19T00:00:00+00:00",
      "startDateTime": "2020-06-15T00:00:00+00:00",
      "dueDate": "19/06/2020 00:00:00",
      "status": "Completed",
      "eTag": "W/\"JzEtVGFzayAgQEBAQEBAQEBAQEBAQEBAcCc=\"",
      "percentComplete": 100,
      "assignees": [
        {
          "id": "658746d7-e1bb-47c9-a014-232ce11122f7",
          "email": "Ramya.Hosavalike@trianzsandbox.onmicrosoft.com",
          "displayName": "Ramya Hosavalike",
          "photo": null
        },
        {
          "id": "404a2579-44c3-4181-92ba-3dd1363a56ca",
          "email": "david@trianzsandbox.onmicrosoft.com",
          "displayName": "David Longmuir",
          "photo": ""
        }
      ],
      "checkLists": null,
      "references": null,
      "subTasks": [
        {
          "id": "s24zkCnnDk-7wChnOWDBj8kAIU_Y",
          "parentTaskId": "8nAtZUyDYU28WUyWunJqwMkAEUlI",
          "planId": null,
          "groupId": null,
          "description": null,
          "title": "child 01",
          "bucket": "To do",
          "bucketId": "IIX0djblHUyOCo3YkYMoOskAOsrg",
          "startDate": "01/07/2020 00:00:00",
          "createdDateTime": "2020-07-07T11:38:27.7631928+00:00",
          "dueDateTime": "2020-07-04T00:00:00+00:00",
          "startDateTime": "2020-07-01T00:00:00+00:00",
          "dueDate": "04/07/2020 00:00:00",
          "status": "Not Started",
          "eTag": "W/\"JzEtVGFzayAgQEBAQEBAQEBAQEBAQEBASCc=\"",
          "percentComplete": 0,
          "assignees": [],
          "checkLists": null,
          "references": null,
          "subTasks": [],
          "dependancies": [
            {
              "id": 237,
              "taskId": "v6_rIjeoukq5SdaaMm9EG8kALorI",
              "parentTaskId": "s24zkCnnDk-7wChnOWDBj8kAIU_Y",
              "typeId": null,
              "planId": null,
              "dependencyType": "Finish-Start",
              "color": "#FFC0CB",
              "title": "medicure support"
            },
            {
              "id": 241,
              "taskId": "lNrYEfo-UUmLb2_QeSbJRskAFNh4",
              "parentTaskId": "s24zkCnnDk-7wChnOWDBj8kAIU_Y",
              "typeId": null,
              "planId": null,
              "dependencyType": "Start-Finish",
              "color": "#0000FF",
              "title": "child test build18"
            }
          ],
          "appliedCategories": {
            "category1": false,
            "category2": false,
            "category3": false,
            "category4": false,
            "category5": false,
            "category6": false
          }
        }
      ],
      "dependancies": [],
      "appliedCategories": {
        "category1": false,
        "category2": true,
        "category3": true,
        "category4": true,
        "category5": false,
        "category6": false
      }
    }
    const tasks = [task];
    service.flatten(tasks);
    expect(spy).toBeDefined();
    expect(spy).toHaveBeenCalled();
    expect(service.flatten).toBeTruthy;
  });
  
  it('should be called setTaskManipulatedData', () => {
    const spy = spyOn(service,'setTaskManipulatedData').and.callThrough();
    const val=""
    service.setTaskManipulatedData(val);
    expect(spy).toBeDefined();
    expect(spy).toHaveBeenCalled();
    expect(service.setTaskManipulatedData).toBeTruthy;
  });

  it('should be called setParameters', () => {
    const spy = spyOn(service,'setParameters').and.callThrough();
    const val=""
    service.setParameters(val);
    expect(spy).toBeDefined();
    expect(spy).toHaveBeenCalled();
    expect(service.setParameters).toBeTruthy;
  });
  it('should be called getParameters', () => {
    const spy = spyOn(service,'getParameters').and.callThrough();
    service.getParameters()
    expect(spy).toBeDefined();
    expect(spy).toHaveBeenCalled();
    expect(service.getParameters).toBeTruthy;
  });

  it('should be called setparentTaskName', () => {
    const spy = spyOn(service,'setparentTaskName').and.callThrough();
    service.setparentTaskName(false);
    expect(spy).toBeDefined();
    expect(spy).toHaveBeenCalled();
    expect(service.setparentTaskName).toBeTruthy;
  });
  it('should be called getparentTaskName', () => {
    const spy = spyOn(service,'getparentTaskName').and.callThrough();
    service.getparentTaskName()
    expect(spy).toBeDefined();
    expect(spy).toHaveBeenCalled();
    expect(service.getparentTaskName).toBeTruthy;
  });

  it('should be called getObjectProperty', () => {
    const spy = spyOn(service,'getObjectProperty').and.callThrough();
    service.getObjectProperty(".navbar","height");
    expect(spy).toBeDefined();
    expect(spy).toHaveBeenCalled();
    expect(service.getObjectProperty).toBeTruthy;
  });

  it('should be called getdependencyModalFlag', () => {
    const spy = spyOn(service,'getdependencyModalFlag').and.callThrough();
    service.getdependencyModalFlag()
    expect(spy).toBeDefined();
    expect(spy).toHaveBeenCalled();
    expect(service.getdependencyModalFlag).toBeTruthy;
  });

  it('should be called setTaskTableFlag', () => {
    const spy = spyOn(service,'setTaskTableFlag').and.callThrough();
    service.setTaskTableFlag(false);
    expect(spy).toBeDefined();
    expect(spy).toHaveBeenCalled();
    expect(service.setTaskTableFlag).toBeTruthy;
  });

  it('should be called setTaskData', () => {
    const spy = spyOn(service,'setTaskData').and.callThrough();
    service.setTaskData(false);
    expect(spy).toBeDefined();
    expect(spy).toHaveBeenCalled();
    expect(service.setTaskData).toBeTruthy;
  });
  it('should be called getTaskData', () => {
    const spy = spyOn(service,'getTaskData').and.callThrough();
    service.getTaskData()
    expect(spy).toBeDefined();
    expect(spy).toHaveBeenCalled();
    expect(service.getTaskData).toBeTruthy;
  });

  it('should be called getDatarowExpandCollapseEvent', () => {
    const spy = spyOn(service,'getDatarowExpandCollapseEvent').and.callThrough();
    service.getDatarowExpandCollapseEvent()
    expect(spy).toBeDefined();
    expect(spy).toHaveBeenCalled();
    expect(service.getDatarowExpandCollapseEvent).toBeTruthy;
  });

  it('should be called hasSubtasks', () => {
    const spy = spyOn(service,'hasSubtasks').and.callThrough();
    const tsk={
      id: "",
      title: "",
      description: "",
      bucket: "",
      startDate: "",
      dueDate: "",
      assignees: [],
      status: "",
      progressValue: 0,
      comments: [],
      checklist: [],
      percentComplete: 0,
      subTasks: [],
      hierarchy: "", //normal, parent, child
      relation:"",
      parentTaskId: "",
      expanded: false,
  
  
    }
    service.hasSubtasks(tsk);
    expect(spy).toBeDefined();
    expect(spy).toHaveBeenCalled();
    expect(service.hasSubtasks).toBeTruthy;
  });

  it('should be called getNestedChildren', () => {
    const spy = spyOn(service,'getNestedChildren').and.callThrough();
    const val=""
    const arr=[{"parent":"", "id":0, "children": ""}]
    service.getNestedChildren(arr,val);
    expect(spy).toBeDefined();
    expect(spy).toHaveBeenCalled();
    expect(service.getNestedChildren).toBeTruthy;
  });

  it('should be called setAssignment', () => {
    const spy = spyOn(service,'setAssignment').and.callThrough();
    const val= assignment;
    service.setAssignment(new val);
    expect(spy).toBeDefined();
    expect(spy).toHaveBeenCalled();
    expect(service.setAssignment).toBeTruthy;
  });

  it('should be called getAssignment', () => {
    const spy = spyOn(service,'getAssignment').and.callThrough();
    service.getAssignment();
    expect(spy).toBeDefined();
    expect(spy).toHaveBeenCalled();
    expect(service.getAssignment).toBeTruthy;
  });
  
  it('should be called getAssignment', () => {
    const spy = spyOn(service,'setDatarowExpandCollapseEvent').and.callThrough();
    service.setDatarowExpandCollapseEvent(new Task);
    expect(spy).toBeDefined();
    expect(spy).toHaveBeenCalled();
    expect(service.setDatarowExpandCollapseEvent).toBeTruthy;
  });

  it('should be called manipulateData', () => {
    const spy = spyOn(service,'manipulateData').and.callThrough();
    // spyOn(service, 'flatten')
    spyOn(service, 'getTaskIndex')
    const tasks = [];
    service.dependencies = []
    // const obj = {
    //   predecessor: accessor, 
    //   successor: accessor
    // };
    // const tasks = [{"id":"5B8O885_gUiypfWvCSdi-MkAJMME","parentTaskId":null,"planId":null,"groupId":null,"description":null,"title":"testing","bucket":"To do","bucketId":"BKswskVRFk6KTjJ9yc3hOckALNim","startDate":"23/08/2020 10:00:00","createdDateTime":"2020-08-24T08:30:58.5788929+00:00","dueDateTime":"2020-08-25T10:00:00+00:00","startDateTime":"2020-08-23T10:00:00+00:00","dueDate":"25/08/2020 10:00:00","status":"Not Started","eTag":"W/\"JzEtVGFzayAgQEBAQEBAQEBAQEBAQEBATCc=\"","percentComplete":0,"assignees":[],"checkLists":null,"references":null,"subTasks":[],"dependancies":[],"appliedCategories":{"category1":false,"category2":false,"category3":false,"category4":false,"category5":false,"category6":false}}];
    service.manipulateData(tasks);
    expect(spy).toBeDefined();
    expect(spy).toHaveBeenCalled();
    expect(service.manipulateData).toBeTruthy;
  });

  it('should be called printToImage', () => {
    const spy = spyOn(service,'printToImage').and.callThrough();
    const task = [];
    service.dependencies = [];
    service.printToImage(document, 'image');
    expect(spy).toBeDefined();
    expect(spy).toHaveBeenCalled();
    expect(service.printToImage).toBeTruthy;
  });

  it('should be called getCalenderDays', () => {
    const spy = spyOn(service,'getCalenderDays').and.callThrough();
    const startDate = moment();
    service.getCalenderDays(startDate, startDate);
    expect(spy).toBeDefined();
    expect(spy).toHaveBeenCalled();
    expect(service.getCalenderDays).toBeTruthy;
  });

  it('should be called setCalenderStartDate', () => {
    const spy = spyOn(service,'setCalenderStartDate').and.callThrough();
    const startDate = moment();
    service.setCalenderStartDate(startDate);
    expect(spy).toBeDefined();
    expect(spy).toHaveBeenCalled();
    expect(service.setCalenderStartDate).toBeTruthy;
  });
  
  it('should be called setCalenderEndDate', () => {
    const spy = spyOn(service,'setCalenderEndDate').and.callThrough();
    const startDate = moment();
    const settings = {
      project: {
          ganttChart: 
           {
             extraDays: ''
           }
        }
    }
    service.setCalenderEndDate(startDate);
    expect(spy).toBeDefined();
    expect(spy).toHaveBeenCalled();
    expect(service.setCalenderEndDate).toBeTruthy;
  });
 
  

  it('should be called stringToDate', () => {
    const spy = spyOn(service,'stringToDate').and.callThrough();
    service.stringToDate('','');
    expect(spy).toBeDefined();
    expect(spy).toHaveBeenCalled();
    expect(service.stringToDate).toBeTruthy;
  });
  

  it('should be called isoDateToMoment', () => {
    const spy = spyOn(service,'isoDateToMoment').and.callThrough();
    service.isoDateToMoment('');
    expect(spy).toBeDefined();
    expect(spy).toHaveBeenCalled();
    expect(service.isoDateToMoment).toBeTruthy;
  });
  

  it('should be called getDateDifference', () => {
    const spy = spyOn(service,'getDateDifference').and.callThrough();
    service.getDateDifference('','','','');
    expect(spy).toBeDefined();
    expect(spy).toHaveBeenCalled();
    expect(service.getDateDifference).toBeTruthy;
  });
  

  it('should be called getMomentDifference', () => {
    const spy = spyOn(service,'getMomentDifference').and.callThrough();
    const startDate = moment();
    service.getMomentDifference(startDate, startDate,'');
    expect(spy).toBeDefined();
    expect(spy).toHaveBeenCalled();
    expect(service.getMomentDifference).toBeTruthy;
  });

  it('should be called isMangerRole', () => {
    const spy = spyOn(service,'isMangerRole').and.callThrough();
    service.isMangerRole('');
    expect(spy).toBeDefined();
    expect(spy).toHaveBeenCalled();
    expect(service.isMangerRole).toBeTruthy;
  });
  it('should be called isMangerRole when action found', () => {
    const spy = spyOn(service,'isMangerRole').and.callThrough();
    service.roleActions = ["abc"];
    service.isMangerRole('test');
    expect(spy).toBeDefined();
    expect(spy).toHaveBeenCalled();
    expect(service.isMangerRole).toBeTruthy;
  });

  

  // it('should be called setHierarchy', () => {
  //   const spy = spyOn(service,'setHierarchy').and.callThrough();
  //   const startDate = moment();
  //   const tasks: Task[] = [];
  //   const taskid= [''];
  //   service.setHierarchy(tasks, taskid);
  //   expect(spy).toBeDefined();
  //   expect(spy).toHaveBeenCalled();
  //   expect(service.setHierarchy).toBeTruthy;
  // });

  // it('should be called reorderTasks', () => {
  //   const spy = spyOn(service,'reorderTasks').and.callThrough();
  //   const startDate = moment();
  //   const tasks: Task[] = [];
  //   service.reorderTasks(tasks, '');
  //   expect(spy).toBeDefined();
  //   expect(spy).toHaveBeenCalled();
  //   expect(service.reorderTasks).toBeTruthy;
  // });

  // it('should be called setMoment', () => {
  //   const spy = spyOn(service,'setMoment').and.callThrough();
  //   const task={
  //     id: "",
  //     title: "",
  //     description: "",
  //     bucket: "",
  //     startDate: "",
  //     dueDate: "",
  //     assignees: [],
  //     status: "",
  //     progressValue: 0,
  //     comments: [],
  //     checklist: [],
  //     percentComplete: 0,
  //     subTasks: [],
  //     hierarchy: "", //normal, parent, child
  //     relation:"",
  //     parentTaskId: "",
  //     expanded: false,
  
  
  //   }
  //   service.setMoment(task);
  //   expect(spy).toBeDefined();
  //   expect(spy).toHaveBeenCalled();
  //   expect(service.setMoment).toBeTruthy;
  // });
  
  

});
