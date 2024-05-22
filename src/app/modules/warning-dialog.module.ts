import { NgModule } from "@angular/core";
import { MatDialogModule } from "@angular/material/dialog";
import { MatButtonModule } from "@angular/material/button";
import { CommonModule } from '@angular/common';
import {WarningDialogComponent} from "../components/warning-dialog/warning-dialog.component";

@NgModule({
  declarations: [
    WarningDialogComponent
  ],
  imports: [
    MatDialogModule,
    CommonModule,
    MatButtonModule,
  ],
  exports: [
    WarningDialogComponent
  ],
})
export class WarningDialogModule {}
