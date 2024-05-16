import { Injectable } from '@angular/core';
import { FilterFactory, QueryFilter } from '@pagmf/parse';
import { Device } from '../model/device';
import { Phone } from '../model/phone';

@Injectable({
  providedIn: 'root'
})
export class FilterService {

  getEqualToDeviceFilter(deviceId: string): QueryFilter {
    return this.getEqualToPointerFilter(Device.name, 'device', deviceId)
  }

  getEqualToPhoneFilter(phoneId: string): QueryFilter {
    return this.getEqualToPointerFilter(Phone.name, 'phone', phoneId)
  }

  getEqualToPointerFilter(className: string, key: string, id: string): QueryFilter {
    return FilterFactory.createEqualToFilter(key, {
      '__type': 'Pointer',
      'className': className,
      'objectId': id,
    })
  }
  getOnlyAvailableFilter(): QueryFilter {
    return FilterFactory.createEqualToFilter('user', null)
  }
  getByCurrentUserFilter() {
    return this.getEqualToPointerFilter('_User', 'user', sessionStorage.getItem('id'))
  }
  getByUserIdFilter(userId: string) {
    return this.getEqualToPointerFilter('_User', 'user', userId)
  }
  getByPhoneIdFilter(phoneId: string) {
    return this.getEqualToPointerFilter('Phone', 'phone', phoneId)
  }
  getByDeviceIdFilter(deviceId: string) {
    return this.getEqualToPointerFilter('Device', 'device', deviceId)
  }
  withoutDeletedEntitiesFilter(){
    return FilterFactory.createEqualToFilter('deletedAt', undefined)
  }
}
