import { Inject, Injectable } from '@angular/core';
import { ParseBaseResource, ParseInjector, ParseService } from '@pagmf/parse';
import { UserHistory } from '../model/user-history';

@Injectable({
  providedIn: 'root'
})
export class UserHistoryResource extends ParseBaseResource<UserHistory> {

  mapToModel(parseModel: any): UserHistory {
    return new UserHistory(this.parseService, parseModel);
  }

  constructor(@Inject(ParseService) parseService: ParseInjector) {
    super(UserHistory.MODEL, parseService);
  }

  create(): UserHistory { 
    const userHistory: UserHistory = new UserHistory(this.parseService)
    // userHistory.getACL().setRoleReadAccess('admin', true)
    // userHistory.getACL().setRoleWriteAccess('admin', true)
    userHistory.getACL().setPublicReadAccess(true)
    userHistory.getACL().setPublicWriteAccess(true)
    return userHistory
  }

}
