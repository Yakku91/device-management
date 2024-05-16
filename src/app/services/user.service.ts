import { Injectable } from '@angular/core';
import { MyUserResource } from '../resources/user.resource';
import { FilterFactory, ParseHttpResponse, ParseHttpResponseList, QueryOptions } from '@pagmf/parse';
import { EmailService } from './email.service';
import { MyUser } from '../model/user';
import { PhoneService } from './phone.service';
import { DeviceService } from './device.service';
import { Phone } from '../model/phone';
import { Device } from '../model/device';
import { ToastrService } from 'ngx-toastr';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  user: any; // authService.current()

  constructor(
    private resource: MyUserResource,
    private emailService: EmailService,
    private deviceService: DeviceService,
    private phoneService: PhoneService,
    private toastr: ToastrService
  ) { }

  getResource() {
    return this.resource
  }

  async getById(id: string): Promise<ParseHttpResponse<MyUser>> {
    let result: ParseHttpResponse<MyUser> = await this.resource.getById(id) as ParseHttpResponse<MyUser>
    return result
  }

  async getByUsername(username: string): Promise<MyUser> {
    let user: MyUser = null
    const options: QueryOptions = this.resource.createQueryOptions()
    options.filters?.push(FilterFactory.createEqualToFilter('username', username))
    let result = await this.resource.getFirst(options);
    user = result.data as MyUser
    return user
  }

  async getAll(): Promise<ParseHttpResponseList<MyUser>> {
    let result: ParseHttpResponseList<MyUser> = await this.resource.getAll() as ParseHttpResponseList<MyUser>

    let users: MyUser[] = []
    for (let user of result.data) {
      let mappedUser = this.resource.mapToModel(user.getObject())
      users.push(mappedUser)
    }
    result.data = users as MyUser[]
    return result
  }

  async remove(user: MyUser): Promise<ParseHttpResponse<boolean>> {
    const response: boolean = await this.canDelete(user.id())
    if (response) {
      return await user.destroy()
    }
  }

  async save(user: MyUser): Promise<ParseHttpResponse<boolean>> {
    // const isExistUser: boolean = user.id() ? true : false
    const response: ParseHttpResponse<boolean> = await user.save()
    // if (!isExistUser) {
    //   this.emailService.sendPasswordResetEmail(user.email)
    // }
    return response
  }

  async createUserFromExcel(username: any) {
    let user: MyUser
    user = await (await this.getByUsername(username))?.getObject()
    if (!user) {
      user = await this.resource.createMyUser()
      user.username = username
      await this.save(user)
    }
    return user
  }

  async canDelete(userId: string): Promise<boolean> {
    const phones: ParseHttpResponseList<Phone> = await this.phoneService.getByUserId(userId)
    const devices: ParseHttpResponseList<Device> = await this.deviceService.getByUserId(userId)
    if (phones?.data?.length > 0) {
      this.toastr.error('Dieser Benutzer besitzt derzeit ein oder mehrere Handys!')
    }
    else if (devices?.data?.length > 0) {
      this.toastr.error('Dieser Benutzer besitzt derzeit ein oder mehrere Geräte!')
    }
    else {
      return true
    }
  }
}
