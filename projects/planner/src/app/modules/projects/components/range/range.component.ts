import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-range',
  templateUrl: './range.component.html',
  styleUrls: ['./range.component.scss']
})
export class RangeComponent implements OnInit {

  @Input() percentage: any;
  @Output() updatePercentageEmit = new EventEmitter<any>();
 
  updatedPercentageValue: any;
  legends:any = [0,20,40,60,80,100] 
  constructor() { }

  ngOnInit(): void {
    // console.log('this.percentage', this.percentage)

    
  }

  updatePercentage(event) {
    // console.log('test update call', event, event.target.innerText);
    this.updatedPercentageValue = event.target.innerText;
    this.updatePercentageEmit.emit(this.updatedPercentageValue);
  }

}
