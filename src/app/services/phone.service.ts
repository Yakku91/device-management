import { Injectable } from '@angular/core';
import { Phone } from '../model/phone';
import { PhoneResource } from '../resources/phone.resource';
import { FilterService } from './filter.service';
import { ToastrService } from 'ngx-toastr';
import { MyUserResource } from '../resources/user.resource';
import { BaseDevicePhoneService } from './base-device-phone.service';
@Injectable({
  providedIn: 'root'
})
export class PhoneService extends BaseDevicePhoneService<Phone, PhoneResource>{

  constructor(
    phoneResource: PhoneResource,
    protected filterService: FilterService,
    protected toastr: ToastrService,
    protected userResource: MyUserResource
  ) {
    super(phoneResource,
      filterService,
      toastr,
      userResource
      )
  }
}
