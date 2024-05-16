import { Component, Input } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Device } from 'src/app/model/device';
import { Phone } from 'src/app/model/phone';
import { DialogService } from 'src/app/services/dialog.service';
import { DialogMessageEnum } from 'src/app/shared/enums/dialog-messages-enum';
import { ImageDetailComponent } from '../../details/image-detail/image-detail.component';
import { MatDialog } from '@angular/material/dialog';
import { QueryOptions } from '@pagmf/parse';

@Component({
  selector: 'app-image-list',
  templateUrl: './image-list.component.html',
  styleUrls: ['./image-list.component.scss']
})
export class ImageListComponent {
  @Input() entity: Device | Phone

  constructor(
    private dialogService: DialogService,
    private toastr: ToastrService,
    public dialog: MatDialog,
  ) {

  }
  delete(id: number) {
    this.dialogService.showConfirmDialog(DialogMessageEnum.CONFIRM_MESSAGE, DialogMessageEnum.CONFIRM_TITLE)
      .afterClosed()
      .subscribe(async response => {
        if (response) {
          this.entity.images.splice(id, 1)
          this.entity.user = this.entity.user?.getObject()
          const result = await this.entity.save()
          if (result.data) {
            this.toastr.success(DialogMessageEnum.DELETE_SUCCESS)
          }
          else {
            console.log(result)
            this.toastr.error(DialogMessageEnum.DELETE_ERROR)
          }
        }
      });
  }

  showImageInLightBox(imageUrl: string) {
    this.dialog.open(ImageDetailComponent, {
      data: imageUrl,
    })
  }
}
