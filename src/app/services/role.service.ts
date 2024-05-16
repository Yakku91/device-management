
import { Injectable } from '@angular/core';
import { FilterFactory, ParseHttpResponse, QueryOptions } from '@pagmf/parse';
import { MyUser } from '../model/user';
import { BaseService } from './base.service';
import { RoleResource } from '../resources/role.resource';
import { Role } from '../model/role';

@Injectable({
  providedIn: 'root'
})
export class RoleService extends BaseService<Role, RoleResource> {
  permissionRoleResource;

  constructor(
    roleResource: RoleResource,
  ) {
    super(roleResource)
  }

  async getByName(name: string):Promise<Role>{
    const options: QueryOptions = this.resource.createQueryOptions();
    options.filters?.push(FilterFactory.createEqualToFilter('name', name))
    return (await this.resource.getFirst(options)).data
  }

  async setUser(user: MyUser, roleId: string): Promise<ParseHttpResponse<boolean>> {
      let currentRole = await this.getByUserId(user.userId)
      currentRole?.removeUser(user)
      await currentRole?.save()
      const role = (await this.getById(roleId)).data
      role.addUser(user)
      return await role.save()   
  }

  async getByUserId(userId: string): Promise<Role> {
    let allRoles = await this.getAll()
    let currentRole
    if (allRoles) {
      for (let role of allRoles.data) {
        let mappedRole = this.resource.mapToModel(role.getObject())
        let users = await mappedRole.loadUsers()
        if (users) {
          for (let user of users) {
            user = this.resource.mapToModel(user)
            if (user.id() === userId) {
              currentRole = mappedRole
            }
          }
        }
      }
    }
    return currentRole
  }

}
