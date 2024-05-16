import { Injectable } from '@angular/core';
import { BaseService } from './base.service';
import { UserHistory } from '../model/user-history';
import { UserHistoryResource } from '../resources/user-history.resource';
import { FilterService } from './filter.service';
import { Phone } from '../model/phone';
import { Device } from '../model/device';
import { FilterFactory, ParseHttpResponse, ParseHttpResponseList, QueryFilter, QueryOptions } from '@pagmf/parse';
import { DeviceService } from './device.service';
import { PhoneService } from './phone.service';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class UserHistoryService extends BaseService<UserHistory, UserHistoryResource> {

  constructor(
    resource: UserHistoryResource,
    private deviceService: DeviceService,
    private phoneService: PhoneService,
    private filterService: FilterService,
    private userService: UserService,

  ) {
    super(resource);
  }

  async createUserHistory(entity: Device | Phone): Promise<boolean> {
    let userHistory = this.getResource().create()
    userHistory.start = new Date()
    let mappedUser = this.userService.getResource().mapToModel(entity.user)
    userHistory.user = mappedUser.getObject()
    userHistory.userName = mappedUser.name
    if (entity instanceof Device) {
      userHistory.device = entity.getObject()
    }
    else {
      userHistory.phone = entity.getObject()
    }
    return (await this.save(userHistory)).data
  }

  async closeUserHistory(entity: Device | Phone): Promise<false | ParseHttpResponse<boolean>> {
    const result: ParseHttpResponseList<UserHistory> = await this.getCurrentHistory(entity)
    if (result.data) {
      let currentHistory: UserHistory = result.data[0]
      if (result.data.length > 1) {
        currentHistory = await this.userHistoryBugFixer(result.data)
      }
      currentHistory.device = undefined
      currentHistory.phone = undefined
      currentHistory.end = new Date()
      return await this.save(currentHistory)
    }
    return false
  }

  async getByDeviceId(deviceId: string): Promise<ParseHttpResponseList<UserHistory>> {
    let queryOption = this.deviceService.getResource().createQueryOptions()
    queryOption.filters.push(this.filterService.getEqualToDeviceFilter(deviceId))
    return (await this.getAll(queryOption))
  }

  async getByPhoneId(phoneId: string): Promise<ParseHttpResponseList<UserHistory>> {
    let queryOption = this.phoneService.getResource().createQueryOptions()
    queryOption.filters.push(this.filterService.getEqualToPhoneFilter(phoneId))
    return (await this.getAll(queryOption))
  }

  async getCurrentHistory(entity: Device | Phone): Promise<ParseHttpResponseList<UserHistory>> {
    let queryOptions = this.resource.createQueryOptions()
    if (entity instanceof Device) {
      queryOptions.filters.push(this.filterService.getByDeviceIdFilter(entity.id()))
    }
    else {
      queryOptions.filters.push(this.filterService.getByPhoneIdFilter(entity.id()))
    }
    queryOptions.filters.push(FilterFactory.createEqualToFilter('end', undefined))
    return await this.getAll(queryOptions)
  }

  async getCurrentHistories(entity: Device | Phone): Promise<UserHistory[]> {
    let queryOptions = this.resource.createQueryOptions()
    queryOptions.filters.push(this.filterService.getByUserIdFilter(sessionStorage.getItem('id')))
    queryOptions.filters.push(FilterFactory.createEqualToFilter('end', undefined))
    if (entity instanceof Device) {
      queryOptions.filters.push(FilterFactory.createEqualToFilter('device', undefined))
    }
    else {
      queryOptions.filters.push(FilterFactory.createEqualToFilter('phone', undefined))
    }
    return (await this.getAll(queryOptions)).data
  }

  async getByUserId(userId: string): Promise<UserHistory[]> {
    let queryOptions = this.resource.createQueryOptions()
    queryOptions.filters.push(this.filterService.getByUserIdFilter(userId))
    queryOptions.includes = ["phone", "device"];
    let userHistories = await this.getAll(queryOptions)
    return userHistories.data
  }

  private async userHistoryBugFixer(userHistories: UserHistory[]): Promise<UserHistory> {
    let sortedHistories = userHistories.sort((a: UserHistory, b: UserHistory) => a.start.getTime() - b.start.getTime());
    for (let i = 0; i < sortedHistories.length - 1; i++) {
      if (!sortedHistories[i].end) {
        sortedHistories[i].end = sortedHistories[i + 1].start
        const result = await userHistories[i].save({ cascadeSave: false } as QueryOptions)
        if (result.error) {
          console.log(result.message)
        }
      }
    }
    return sortedHistories[sortedHistories.length - 1]
  }
}
