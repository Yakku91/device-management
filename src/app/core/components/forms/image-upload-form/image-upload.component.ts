import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ParseInjector, ParseService } from '@pagmf/parse';
import { ToastrService } from 'ngx-toastr';
import { Image } from 'src/app/model/image';

@Component({
  selector: 'app-image-upload',
  templateUrl: './image-upload.component.html',
  styleUrls: ['./image-upload.component.scss']
})
export class ImageUploadComponent {
  files: File[] = []

  constructor(
    @Inject(ParseService) private parseService: ParseInjector,
    private toastr: ToastrService,
    public dialogRef: MatDialogRef<ImageUploadComponent>,
    @Inject(MAT_DIALOG_DATA) public images: Image[]
  ) { }

  onFilesSelected(event: any) {
    this.files = event.target.files;
  }

  async saveImages(): Promise<void> {
    if (!this.images) {
      this.images = []
    }
    if (this.files.length > 0) {
      for (let file of this.files) {
        let image = Image.create(this.parseService, file.name, file)
        try { await image.save() }
        catch (error) {
          this.toastr.error(error)
        }
        this.images.push(image.getObject())
      }
      this.dialogRef.close(this.images)
    }
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}

