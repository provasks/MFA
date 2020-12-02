import { Component, OnInit, Input, Output, ViewChild, EventEmitter, ElementRef, HostListener } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { inputMaxLength } from '../../../../contents/config';
import * as moment from 'moment';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table'
import { DomSanitizer } from '@angular/platform-browser';
import { UsersListComponent } from '../users-list/users-list.component';
import { TimeManagementComponent } from '../time-management/time-management.component';
import { MatDialog } from '@angular/material/dialog';
import { UtilityService } from '../../../../shared/services/utility.service';
import { ApiService } from '../../../../api.service';
import { Assignee } from '../../../../models/assignee.model';
import { environment } from '../../../../../environments/environment';
import { FileErrorDailogComponent } from '../../../../shared/components/file-error-dailog/file-error-dailog.component';
import { Task } from '../../../../models/task.model';

declare var $: any;
@Component({
  selector: 'add-edit-comp',
  templateUrl: './add-edit-task.component.html',
  styleUrls: ['./add-edit-task.component.scss']
})

export class AddEditTaskComponet implements OnInit {
  noListMatch: boolean = false;
  commenstSearchAsgnee: string = '';
  selectionIndex: any;
  rangeFlag: boolean = false;
  bucketSubscription$: Subscription;
  groupMemberSubscription$: Subscription;
  labelSubscription$: Subscription;
  addTaskSubscription$: Subscription;
  updateTaskSubscription$: Subscription;
  uploadFilesSubscription$: Subscription;
  tasksSubscription$: Subscription;
  taskDetailSubscription$: Subscription;
  commentSubscrition$: Subscription;
  taskSubmitSubscrition$: Subscription;
  attachmentSubscription$: Subscription;
  addTaskStartDateMinValue: any = '';
  editRowData: any;
  startDateMin: any = '';
  parentTaskDataEdit: any;
  timeManagementFlag = false;
  estimations: any;
  fileTypes = ".doc,.docx,.xls,.xlsx,.xlsm,.xlsb,.xltx,.txt,.ppt,.pptx,.pdf,.png,.jpg,.jpeg,.svg,.bmp,.tif,.tiff,.gif,.mpp,.psd,.mp4,.vsdx";
  taskManagementDate: any = {
    "startDate": '',
    "dueDate": ''
  };
  commentsLength: any;
  addEstimateSubscription$: Subscription;
  updateEstimateSubscription$: Subscription;
  getparentTaskNameSubscription$: Subscription;
  getTaskManipulatedDataSubscription$: Subscription;
  getTaskDataSubscription$: Subscription;
  getTaskByIdSubscription$: Subscription;

  maxLengthInput;
  maxLengthTextArea;
  linkForm: any;
  isEstimateAdd = false;
  profile: Assignee;

  @HostListener('document:click', ['$event'])
  clickout(event) {
    if (!(event.target.parentElement?.classList.contains("assigne-search"))) {
      this.assigneeDropDown = false;
    } else {
      this.assigneeDropDown = true;
    }
  }

  @ViewChild(TimeManagementComponent) TimeManagementComponent: TimeManagementComponent;

  @ViewChild(MatSort, { static: true }) sort: MatSort;
  displayedColumns: string[] = ['name', 'ModifiedDate'];

  @Input() isAddTaskFlag;
  @Input() isEditTaskFlag: boolean = false;
  @Input() childTaskId;
  @Input() parentTaskName;

  @Input() parentTaskData: any = '';
  @Output() closeAddEditModalEmit = new EventEmitter<boolean>();
  addEditTaskModal = false;
  fileuploadFlag = true;
  linkUploadFlag = false;
  sharePointUploadFlag = false;
  bucketList: any;
  parentTaskId: any;
  addTaskForm = this.fb.group({
    taskName: ['', Validators.required],
    bucketValue: [''],
    bucketId: [''],
    startDateVal: ['', Validators.required],
    dueDateVal: ['', Validators.required],
    notesAddVal: [''],
    assigneSearchValue: [''],
  });

  attachmentsList: any = [];
  References: any = [];
  usersList: any = [];
  tempUsersList: any = [];
  commentUsers: any[] = [];
  assigneeDropDown: boolean = false;
  searchedAssignees: any;
  tempAssignListLocal: any = [];
  assignListLocal: any = [];
  progressList = ['Not Started', 'In Progress', 'Completed']

  checkListData: any = [];
  comments: any = [];
  linksList = [];
  attachFiles = '';
  postId: any;
  jsonTaskData: Object;
  editTaskData: any;
  startDate: any = '';
  dueDate: any;
  taskName = '';
  selectedBucket = '';
  selectedProgess = '';
  addchecklistItem: string = '';
  assigneSearchValue = '';
  linkUrlNameValue = '';
  linkUrlValue = '';
  commentsValue = '';
  lastChange = '';
  ApiSertaskData: any;
  objBucket: any;
  fileType: string;
  bucketListEdit = [];
  editObjBucket: any;
  taskId: any;
  eTag: any;
  groupId: any;
  bucketId: any;

  notes: any = "";
  taskDetails: any;
  task: any;
  conversationThreadId: any;
  // ELEMENT_DATA:any = []
  dataSourceAttachments = new MatTableDataSource(this.attachmentsList);
  selectedAttachment: any;
  rowIndex: any;
  sharepointSelected = true;
  // commentsSecFlag: boolean = false;
  createdByName: any = '';
  createdDateTime: any = '';
  taskTitle: any = '';
  fileUploadData: any;
  isFileUpload = false;
  commentUsersFlag = false;
  percentage: any = 0;
  appliedCategories: any;
  labelsFlag = false;
  labelNamesData: any;
  parentTaskNameFlag = false;

  @ViewChild(UsersListComponent) UsersListComponent: UsersListComponent;

  constructor(private dialog: MatDialog,
    private fb: FormBuilder,
    private http: HttpClient,
    private eRef: ElementRef,
    public utility: UtilityService,
    private apiSer: ApiService,
    public domSanitizer: DomSanitizer,
  ) {
    this.usersList = [];
    this.tempUsersList = [];
    this.assignListLocal = [];
    this.tempAssignListLocal = [];
    this.addTaskForm.reset();

  }

  sendMessageToParent() {
    this.usersList = [];
    this.tempUsersList = [];
    this.assignListLocal = [];
    this.tempAssignListLocal = [];
    this.addTaskForm.reset();
    this.closeAddEditModalEmit.emit(this.addEditTaskModal);
    this.parentTaskNameFlag = false;
    this.utility.setparentTaskName(false);

  }

  commentUserAdd(event) {

    // console.log('value', event)
    let beforeStr = this.commentsValue.substr(0, this.commentsValue.indexOf('@'));
    let afterStr = this.commentsValue.substr(this.selectionIndex, this.commentsValue.length);
    this.commentsValue = beforeStr + event + afterStr;

    this.commentUsersFlag = false;
  }


  filterAssignees(event) {
    let searchVal = event.target.value.toLowerCase();
    if (searchVal != '') {
      this.assignListLocal = [];
      this.usersList = [];
      this.assignListLocal = this.tempAssignListLocal?.filter(val => val.displayName.toLowerCase().indexOf(searchVal) != -1);
      this.usersList = this.tempUsersList?.filter(val => val.displayName.toLowerCase().indexOf(searchVal) != -1);

    } else {
      this.tempUsersList.map((obj, i) => {
        this.tempAssignListLocal.filter((item, j) => {
          if (obj.id == item.id) {
            this.tempUsersList.splice(i, 1);
          }
        })
      });

      if (this.usersList.length > 0) {
        this.usersList.map((item, i) => {
          this.tempAssignListLocal.map((obj, j) => {
            if (item.id == obj.id) {
              this.tempAssignListLocal.splice(j, 1);
            }
          })
        })
      }

      var merge = this.tempUsersList.concat(this.usersList);
      var tempData = new Set(merge);
      this.tempUsersList = [...tempData];

      var assigneeUserListMerge = this.assignListLocal.concat(this.tempAssignListLocal);
      var tempAssignListLocalData = new Set(assigneeUserListMerge);
      this.tempAssignListLocal = [...tempAssignListLocalData];

      this.tempUsersList.sort(function (a, b) {
        return (a.id - b.id);
      });

      this.assignListLocal = this.tempAssignListLocal;
      this.usersList = this.tempUsersList;

    }

  }

  addToAssigned(assign, index, event) {
    // $(event.target.parentElement).tooltip('hide');
    $('.tooltip').hide()
    this.tempAssignListLocal = this.tempAssignListLocal.concat([assign]);
    this.assignListLocal = this.assignListLocal.concat([assign]);

    // the filter duplicate adding issue fix start here 
    var duplicateRemove = new Set(this.tempAssignListLocal);
    this.tempAssignListLocal = [...duplicateRemove]
    this.assignListLocal?.sort(function (a, b) {
      return (a.id - b.id);
    });

    /* removing the selected assignee from usersList */
    this.usersList?.map((x, j) => {
      if (x.id == assign.id) {
        this.usersList.splice(j, 1);

      }
    }).sort(function (a, b) {
      return (a.id - b.id);
    });;

    this.tempUsersList?.map((xObj, ide) => {
      if (xObj.id == assign.id) {
        this.tempUsersList.splice(ide, 1);
      }
    }).sort(function (a, b) {
      return (a.id - b.id);
    });

    this.utility.setAssigneeData(this.tempAssignListLocal);
    event.stopPropagation();  // for stop hiding assignee drop down

  }

  removeAssignee(assign, index, event) {
    this.tempUsersList = this.tempUsersList.concat([assign]);
    this.usersList = this.usersList.concat([assign]);

    this.assignListLocal?.forEach((item, ind) => {
      if (item.id == assign.id) {
        // this.tempAssignListLocal.splice(ind, 1);
        this.assignListLocal.splice(ind, 1);
      }
    });

    this.tempAssignListLocal?.forEach((item, ind) => {
      if (item.id == assign.id) {
        this.tempAssignListLocal.splice(ind, 1);
      }
    });

    this.usersList?.sort(function (a, b) {
      return (a.id - b.id);
    });
    this.utility.setAssigneeData(this.tempAssignListLocal);
    event.stopPropagation();
  }

  getAssignees(event: any) {
    event.stopPropagation();
    this.assigneeDropDown = !this.assigneeDropDown;
  }

  closeAssigneesDropDown() {
    this.assigneeDropDown = false;
  }

  getAssigneesInfo() {
    return this.http.get('../../../../../assets/data/usersList.json');
  }



  ngOnInit(): void {
    const reg = '(http(s)?://)?([\\da-z.-]+)\\.([a-z.]{2,6})[/\\w .-]*/?';
    this.linkForm = this.fb.group({
      linkUrlValue: ['https://', [Validators.required, Validators.pattern(reg)]],
      linkUrlNameValue: ["", [Validators.required]]
    })

    this.maxLengthInput = inputMaxLength.maxLengthInput;
    this.maxLengthTextArea = inputMaxLength.maxLengthTextArea;


    this.dataSourceAttachments.sort = this.sort;

    this.getparentTaskNameSubscription$ = this.utility.getparentTaskName().subscribe(res => {
      this.parentTaskNameFlag = res;
      if (this.parentTaskNameFlag) {
        if (this.parentTaskData) {
          let datetSplit = this.parentTaskData.startDate.split('/');
          let parentDateFormat = datetSplit[datetSplit.length - 1] + '/' + datetSplit[datetSplit.length - 2] + '/' + datetSplit[0];
          this.addTaskForm.controls.startDateVal.setValue(new Date(parentDateFormat));
          this.addTaskStartDateMinValue = new Date(parentDateFormat);
        }
      }
    })

    this.bucketSubscription$ = this.apiSer.getBuckets(this.utility.planId).subscribe(buckets => {
      this.bucketList = buckets;
      this.bucketListEdit = buckets;

      if (this.isAddTaskFlag) {
        this.addTaskForm.controls.bucketValue.setValue(this.bucketList[0]?.name);
        this.addTaskForm.controls.bucketId.setValue(this.bucketList[0]?.id);
        // console.log('bkId Add', this.addTaskForm.controls.bucketId.value, 'bkt name,', this.addTaskForm.controls.bucketValue.value);
      }
    });

    this.groupMemberSubscription$ = this.apiSer.getAllGroupMembers(this.utility.groupId).subscribe(
      res => {
        const groupMembers: Assignee[] = res;
        // this.setProfileImage(groupMembers);
        this.commentUsers = this.commentUsers.concat(groupMembers);
        // console.log('members resp', this.commentUsers);
        this.usersList = groupMembers;
        /* sorting on based id */
        this.usersList?.sort(function (a, b) {
          return (a.id - b.id);
        })
        this.tempUsersList = groupMembers;
        /* sorting on based id */
        this.tempUsersList?.sort(function (a, b) {
          return (a.id - b.id);
        })
        if (this.lastChange != '') {
          for (let i = 0; i < this.usersList.length; i++) {
            if (this.usersList[i].username == this.lastChange) {
              this.addToAssigned(this.usersList[i], i, event);
            }
          }
        }

      },
      error => {
        console.error(error);
      }
    );

    if (this.isEditTaskFlag) {
      this.getTaskDataSubscription$ = this.utility.getTaskData().subscribe(res => this.editRowData = res);
      this.taskId = this.editRowData.id;
      this.TasksGetByIdSubscribe(this.taskId);
      let parentTaskId = this.editRowData.parentTaskId;
      if (parentTaskId) {
        this.getTaskManipulatedDataSubscription$ = this.utility.getTaskManipulatedData().subscribe(tasks => {
          let parentTask = tasks.filter((x) => (x.id == parentTaskId));
          this.parentTaskDataEdit = parentTask[0];

          let parentStartDate = this.parentTaskDataEdit.startDate;
          let datetSplit = parentStartDate.split('/');
          let parentDateFormat = datetSplit[datetSplit.length - 1] + '/' + datetSplit[datetSplit.length - 2] + '/' + datetSplit[0];
          this.startDateMin = new Date(parentDateFormat);
          // console.log('parentTask Data filtered', this.parentTaskDataEdit, 'startDateMin', this.startDateMin)
        });
      }
      this.getAllFiles();
      // console.log('99977777777')
      this.editFormDataGetRow();
      this.subscribetaskDeatails(this.taskId);
      this.labelSubscription$ = this.apiSer.getLabelNames().subscribe(res => {

        let colors = ['', 'Pink', 'Red', 'Yellow', 'Green', 'Blue', 'Purple'];
        var mykeys = Object.keys(res)
        mykeys?.forEach((x, i) => {

          if (res[x] == null || res[x] == '') {
            res[x] = colors[i]
          }

        })

        this.labelNamesData = res;
      });
    }
  }
  // setProfileImage(groupMembers: Assignee[]) {
  //   const profile: Assignee = JSON.parse(sessionStorage.getItem("user-profile"));
  //   profile.photo = groupMembers.find(m => m.id === profile.id).photo || null;
  //   this.profile = profile;
  // }
  /* oninit end here */


  selectBucket(event) {
    this.selectedBucket = event.target.value;
    // console.log('changed bucket is:', this.selectedBucket);
  }

  selectProgress(event) {

    this.selectedProgess = event;

    if (this.selectedProgess == 'In Progress') {
      this.percentage = 50;
    } else if (this.selectedProgess == 'Not Started') {
      this.percentage = 0;
    } else if (this.selectedProgess == 'Completed') {
      this.percentage = 100;
    }
    // console.log('changed selectedProgess is:', this.selectedProgess);
  }

  /* For edit form */

  updateStartDate(event) {
    this.startDate = new Date(event);
    this.taskManagementDate.dueDate = moment(this.dueDate).format('MM-DD-YYYY');
    this.taskManagementDate.startDate = moment(this.startDate).format('MM-DD-YYYY');
    this.utility.setDateTaskManagement(this.taskManagementDate);

  }

  updateEndDate(event) {
    // console.log(event , 'end date change update')
    this.dueDate = new Date(event);
    this.taskManagementDate.startDate = moment(this.startDate).format('MM-DD-YYYY');
    this.taskManagementDate.dueDate = moment(this.dueDate).format('MM-DD-YYYY');
    this.utility.setDateTaskManagement(this.taskManagementDate)
  }

  /* for Edit form end here */
  addTask() {
    if (this.parentTaskNameFlag) {
      this.parentTaskId = this.childTaskId;
      // console.log('this.parentTaskId', this.parentTaskId)
    }
    else {
      this.parentTaskId = null;
    }

    const url = `${environment.apiUrl}Tasks`;

    let formsObj = {
      "GroupId": this.utility.groupId,
      "PlanId": this.utility.planId,
      "Title": this.addTaskForm.controls.taskName.value,
      "Bucket": this.addTaskForm.controls.bucketValue.value,
      "BucketId": this.addTaskForm.controls.bucketId.value,
      "DueDate": moment(new Date(this.addTaskForm.controls.dueDateVal.value)).format("MM/DD/YYYY"),
      "StartDate": moment(new Date(this.addTaskForm.controls.startDateVal.value)).format("MM/DD/YYYY"),
      "Assignees": this.assignListLocal,
      "Description": this.addTaskForm.controls.notesAddVal.value,
      "ParentTaskId": this.parentTaskId

    }

    // console.log(formsObj)
    this.addTaskSubscription$ = this.apiSer.addTask(url, formsObj).subscribe(
      resp => {
        this.utility.triggerReloadTasks(true);
        this.utility.resourcesUpdated(true);
        this.sendMessageToParent();

      },
      error => console.error('There was an error!', error)
    )
  }


  addBucketChange(event) {
    // console.log('add bucket change val', event.target.value);
    let bucketChange = this.bucketList.filter((bkt) => bkt.name == event.target.value);
    // console.log(bucketChange);
    this.addTaskForm.controls.bucketValue.setValue(bucketChange[0].name);
    this.addTaskForm.controls.bucketId.setValue(bucketChange[0].id);
  }

  updateTask() {
    if (this.isEstimateAdd) {
      this.TimeManagementComponent?.updateEstimates();
    }
    let formdateReferences = this.References.concat(this.linksList);
    var ref = formdateReferences?.map(x => {
      let obj = {
        "Url": (x.url) ? x.url : x.Url,
        "Alias": x.name
      }
      return obj;

    })
    // console.log(ref);

    // let References = this.References.concat(this.linksList);
    let References = ref
    const url = `${environment.apiUrl}Tasks`;
    let editFormObj = {
      "Id": this.taskId,
      "PlanId": this.utility.planId,
      // "GroupId": settings.groupId,
      "Description": this.notes,
      "Title": this.taskName,
      "Bucket": this.selectedBucket,
      "BucketId": this.bucketId,
      "StartDate": moment(new Date(this.startDate)).format("MM/DD/YYYY"),
      "DueDate": moment(new Date(this.dueDate)).format("MM/DD/YYYY"),
      "Status": this.selectedProgess,
      // "ETag": this.eTag,
      "PercentComplete": this.percentage,
      "Assignees": this.assignListLocal,
      "CheckLists": this.checkListData,
      "References": References,
      "estimations": this.estimations,
      "AppliedCategories": this.appliedCategories
    }

    this.updateTaskSubscription$ = this.apiSer.updateTask(url, editFormObj).subscribe(
      res => {
        if (this.isFileUpload) {
          this.isFileUpload = false;
        } else {
          // console.log('not file upload')
          this.closeAddEditModalEmit.emit(false);
          // this.utility.setTaskTableFlag(false);
          setTimeout(() => this.utility.triggerReloadTasks(true), 100);
          this.utility.resourcesUpdated(true);
          // setTimeout(() => this.utility.setTaskTableFlag(true), 100)
        }

      },
      error => { console.error('There was an error!', error) }
    )
  }

  fileUpload(event) {
    // console.log(event.target.files[0]);
    let fileSize = event.target.files[0]?.size;

    // for(let i=0; i<event.target.files.length; i++) {
    let fileName = event.target.files[0]?.name;
    let fileType = fileName.substring(fileName.lastIndexOf(".") + 1, fileName.length);
    fileType = fileType.toLocaleLowerCase();
    // console.log(fileType);
    let isValidFile = this.fileTypes.toLocaleLowerCase().indexOf(fileType);

    if (fileSize > 50000000) {
      // event.target.files = [];
      this.attachFiles = "";
      return this.dialog.open(FileErrorDailogComponent, {
        width: '570px',
        panelClass: 'confirm-dialog-container',
        data: {
          fileError: "File size exceeds maximum limit 50 MB."
        }
      });
    }
    if (isValidFile == -1) {
      // event.target.files = [];
      this.attachFiles = "";
      return this.dialog.open(FileErrorDailogComponent, {
        width: '570px',
        panelClass: 'confirm-dialog-container',
        data: {
          fileError: "your selected file is invalid format, please upload a valid file format"
        }
      });
    }


    if (event.target.files.length === 0)
      return;
    if (event.target.files.length > 0) {
      this.uploadFilesSubscription$ = this.apiSer.uploadFiles(event.target.files).subscribe(
        res => {
          // console.log('loaded file webUrl', res.webUrl);
          // alert('File Upload Successfull');
          this.fileUploadData = res;
          // console.log(this.fileUploadData);
          this.References.push({
            "url": this.fileUploadData.webUrl,
            "name": this.fileUploadData.name,
          })
          this.isFileUpload = true;
          this.getAllFiles();
          this.updateTask();
        });
    }
    $("#attachmentBtn").click();

  }



  linkUpload() {
    $("#myModal").modal("show");
    $(".attachment-modal").css("display", 'block');
    this.fileuploadFlag = false;
    this.linkUploadFlag = true;
    this.sharePointUploadFlag = false;


  }

  sharePointUpload() {
    this.sharepointSelected = true;
    // console.log("shrepoint")
    $("#myModal").modal("show");
    $(".attachment-modal").css("display", 'block');
    this.fileuploadFlag = false;
    this.linkUploadFlag = false;
    this.sharePointUploadFlag = true;
  }

  closeAttachModal() {
    $(".attachment-modal").css("display", 'none');

  }

  linkSave() {
    let linkObj = {
      "url": this.linkForm.controls.linkUrlValue.value,
      "name": this.linkForm.controls.linkUrlNameValue.value,
      //  "Type": 'link' 
    }
    // console.log(linkObj)
    this.linksList.push(linkObj)
    this.linkForm.reset();
    this.linkForm.controls.linkUrlValue.setValue("https://");
    $(".attachment-modal").css("display", 'none');
    $("#attachmentBtn").click();
    $("#attachModal").click();
  }

  createCheckListItem(e) {
    //// console.log(this.editTaskForm.controls)
    return {
      'title': e,
      'isChecked': false
    }
  }


  addCheckList() {
    if (this.addchecklistItem == '') {
      return false;
    }
    this.checkListData.push(this.createCheckListItem(this.addchecklistItem));
    this.addchecklistItem = '';
  }

  updateCheckList(e, check, index) {
    this.checkListData?.map((item, i) => {
      if (index == i) {
        item.title = e.target.value
      }
    })
  }

  checkListToggle(index) {
    this.checkListData?.map((item, i) => {
      if (index == i) {
        item.isChecked = !item.isChecked;
      }
    })
  }

  deleteCheckList(index) {
    this.checkListData?.forEach((obbj, i) => {
      if (index == i) {
        this.checkListData.splice(i, 1);
      }
    })
  }

  deleteAttachment(i) {
    this.References?.forEach((obj, index) => {
      if (index == i) {
        this.References.splice(index, 1);
      }
    })
  }

  deleteListItem(index: any) {
    this.References.forEach((ob, i) => {
      if (index == i) {
        this.linksList.splice(i, 1);
      }
    })
  }
  sendComment() {
    this.postComments();
    this.commentsValue = '';
    this.commentUsersFlag = false;
  }

  isCommentsValid() {
    if (this.commentsValue == '') {
      return true;
    } else {
      return false;
    }
  }

  splitUrl(file) {
    let url = ('' + file).split('.')[1];
    this.fileType = url;
    // console.log(url);
    return url
  }

  editFormDataGetRow() {
    this.tasksSubscription$ = this.utility.getTaskData().subscribe((task: any) => {
      this.taskId = task.id;
      this.editObjBucket = task.bucket;
      this.selectedBucket = task.bucket;
    });


  }

  subscribetaskDeatails(taskId) {
    this.taskDetailSubscription$ = this.apiSer.getTaskDetails(taskId).subscribe(
      resp => {
        this.taskDetails = resp;
        if (this.taskDetails.checkList?.length > 0) {
          this.checkListData = this.taskDetails.checkList;
        }

        if (this.taskDetails.references?.length > 0) {
          this.References = this.taskDetails.references;
        }

        this.notes = this.taskDetails.description
      },
      error => {
        console.error(error)
      });
  }

  TasksGetByIdSubscribe(taskId) {
    this.getTaskByIdSubscription$ = this.apiSer.getTaskById(taskId).subscribe(
      task => {
        this.loadAssigneesInfo(task as Task);
        this.task = task;
        this.bucketId = this.task.bucketId;
        // this.createdByName = this.TasksGetByIdResp.createdByDisplayName;
        this.createdDateTime = this.task.createdDateTime;
        this.taskTitle = this.task.title;
        this.selectedProgess = this.task.status;
        this.dueDate = this.task.dueDateTime;
        this.startDate = this.task.startDateTime;
        this.taskId = this.task.id;
        this.taskName = this.task.title;
        let asignees = this.task.assignees;
        this.percentage = this.task.percentComplete
        this.rangeFlag = false;
        this.labelsFlag = false;
        this.appliedCategories = this.task.appliedCategories;
        setTimeout(() => { this.rangeFlag = true }, 100);
        setTimeout(() => { this.labelsFlag = true }, 100);
        asignees?.map((x, i) => this.addToAssigned(x, i, event));

        this.conversationThreadId = this.task.conversationThreadId
        if (this.conversationThreadId != null) {
          this.commentsSubscribe();
        }
        this.taskManagementDate.dueDate = moment(this.dueDate).format('MM-DD-YYYY');
        this.taskManagementDate.startDate = moment(this.startDate).format('MM-DD-YYYY');
        this.utility.setDateTaskManagement(this.taskManagementDate);
        this.timeManagementFlag = true;

        this.assignListLocal = this.task.assignees;
        this.tempAssignListLocal = this.task.assignees;
        this.utility.setAssigneeData(this.tempAssignListLocal);
      },
      error => {
        console.error(error)
      });
  }
  loadAssigneesInfo(task: Task) {
    this.groupMemberSubscription$ = this.apiSer.getAllGroupMembers(this.utility.groupId).subscribe(members => {
      task.assignees.forEach((assignee, i) => {
        const member: Assignee = members.find(member => member.id === assignee.id);
        task.assignees[i] = member;
      })
    })
  }

  commentsSubscribe() {

    this.commentSubscrition$ = this.apiSer.getTaskComments(this.conversationThreadId, this.taskId).subscribe(
      comments => {
        this.groupMemberSubscription$ = this.apiSer.getAllGroupMembers(this.utility.groupId).subscribe(members => {
          comments?.forEach(comment => {
            let utcTime = comment.createdDateTime;
            var local_date = moment.utc(utcTime).local().format('YYYY-MM-DD HH:mm:ss');
            comment.localDate = local_date;
            comment.formatDate = this.getLocalDate(local_date);
            const member = members.find(m => m.email === comment.emailAddress.address);
            comment.photo = member ? member.photo : null;
            comment.displayName = member.displayName;
          })
          this.comments = comments;
          // if (this.comments.length > 0) {
          //   this.commentsSecFlag = true;
          // }
        })

      },
      eror => {
        console.error(eror)
      });
  }

  postComments() {
    let comObj = {
      "GroupId": this.utility.groupId,
      "TaskId": this.taskId,
      "ConversationId": this.conversationThreadId,
      "Content": this.commentsValue
    }


    // preparing obj with local time and date for adding coment client side
    let localDate = new Date();
    let monthName = moment(localDate).format("MMM");
    let day = moment(localDate).format("D");
    let hours = moment(localDate).format("h");
    let minutes = moment(localDate).format("mm");
    let daylightVal = moment(localDate).format("A");
    let dateFormat = monthName + " " + day + " " + hours + ":" + minutes + "" + daylightVal;
    let cObj = {
      comment: this.commentsValue,
      id: this.comments[0]?.id,
      name: this.comments[0]?.name,
      formatDate: dateFormat,
      photo:null,
      displayName:"" 
    }

    // console.log(comObj);
    this.taskSubmitSubscrition$ = this.apiSer.postTaskComments(comObj).subscribe(
      res => {
        const userProfile = JSON.parse(sessionStorage.getItem("user-profile"))
        cObj.photo = userProfile.photo;
        cObj.displayName = userProfile.displayName;
        this.conversationThreadId = res;
        this.comments.unshift(cObj);
        // this.commentsSecFlag = false;
        // setTimeout(() => {
        //   this.commentsSecFlag = true;
        // }, 100)
      },
      er => {
        console.error('some error', er);
      }
    )
  }

  lastModified(item) {
    let dtFr = new Date(item.lastModifiedDateTime).toString().split(' ')
    return (dtFr[1] + ' ' + dtFr[2] + ', ' + dtFr[3])
    // return moment(new Date(item.lastModifiedDateTime)).format("DD/MM/YYYY"); 
  }

  sharepointSelectRow(row, i) {
    this.selectedAttachment = row;
    this.rowIndex = i;
    this.sharepointSelected = false;
    // console.log(event , i)
  }

  sharePointSave() {
    let row = this.selectedAttachment;
    // console.log(row);
    let rowUrl = row.webUrl + '' + '?web=1'
    // console.log(rowUrl);
    let linkObj = {
      "url": rowUrl,
      "name": row.name,
      //  "Type": 'link' 
    }
    // console.log(linkObj)
    if (this.References.length > 0) {
      let commonData = this.References.filter((x, i) => x.name == row.name)
      // console.log(commonData);
      if (commonData.length == 0 || commonData.length == undefined) {
        this.References.push(linkObj);
      } else {
        return false;
      }
    } else {
      this.References.push(linkObj);
    }

    $("#attachModal").click();
    $("#attachmentBtn").click();


  }

  addLinkFormValid() {
    if (this.linkUrlValue == '') {
      return true;
    } else {
      return false;
    }
  }

  getAllFiles() {
    this.attachmentSubscription$ = this.apiSer.getAttachments().subscribe(
      res => {
        this.attachmentsList = res;
        this.dataSourceAttachments = new MatTableDataSource(this.attachmentsList);
        if (this.isFileUpload) {
        }

      },
      erorr => {
        console.error('error', erorr)
      }
    )
  }

  commentsAssignee(event) {
    let cString = event.target.value + '';

    var splitStringArry = cString.split(' ');
    this.selectionIndex = event.target.selectionStart;
    var $$nomatches = event.target.value.slice(event.target.selectionStart - 2, event.target.selectionStart);
    let extracted_string = event.target.value.slice(event.target.value.indexOf('@'), event.target.selectionStart);
    if ((splitStringArry[splitStringArry.length - 1].indexOf('@') == -1) || (splitStringArry[splitStringArry.length - 2] == '' && splitStringArry[splitStringArry.length - 1] == '') || splitStringArry[splitStringArry.length - 1] == '') {
      this.commentUsersFlag = false;
    } else if (($$nomatches == ' @' || extracted_string.indexOf('@') != -1) && ($$nomatches != "@@")) {
      let strSPlit = extracted_string.split('@');
      let searchWord = strSPlit[strSPlit.length - 1];
      this.commenstSearchAsgnee = searchWord;
      this.commentUsersFlag = true;
      this.noListMatch = false;
      this.utility.setCommentsSearch(this.commenstSearchAsgnee);
    }
    if ($$nomatches == "@@") {
      this.noListMatch = true;
    }
    if ($$nomatches == "  " || $$nomatches == "@ ") {
      this.noListMatch = false;
      this.commentUsersFlag = false;
    }

    setTimeout(() => {
      var posH = this.eRef.nativeElement.querySelector("#userListAssign")?.offsetHeight;
      if (posH) {
        this.eRef.nativeElement.querySelector("#userListAssign").style.top = -posH + 'px';
      }
    }, 100)

  }

  updatePercentage(percentage) {
    this.percentage = percentage;
    if (this.percentage > 0 && this.percentage < 100) {
      this.selectedProgess = 'In Progress';
    } else if (this.percentage == 0) {
      this.selectedProgess = 'Not Started';
    } else if (this.percentage == 100) {
      this.selectedProgess = 'Completed';
    }
  }

  updateLabel(event) {
    this.appliedCategories = event;
  }

  ngOnDestroy() {
    this.utility.unsubscribe(this.bucketSubscription$)
    this.utility.unsubscribe(this.groupMemberSubscription$)
    this.utility.unsubscribe(this.labelSubscription$)
    this.utility.unsubscribe(this.addTaskSubscription$)
    this.utility.unsubscribe(this.updateTaskSubscription$)
    this.utility.unsubscribe(this.uploadFilesSubscription$)
    this.utility.unsubscribe(this.tasksSubscription$)
    this.utility.unsubscribe(this.taskDetailSubscription$)
    this.utility.unsubscribe(this.commentSubscrition$)
    this.utility.unsubscribe(this.taskSubmitSubscrition$)
    this.utility.unsubscribe(this.attachmentSubscription$);
    this.utility.unsubscribe(this.updateEstimateSubscription$);
    this.utility.unsubscribe(this.addEstimateSubscription$);
    this.utility.unsubscribe(this.getparentTaskNameSubscription$);
    this.utility.unsubscribe(this.getTaskByIdSubscription$);
    this.utility.unsubscribe(this.getTaskDataSubscription$);
    this.utility.unsubscribe(this.getTaskManipulatedDataSubscription$);
    this.parentTaskData = '';
  }

  getEstimations(obj) {
    // console.log('getEstimations', obj)
    this.isEstimateAdd = true;
    this.estimations = obj;
    this.estimations.TaskId = this.taskId;
    this.estimations.PlanId = this.utility.planId;
    if (this.task.estimations == null) {
      this.addEstimateSubscription$ = this.apiSer.addEstimate(this.estimations).subscribe(res => {
        this.utility.resourcesUpdated(true)
      },
        err => {
          console.error('some error', err);
        })
    } else {
      this.updateEstimateSubscription$ = this.apiSer.updateEstimate(this.estimations).subscribe(res => {
        this.utility.resourcesUpdated(true)
      },
        erorrr => {
          console.error('some error', erorrr);
        })
    }
  }


  getLocalDate(localDate) {
    let monthName = moment(localDate).format("MMM");
    let day = moment(localDate).format("D");
    let hours = moment(localDate).format("h");
    let minutes = moment(localDate).format("mm");
    let daylightVal = moment(localDate).format("A");
    return (monthName + " " + day + " " + hours + ":" + minutes + "" + daylightVal);
  }

  createdDate(createdDateTime) {
    let utcTime = createdDateTime;
    let local_date = moment.utc(utcTime).local().format('YYYY-MM-DD HH:mm:ss');
    let monthName = moment(local_date).format("MMM");
    let day = moment(local_date).format("D");
    let hours = moment(local_date).format("h");
    let minutes = moment(local_date).format("mm");
    let daylightVal = moment(local_date).format("A");
    return (monthName + " " + day + " " + hours + ":" + minutes + "" + daylightVal);
  }
}
