import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of, Subscription } from 'rxjs';
import { map, catchError } from "rxjs/operators";
import { Task } from './models/task.model';
import { Assignee } from './models/assignee.model';
import { UtilityService } from './shared/services/utility.service';
import { Resource } from './models/resource.model';
import { Group } from './models/group.model';
import { ApiHelperService } from './shared/services/api-helper.service';
import { Bucket } from './models/bucket.model';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  groupMemberSubscription: Subscription;

  getMyGroups(startIndex: number, size: number): Observable<Group[]> {
    const key = "my-groups"
    let myGroups = JSON.parse(sessionStorage.getItem(key)) || [];
    if (myGroups && myGroups.length && startIndex == 1)
      return of(myGroups as Group[]);
    else {
      const url = `${environment.apiUrl}Group/MyGroups?startCount=${startIndex}&size=${size}`;
      return this.http.get(url, {
        headers: new HttpHeaders().set('Accept', 'application/json'),
      })
        .pipe(map(groups => {
          myGroups = myGroups.concat(groups)
          sessionStorage.setItem(key, JSON.stringify(myGroups));
          return groups as Group[];
        }));
    }
  }

  getGroupLogoById(groupId) {
    const key = "my-groups"
    let myGroups = JSON.parse(sessionStorage.getItem(key)) as Group[];
    const group = myGroups.find(group => group.id === groupId)
    const anyPhotoExists = myGroups.some(group => group.photo !== null);
    if (group.photo) {
      return of(group.photo);
    }
    else if (anyPhotoExists) {
      return of(group.photo);
    }
    else {
      const url = `${environment.apiUrl}Group/GroupLogoById?groupId=${groupId}`;
      return this.http.get(url, {
        headers: new HttpHeaders().set('Accept', 'application/json'),
      })
        .pipe(map(resp => {
          let myGroups = JSON.parse(sessionStorage.getItem(key)) as Group[];
          myGroups.forEach(group => {
            if (group.id === resp["groupId"])
              group.photo = resp["photo"] as string;
          })
          sessionStorage.setItem(key, JSON.stringify(myGroups));
          return resp["photo"];
        }));
    }
  }


  getAllGroupMembers(groupId: string): Observable<Assignee[]> {
    const key = 'group-members';
    const groupMembers = JSON.parse(sessionStorage.getItem(key)) || {};
    if (groupMembers[groupId])
      return of(groupMembers[groupId]);
    else {
      const url = `${environment.apiUrl}Group/MyGroupMember?groupId=${groupId}`;
      return this.http.get(url, {
        headers: new HttpHeaders().set('Accept', 'application/json'),
      })
        .pipe(map(response => {
          let members: Assignee[] = this.getMemberList(response as Assignee[]);
          groupMembers[groupId] = members;
          sessionStorage.setItem(key, JSON.stringify(groupMembers));
          return members;
        }));
    }
  }

  private getMemberList(res: Assignee[]): Assignee[] {
    return res.map((member, i: number) =>
      ({
        id: member["id"],
        displayName: member["displayName"] || "Former member",
        email: member["mail"] || null,
        photo: member["photo"] ? member["photo"] : null
      }) as Assignee
    );
  }

  getGroupMembersPhotoById(groupId, memberId) {
    const key = "group-members"
    let members = JSON.parse(sessionStorage.getItem(key))[groupId] as Assignee[];
    if (members) {
      const member = members.find(m => m.id = memberId)
      if (member.photo) {
        return of(member.photo);
      }
      else {
        const url = `${environment.apiUrl}Group/UserPhotoById?userId=${memberId}`;
        return this.http.get(url, {
          headers: new HttpHeaders().set('Accept', 'application/json'),
        })
          .pipe(map(resp => {
            // console.log(groupId);
            const allGroupMembers = JSON.parse(sessionStorage.getItem(key))
            let groupMembers = allGroupMembers[groupId] as Assignee[];
            groupMembers.forEach(member => {
              if (member.id === resp["userId"])
                member.photo = resp["photo"] as string;
            })
            // member.photo = photo as string;
            sessionStorage.setItem(key, JSON.stringify(allGroupMembers));
            return resp["photo"];
          }));
      }
    }

  }


  // getAllTasks(): Observable<Task[]> {
  //   const dataUrl = '/assets/data/live.json';
  //   // const dataUrl = '/assets/data/from-center.json';
  //   // const dataUrl = '/assets/data/to-center.json';
  //   return this.http.get(dataUrl)
  //     .pipe(map(response => response as Task[]));;
  // }



  getAllTasks(): Observable<string | Task[]> {
    const url = `${environment.apiUrl}Tasks/GetAll?groupId=${this.utility.groupId}&planId=${this.utility.planId}`;
    return this.http.get(url).pipe(
      map(response => response as Task[]));
  }


  getResources(planId: string): Observable<Resource[]> {
    const key = "all-resources";
    const allResources = JSON.parse(sessionStorage.getItem(key)) || {};
    if (allResources[planId]) {
      return of(allResources[planId] as Resource[]);
    }
    else {
      const url = `${environment.apiUrl}Tasks/GetResource?planId=${planId}`;
      return this.http.get(url, {
        headers: new HttpHeaders().set('Accept', 'application/json'),
      })
        .pipe(map(resources => {
          allResources[planId] = resources;
          sessionStorage.setItem(key, JSON.stringify(allResources));
          return resources as Resource[];
        }));
    }
  }

  getBuckets(planId: string): Observable<Bucket[]> {
    const key = 'all-buckets';
    const allBuckets = JSON.parse(sessionStorage.getItem(key)) || {};
    if (allBuckets[planId])
      return of(allBuckets[planId] as Bucket[]);
    else {
      const url = `${environment.apiUrl}Buckets?planId=${planId}`;
      return this.http.get(url, {
        headers: new HttpHeaders().set('Accept', 'application/json'),
      })
        .pipe(map(buckets => {
          allBuckets[planId] = buckets;
          sessionStorage.setItem(key, JSON.stringify(allBuckets));
          return buckets as Bucket[];
        }));
    }
  }


  addTask(url, formsObj) {
    return this.http.post<any>(url, formsObj, {
      headers: new HttpHeaders().set('Accept', 'application/json'),
    })
  }

  addDependencyTask(url, params) {
    return this.http.post<any>(url, params, {
      headers: new HttpHeaders().set('Accept', 'application/json'),
    })
  }

  addEstimate(params): Observable<any> {
    const url = `${environment.apiUrl}Tasks/AddEstimate`;
    return this.http.post<any>(url, params, {
      headers: new HttpHeaders().set('Accept', 'application/json')
    })
  }

  updateEstimate(params): Observable<any> {
    const url = `${environment.apiUrl}Tasks/UpdateEstimate`;
    return this.http.put<any>(url, params, {
      headers: new HttpHeaders().set('Accept', 'application/json')
    })
  }

  getDependencyTypes(): Observable<any> {
    const url = `${environment.apiUrl}DependencyTypes`;
    return this.http.get(url, {
      headers: new HttpHeaders().set('Accept', 'application/json'),
    })
      .pipe(map(response => response));
  }

  deleteDependency(depId) {
    const url = `${environment.apiUrl}Tasks/DeleteDependancy?id=${depId}`;
    return this.http.delete(url, {
      headers: new HttpHeaders().set('Accept', 'application/json'),
    })
      .pipe(map(response => response));
  }

  getDependencies(parentTaskId) {
    const url = `${environment.apiUrl}Tasks/GetDependencies?planId=${this.utility.planId}&parentTaskId=${parentTaskId}`;
    return this.http.get(url, {
      headers: new HttpHeaders().set('Accept', 'application/json'),
    })
      .pipe(map(response => response));
  }


  updateTask(url, editFormObj): Observable<any> {
    return this.http.put<any>(url, editFormObj, {
      headers: new HttpHeaders().set('Accept', 'application/json'),
    })
  }

  getTaskDetails(taskId) {
    const url = `${environment.apiUrl}Tasks/Details?taskId=${taskId}`;
    return this.http.get(url, {
      headers: new HttpHeaders().set('Accept', 'application/json'),
    })
      .pipe(map(response => response));
  }

  getTaskById(taskId) {
    const url = `${environment.apiUrl}Tasks/GetById?taskId=${taskId}`;
    return this.http.get(url, {
      headers: new HttpHeaders().set('Accept', 'application/json'),
    })
      .pipe(map(response => {
        const members = JSON.parse(sessionStorage.getItem("group-members"));
        const member = members[this.utility.groupId].find(m => m.id === response["createdBy"]["user"]["id"]);
        response["createdBy"] = member;
        return response;
      }));
  }

  getTaskComments(conversationThreadId, taskId): Observable<any> {
    const url = `${environment.apiUrl}Tasks/GetTaskComments?groupId=${this.utility.groupId}&conversationId=${conversationThreadId}`;
    return this.http.get(url, {
      headers: new HttpHeaders().set('Accept', 'application/json')
    })
      .pipe(map(response => response));
  }

  postTaskComments(commentsObj): Observable<any> {
    const url = `${environment.apiUrl}Tasks/AddTaskComments`;
    return this.http.post<any>(url, commentsObj, {
      headers: new HttpHeaders().set('Accept', 'application/json')
    });
  }

  getAttachments() {
    const url = `${environment.apiUrl}Files/GetAll?groupId=${this.utility.groupId}`;
    return this.http.get(url, {
      headers: new HttpHeaders().set('Accept', 'application/json'),
    })
      .pipe(map(response => response));
  }

  uploadFiles(fileList: FileList) {
    const url = `${environment.apiUrl}Files/Upload`;
    if (fileList === undefined || fileList === null || fileList.length === 0) {
      return;
    }
    const formData = new FormData();
    Array.from(fileList).forEach((file: File) => {
      formData.append('file', file);
    });
    formData.append('groupId', this.utility.groupId);
    return this.http.post<any>(url, formData, {
      headers: new HttpHeaders().set('Accept', 'application/json'),
    });

  }

  deleteTask(taskId) {
    const url = `${environment.apiUrl}Tasks/Delete?taskId=${taskId}`;
    return this.http.delete(url, {
      headers: new HttpHeaders().set('Accept', 'application/json'),
    })
      .pipe(map(response => response));
  }

  getProjectList(groupId: string, startIndex: number, size: number) {
    const url = `${environment.apiUrl}Plan/PlansAssociatedByGroup?groupId=${groupId}&startCount=${startIndex}&size=${size}`;
    return this.http.get(url, {
      headers: new HttpHeaders().set('Accept', 'application/json'),
    })
      .pipe(map(response => response));
  }

  constructor(private http: HttpClient, private utility: UtilityService, private apiHelper: ApiHelperService) { }


  getLabelNames() {
    const url = `${environment.apiUrl}Plan/GetPlanCategoryDescriptions?planId=${this.utility.planId}`;
    return this.http.get(url, {
      headers: new HttpHeaders().set('Accept', 'application/json'),
    })
      .pipe(map(response => response));
  }

  updateLabelNames(CategoryDescriptions): Observable<any> {
    const url = `${environment.apiUrl}Plan/AddOrUpdateCategoryDescription`;
    return this.http.post<any>(url, CategoryDescriptions, {
      headers: new HttpHeaders().set('Accept', 'application/json')
    });
  }

  getMyProfile() {
    const url = `${environment.apiUrl}Users/MyProfile`;
    return this.http.get(url, {
      headers: new HttpHeaders().set('Accept', 'application/json'),
    })
      .pipe(map(response => response));
  }

  addProject(projectInfo: any): Observable<boolean> {
    const url = `${environment.apiUrl}Plan/CreatePlan`;
    return this.http.post<any>(url, projectInfo, {
      headers: new HttpHeaders().set('Accept', 'application/json'),
    })
  }

  ngOnDestroy() {
    this.utility.unsubscribe(this.groupMemberSubscription);
  }

}