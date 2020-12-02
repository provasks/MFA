import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import * as moment from 'moment';

export interface DialogData {
  bucketEnabled: any;
  startDateEnabled: any;
  endDateEnabled: any;
  assgineeEnabled: any;
  labelEnabled: any;
  startDateSelected: any;
  endDateSelected: any;
}

@Component({
  selector: 'app-export-dialog',
  templateUrl: './export-dialog.component.html',
  styleUrls: ['./export-dialog.component.scss'],

})
export class ExportDialogComponent implements OnInit {

  bucketEnabled: any;
  startDateEnabled: any;
  endDateEnabled: any;
  assgineeEnabled: any;
  labelEnabled: any;
  startDateSelected: any;
  endDateSelected: any;

  constructor(@Inject(MAT_DIALOG_DATA) public data: DialogData,
    public dialogRef: MatDialogRef<ExportDialogComponent>) {

  }

  ngOnInit(): void {
    this.data.bucketEnabled = true;
    this.data.startDateEnabled = true;
    this.data.endDateEnabled = true;
    this.data.assgineeEnabled = true;
    this.data.labelEnabled = true;

  }

  closeDialog() {
    this.dialogRef.close();
  }

  enableBucket(event) {
    this.data.bucketEnabled = event.checked;
  }
  enableStartDate(event) {
    this.data.startDateEnabled = event.checked;
  }
  enableEndDate(event) {
    this.data.endDateEnabled = event.checked
  }
  enableAssignee(event) {
    this.data.assgineeEnabled = event.checked;
  }

  enableLabel(event) {
    this.data.labelEnabled = event.checked;
  }
  selectedStartDate(event) {
    this.data.startDateSelected = moment(new Date(event.target.value)).format("MM/DD/YYYY")
  }
  selectedEndDate(event) {
    this.data.endDateSelected = moment(new Date(event.target.value)).format("MM/DD/YYYY")
  }

}
