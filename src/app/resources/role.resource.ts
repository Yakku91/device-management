import { Inject, Injectable } from '@angular/core';
import { ParseBaseResource, ParseInjector, ParseService } from '@pagmf/parse';
import { Role } from '../model/role';

@Injectable({
  providedIn: 'root'
})
export class RoleResource extends ParseBaseResource<Role> {

  constructor(@Inject(ParseService) parseService: ParseInjector) {
    super('_Role', parseService)
  }

  mapToModel(role: any): Role {
    return new Role(this.parseService, role)
  }
  create(): Role { 
    const note: Role = new Role(this.parseService)
    note.getACL().setRoleReadAccess('admin', true)
    note.getACL().setRoleWriteAccess('admin', true)
    note.getACL().setPublicReadAccess(true)
    return note
  }

}
