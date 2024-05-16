import { Inject, Injectable } from '@angular/core';
import { ParseBaseModel, ParseBaseResource, ParseHttpResponse, ParseHttpResponseList, QueryOptions } from '@pagmf/parse';

@Injectable({
  providedIn: 'root'
})
export abstract class BaseService<T extends ParseBaseModel<T>, U extends ParseBaseResource<T>> {
  isAdmin: boolean

  constructor(
    protected resource: U,
  ) { }

  getResource() {
    return this.resource
  }

  async getAll(options?: QueryOptions): Promise<ParseHttpResponseList<T>> {
    return await this.resource.getAll(options)
  }

  async getById(id: string): Promise<ParseHttpResponse<T>> {
    return await this.resource.getById(id)
  }

  async save(entity: T): Promise<ParseHttpResponse<boolean>> {
    return await entity.save({ cascadeSave: false } as QueryOptions)
  }

  async remove(entity: T): Promise<ParseHttpResponse<boolean>> {
    return await entity.destroy()
  }
}
