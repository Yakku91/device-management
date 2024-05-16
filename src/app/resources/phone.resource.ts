import { Inject, Injectable } from '@angular/core';
import { ParseBaseResource, ParseInjector, ParseService } from '@pagmf/parse';
import { Phone } from '../model/phone';

@Injectable({
  providedIn: 'root'
})
export class PhoneResource extends ParseBaseResource<Phone> {

  mapToModel(parseModel: any): Phone {
    return new Phone(this.parseService, parseModel);
  }

  constructor(@Inject(ParseService) parseService: ParseInjector) {
    super(Phone.MODEL, parseService);
  }
  create():Phone{
    const phone: Phone = new Phone(this.parseService)
    // phone.getACL().setRoleReadAccess('admin', true)
    // phone.getACL().setRoleWriteAccess('admin', true)
    phone.getACL().setPublicReadAccess(true)
    phone.getACL().setPublicWriteAccess(true)
    return phone
  }

}
