import { Component, Inject } from "@angular/core";
import { MAT_DIALOG_DATA } from "@angular/material/dialog";

@Component({
  selector: 'app-warning-dialog',
  template: `
    <div mat-dialog-content>
      <p>{{ data }}</p>
    </div>
    <div mat-dialog-actions>
      <button mat-button [mat-dialog-close]="true">Ok</button>
    </div>
  `
})
export class WarningDialogComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {}
}
