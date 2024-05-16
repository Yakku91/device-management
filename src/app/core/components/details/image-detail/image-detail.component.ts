import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Image } from 'src/app/model/image';

@Component({
  selector: 'app-image-detail',
  templateUrl: './image-detail.component.html',
  styleUrls: ['./image-detail.component.scss']
})
export class ImageDetailComponent {

  constructor(
    @Inject(MAT_DIALOG_DATA) public imageUrl: string,
  ){ }

}
