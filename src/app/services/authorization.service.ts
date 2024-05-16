import { Injectable } from '@angular/core';
import { ParseAuthorizationService, PermissionRole } from '@pagmf/security';
import { AuthenticationService } from './authentication.service';
import { FilterFactory, ParseHttpResponse, QueryOptions } from '@pagmf/parse';
import { Role } from '../model/role';
import { RoleResource } from '../resources/role.resource';
import { MyUser } from '../model/user';
import { MyUserResource } from '../resources/user.resource';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class AuthorizationService extends ParseAuthorizationService {

  constructor(
    private authenticationServicex: AuthenticationService,
    private roleResource: RoleResource,
    private userResource: MyUserResource,
    private toastr: ToastrService
  ) {
    super(authenticationServicex)
  }

  async isAdmin(): Promise<boolean> {
    try {
      const options: QueryOptions = this.roleResource.createQueryOptions();
      options.filters?.push(FilterFactory.createEqualToFilter('name', 'admin'))
      const role = (await this.roleResource.getFirst(options)).data;
      if (!role) {
        return false; // Rolle nicht gefunden
      }
      const users: MyUser[] = await role.loadUsers();
      for (const user of users) {
        const mappedUser = this.userResource.mapToModel(user);
        if (mappedUser.id() === this.authenticationServicex.current().getId()) {
          return true; // Benutzer gefunden
        }
      }
      return false; // Benutzer nicht gefunden
    } catch (error) {
      this.toastr.error('Fehler beim Überprüfen der Berechtigungsrolle: ' + error.message)
    }
  }
}
