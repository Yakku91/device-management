import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-confirm-dialog-box',
  templateUrl: './confirm-dialog-box.component.html',
  styleUrls: ['./confirm-dialog-box.component.scss']
})
export class ConfirmDialogBoxComponent {

  title: string;
  message: string;

  constructor(@Inject(MAT_DIALOG_DATA) private data: any,
    public dialogRef: MatDialogRef<ConfirmDialogBoxComponent>) {
  }
  ngOnInit() {
    this.title = this.data.title
    this.message = this.data.message
  }
  onConfirm(): void {
    this.dialogRef.close(true);
  }
  closeDialog(){
     this.dialogRef.close(false);
  }
}
