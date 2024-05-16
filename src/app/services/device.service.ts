import { Injectable } from '@angular/core';
import { DeviceResource } from '../resources/device.resource';
import { Device } from '../model/device';
import { FilterService } from './filter.service';
import { ToastrService } from 'ngx-toastr';
import { MyUserResource } from '../resources/user.resource';
import { BaseDevicePhoneService } from './base-device-phone.service';

@Injectable({
  providedIn: 'root'
})
export class DeviceService extends BaseDevicePhoneService<Device, DeviceResource> {
  constructor(
    deviceResource: DeviceResource,
    protected filterService: FilterService,
    protected toastr: ToastrService,
    protected userResource: MyUserResource
  ) {
    super(deviceResource,
      filterService,
      toastr,
      userResource
    )
  }

  getDeviceTypes(): string[] {
    return this.resource.getDeviceTypes()
  }

}
