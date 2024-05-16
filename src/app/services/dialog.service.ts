import { Injectable } from '@angular/core';
import { MatDialog, } from '@angular/material/dialog';
import { ConfirmDialogBoxComponent } from '../shared/dialogs/confirm-dialog-box/confirm-dialog-box.component';

@Injectable({
  providedIn: 'root'
})
export class DialogService {

  constructor(public dialog: MatDialog) { }

  showConfirmDialog(messageParameter: string, titleParameter: string, enterAnimationDuration: string = '200ms', exitAnimationDuration: string = '200ms') {
    return this.dialog.open(ConfirmDialogBoxComponent,
      {
        data: {
          title: titleParameter,
          message: messageParameter
        },
        width: 'auto',
        enterAnimationDuration,
        exitAnimationDuration,
        panelClass: 'confirm-dialog-container'
      });
  }

}
