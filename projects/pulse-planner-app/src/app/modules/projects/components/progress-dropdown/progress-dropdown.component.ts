import { Component, OnInit, Input, EventEmitter, Output, HostListener } from '@angular/core';

@Component({
  selector: 'app-progress-dropdown',
  templateUrl: './progress-dropdown.component.html',
  styleUrls: ['./progress-dropdown.component.scss']
})
export class ProgressDropdownComponent implements OnInit {
  isOpenMenu = false;
  progressList = ['Not Started', 'In Progress', 'Completed'];

  @HostListener('document:click', ['$event'])
  clickout(event) {
    // console.log(event)
    if ((event.target.parentElement.classList.contains("status-dropdown"))
    || (event.target.parentElement.parentElement.classList.contains("status-dropdown"))
    ) {
      this.isOpenMenu = true;
    } else {
      this.isOpenMenu = false;
    }
  }

 @Input() selectedStatus: any;
  @Output() statusChangeEmit = new EventEmitter<any>();

  constructor() { }

  ngOnInit(): void {
  }

  openLabelMenu() {
    this.isOpenMenu = !this.isOpenMenu;
  }

  changeStatus(event) {
    // console.log(event);
    this.isOpenMenu = false;
    this.selectedStatus = event.target.innerText;
    this.statusChangeEmit.emit(this.selectedStatus);
  }

}
