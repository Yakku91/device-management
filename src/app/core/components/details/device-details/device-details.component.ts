import { Component, Input } from '@angular/core';
import { Device } from 'src/app/model/device';

@Component({
  selector: 'app-device-details',
  templateUrl: './device-details.component.html',
  styleUrls: ['./device-details.component.scss']
})
export class DeviceDetailsComponent {
  @Input() device: Device
}
