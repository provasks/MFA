import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {
  @Input() userList: [];
  @Input() limit: number = 0;
  
  constructor() { }

  ngOnInit(): void {
    this.limit = this.limit ? this.limit : this.userList.length;
  }

}
