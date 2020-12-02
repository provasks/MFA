import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatCardModule } from '@angular/material/card';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav'
import { MatTableModule } from '@angular/material/table'
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatListModule } from '@angular/material/list';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatTabsModule } from '@angular/material/tabs';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule, MatRippleModule } from '@angular/material/core'
import { MatInputModule } from '@angular/material/input';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDialogModule } from '@angular/material/dialog';
import { MatMenuModule } from '@angular/material/menu';
import { MatSliderModule } from '@angular/material/slider';
import { MatSnackBarModule } from '@angular/material/snack-bar';


const MaterialComponents = [
  MatButtonModule,
  MatIconModule,
  MatDividerModule,
  MatCardModule,
  MatProgressBarModule,
  MatGridListModule,
  MatToolbarModule,
  MatSidenavModule,
  MatTableModule,
  MatFormFieldModule,
  MatListModule,
  MatTabsModule,
  MatSelectModule,
  FormsModule,
  ReactiveFormsModule,
  MatDatepickerModule,
  MatNativeDateModule,
  MatRippleModule,
  MatInputModule,
  MatExpansionModule,
  MatMenuModule,
  MatCheckboxModule,
  MatDialogModule,
  MatSliderModule,
  MatSnackBarModule
  // MatCardActions
]

@NgModule({
  imports: [MaterialComponents
  ],
  exports: [MaterialComponents]
})
export class MaterialModule { }
