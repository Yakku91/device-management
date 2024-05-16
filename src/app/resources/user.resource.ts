import { Inject, Injectable } from "@angular/core";
import { ParseInjector, ParseService } from "@pagmf/parse";
import { MyUser } from "../model/user";
import { UserResource } from "@pagmf/security";


@Injectable({
  providedIn: 'root'
})

export class MyUserResource extends UserResource {
  constructor(@Inject(ParseService) parseService: ParseInjector) {
    super(parseService)
  }
  mapToModel(myUser: any): MyUser {
    return new MyUser(this.parseService, myUser);
  }

   async createMyUser() {
    let user: MyUser = new MyUser(this.parseService)
    user.password = this.generateDefaultPassword()
    user.getACL().setRoleReadAccess('admin', true)
    user.getACL().setRoleWriteAccess('admin', true)
    user.getACL().setPublicReadAccess(true)
    return user
  }

  public generateDefaultPassword(): string {
    const dateTime = new Date();
    return 'Neusta' + dateTime.getMilliseconds() + 'Aerospace' + dateTime.getMilliseconds()
  }

}