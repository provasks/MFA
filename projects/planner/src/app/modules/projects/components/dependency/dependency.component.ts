import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { ApiService } from '../../../../api.service';
import { Dependency } from '../../../../models/dependency.model';
import { UtilityService } from '../../../../shared/services/utility.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-dependency',
  templateUrl: './dependency.component.html',
  styleUrls: ['./dependency.component.scss'],
})
export class DependencyComponent implements OnInit {
  subscription$: Subscription;
  position: any;
  arrowPosition: any;
  dependency: Dependency;
  deleteDependancySubscription$: Subscription;
  deleteFlag: boolean = false;
  // @Input() dependency: any;
  @Output() closeDependencyModalEmitter = new EventEmitter<any>();
  constructor(
    private utility: UtilityService,
    private apiService: ApiService
  ) {}

  ngOnInit(): void {
    this.subscription$ = this.utility.getLineClicked().subscribe((data) => {
      if (!data.position) return;
      this.position = data.position;
      this.arrowPosition = data.arrow;
      this.dependency = data.dependency;
    });
  }

  deleteDependancy(id, event) {
    event.stopPropagation();
    this.deleteDependancySubscription$ = this.apiService
      .deleteDependency(id)
      .subscribe(
        (resp) => {
          this.deleteFlag = true;
          this.closeDependencyModalEmitter.emit('deleted');
        },
        (error) => {
          console.error('some error', error);
        }
      );
  }

  ngOnDestroy() {
    this.utility.unsubscribe(this.subscription$);
    this.utility.unsubscribe(this.deleteDependancySubscription$);
    this.utility.setdependencyModalFlag(this.deleteFlag);
  }
}
