import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { ActionDialogData } from './action-dialog.type';

@Component({
  selector: 'app-action-dialog',
  standalone: true,
  imports: [CommonModule, MatDialogModule, MatButtonModule],
  templateUrl: './action-dialog.component.html',
})
export class ActionDialogComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: ActionDialogData) {}
}
