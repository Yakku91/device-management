import { Injectable } from '@angular/core';
import { BaseService } from './base.service';
import { ParseBaseResource, ParseHttpResponse, ParseHttpResponseList, QueryOptions } from '@pagmf/parse';
import { MyUser } from '../model/user';
import { Phone } from '../model/phone';
import { FilterService } from './filter.service';
import { ToastrService } from 'ngx-toastr';
import { MyUserResource } from '../resources/user.resource';
import { Device } from '../model/device';

@Injectable({
  providedIn: 'root'
})
export abstract class BaseDevicePhoneService<T extends Phone | Device, U extends ParseBaseResource<T>> extends BaseService<T, U> {

  constructor(
    protected resource: U,
    protected filterService: FilterService,
    protected toastr: ToastrService,
    protected userResource: MyUserResource
  ) {
    super(resource);
  }
  override async getById(id: string): Promise<ParseHttpResponse<T>> {
    let result = await this.resource.getById(id)
    if (result.data) {
      if (result.data.user && !(result.data.user instanceof MyUser)) {
        result.data.user = this.userResource.mapToModel(result.data.user)
      }
    }
    return result
  }

  async getByUserId(userId: string): Promise<ParseHttpResponseList<T>> {
    const options: QueryOptions = this.resource.createQueryOptions()
    options.filters.push(this.filterService.getByUserIdFilter(userId))
    return await this.getAll(options)
  }

  override async getAll(options?: QueryOptions): Promise<ParseHttpResponseList<T>> {
    let result = await this.resource.getAll(options)
    if (result.data) {
      for (let entity of result.data) {
        if (entity.user && !(entity.user instanceof MyUser)) {
          entity.user = this.userResource.mapToModel(entity.user)
        }
      }
    }
    return result
  }

  override async remove(entity: T): Promise<ParseHttpResponse<boolean>> {
    if (entity.user) {
      this.toastr.error('Dieses Objekt ist derzeit einem Benutzer zugewiesen!')
    }
    else {
      entity.deletedAt = new Date()
      return await entity.save()
    }
  }
}
