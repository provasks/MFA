import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ApiService } from '../../../../api.service';
import { UtilityService } from '../../../../shared/services/utility.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-add-project',
  templateUrl: './add-project.component.html',
  styleUrls: ['./add-project.component.scss']
})
export class AddProjectComponent implements OnInit {
  @Output() onProjectAdd = new EventEmitter<boolean>();
  projectAddSubscription$: Subscription;
  constructor(private apiService: ApiService, private utility: UtilityService) { }
  project: { name: string, description: string } = { name: "", description: "" };
  frmProject: any;
  ngOnInit(): void {
  }

  addProject() {
    const projectInfo = { GroupId: this.utility.groupId, Title: this.project.name }
    this.projectAddSubscription$ = this.apiService.addProject(projectInfo).subscribe(resp => {
      this.onProjectAdd.emit(true);
    }, error => {
      this.onProjectAdd.emit(false);
    })
  }

  ngOnDestroy() {
    this.utility.unsubscribe(this.projectAddSubscription$);
  }

}
