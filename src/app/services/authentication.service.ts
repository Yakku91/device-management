import { Injectable } from '@angular/core';
import { ParseService } from '@pagmf/parse';
import { ParseAuthenticationService } from '@pagmf/security';
import { MyUser } from '../model/user';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService extends ParseAuthenticationService {

  user: MyUser

  constructor(
    parseService: ParseService,
    private router: Router
  ) {
    super(parseService)
    if (!sessionStorage.getItem('id') || sessionStorage?.getItem('id') != this.current().id()) {
      this.logout()
      this.router.navigate(['/login'])
    }
  }
}
