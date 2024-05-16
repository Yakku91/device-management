import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { MyUser } from 'src/app/model/user';
import { MyUserResource } from 'src/app/resources/user.resource';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { FormvalidatorService } from 'src/app/services/formvalidator.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent {
  hidePassword = true
  message: string;
  loginForm: FormGroup
  constructor(
    private router: Router,
    private authenticationService: AuthenticationService,
    private formService: FormvalidatorService,
    private userResource: MyUserResource,
    private toastr: ToastrService
  ) { }

  ngOnInit() {
    this.loginForm = this.formService.loginForm
  }

  async logIn(): Promise<void> {
    let email: string = this.loginForm.get('email').value;
    let password: string = this.loginForm.get('password').value;
    await this.authenticationService.login(email, password)
    if (this.authenticationService.isAuthenticated()) {
      this.setSessions()
      // this.loginForm.get('remindMeCheckBox').value ? this.setCookies() : this.deleteCookies()
      this.toastr.success('Erfolgreich angemeldet')
      this.router.navigate(['/']);
    }
    else {
      this.toastr.error('Anmeldeversuch war nicht erfolgreich!')
      this.router.navigate(['/login']);
    }
  }

  setSessions(): void {
    const myUser: MyUser = this.getMyUser()
    sessionStorage.setItem("id", myUser.id())
    sessionStorage.setItem("firstName", myUser.firstname)
    sessionStorage.setItem("lastName", myUser.lastname)
  }

  private getMyUser(): MyUser {
    const user = this.authenticationService.current().getObject()
    return this.userResource.mapToModel(user)
  }
}
