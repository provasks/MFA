import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-file-error-dailog',
  templateUrl: './file-error-dailog.component.html',
  styleUrls: ['./file-error-dailog.component.scss']
})
export class FileErrorDailogComponent implements OnInit {
  errorValue:any = "";
  constructor(@Inject(MAT_DIALOG_DATA) public data,
  public dialogRef: MatDialogRef<FileErrorDailogComponent>) { }

  ngOnInit(): void {
    this.errorValue = this.data.fileError;
  }

  closeDialog() {
    this.dialogRef.close(false);
  }
}
