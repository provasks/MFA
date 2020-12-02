import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
//import { MatConfirmDialogComponent } from './mat-confirm-dialog/mat-confirm-dialog.component';
import { ConfirmDialogComponent } from '../../../../shared/components/confirm-dialog/confirm-dialog.component';
import { ExportDialogComponent } from '../../../../shared/components/export-dialog/export-dialog.component';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class DialogService {

  bucketEnabled: any;
  startDateEnabled: any;
  endDateEnabled: any;
  assgineeEnabled: any;
  labelEnabled: any;
  startDateSelected: any;
  endDateSelected: any;

  constructor(private dialog: MatDialog) { }

  openConfirmDialog(data: any) {
    return this.dialog.open(ConfirmDialogComponent, {
      width: '570px',
      panelClass: 'confirm-dialog-container',
      disableClose: true,
      data: {
        title: data.title,
        message: data.message
      }
      //  position: { top: "10px" }
    });
  }
  openExportDialog(): Observable<any> {


    const dialogRef = this.dialog.open(ExportDialogComponent, {
      width: '570px',
      panelClass: 'export-dialog-container',
      disableClose: true,
      //  position: { top: "10px" }
      data: {
        bucketEnabled: this.bucketEnabled,
        startDateEnabled: this.startDateEnabled,
        endDateEnabled: this.endDateEnabled,
        assgineeEnabled: this.assgineeEnabled,
        labelEnabled: this.labelEnabled,
        startDateSelected: this.startDateSelected,
        endDateSelected: this.endDateSelected
      }

    });
    return dialogRef.afterClosed();
  }
}
