import { Component, OnInit, Input, EventEmitter, Output, ElementRef } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { UtilityService } from '../../../../shared/services/utility.service';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss']
})
export class UsersListComponent implements OnInit {

  @Input() usersList: any[];
  @Output() commentsEmit = new EventEmitter<string>();
  @Input() cmntAssignee = '';
  tempUsersList: any[];
  @Input() noAssigneeFlag: boolean;
  commentsSubscription$: Subscription;
  // @Input() searchValue = '';

  constructor(public domSanitizer: DomSanitizer,
    public utility: UtilityService,
    private elemRef: ElementRef) {
    this.tempUsersList = this.usersList;
  }


  ngOnInit(): void {
    this.tempUsersList = this.usersList;
    // console.log("users-list", this.usersList)
    this.commentsSubscription$ = this.utility.getCommentsSearch().subscribe(res => {
      this.cmntAssignee = res;
      if (!this.noAssigneeFlag) {
        this.searchAssignee();
        // this.elemRef.nativeElement.querySelector("#userListAssign").style.top = -posH + 'px';
      }
    });
  }

  addComments(event: any) {
    this.commentsEmit.emit(event.displayName);
  }

  searchAssignee() {
 
    this.usersList = this.tempUsersList.filter(val => 
      val.displayName.toLowerCase().indexOf(this.cmntAssignee) != -1);
  }
  ngOnDestroy(){
    this.utility.unsubscribe(this.commentsSubscription$)
  }

}
