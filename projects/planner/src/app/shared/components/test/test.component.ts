import { Component, OnInit } from '@angular/core';

// import panzoom from 'panzoom';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.scss']
})
export class TestComponent implements OnInit {

  members = [
    {
       "id":"e418cfba-5896-4049-9faf-fe70d45d19df",
       "displayName":"Sajith Chowdary (Trianz)",
       "email":"Sajith.Chowdary@trianz.com",
       "photo":"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"
    },
    {
       "id":"3b5e6c70-b1a0-43ae-b956-27d07f899fba",
       "displayName":"Kalpana M (Trianz)",
       "email":"Kalpana.M@trianz.com",
       "photo":"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"
    }
 ]

  constructor() { }

  ngOnInit(): void {

  }

  ngAfterViewInit() {
 
  }

  print() {

  }
}
