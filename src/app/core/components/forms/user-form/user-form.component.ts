import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { Role } from 'src/app/model/role';
import { MyUser } from 'src/app/model/user';
import { FormvalidatorService } from 'src/app/services/formvalidator.service';
import { RoleService } from 'src/app/services/role.service';
import { UserService } from 'src/app/services/user.service';
import { DialogMessageEnum } from 'src/app/shared/enums/dialog-messages-enum';


@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss'],

})
export class UserFormComponent {

  userForm: FormGroup
  pageTitle = "Benutzerdaten ändern"
  user: MyUser
  changePasswordForm: FormGroup = null
  hidePassword = true
  hidePassword2 = true
  allRoles: Role[]

  constructor(
    private userService: UserService,
    private formValidatorService: FormvalidatorService,
    private activatedRoute: ActivatedRoute,
    private roleService: RoleService,
    private ngxSpinner: NgxSpinnerService,
    private toastr: ToastrService,
    private router: Router
  ) {
    ngxSpinner.show()
    if (!this.activatedRoute.snapshot.params.id) {
      this.userForm = this.formValidatorService.addUserForm
      this.pageTitle = 'Benutzer hinzufügen'
    }
    else if (activatedRoute.snapshot.url[0].path === 'profile') {
      this.userForm = this.formValidatorService.editProfileForm
      this.changePasswordForm = this.formValidatorService.changePasswordForm
    }
    else {
      this.userForm = this.formValidatorService.editUserForm
      this.changePasswordForm = this.formValidatorService.changePasswordForm
    }
  }

  async ngOnInit() {
    this.allRoles = await this.getAllRoles()
    if (this.activatedRoute.snapshot.params.id) {
      this.user = (await this.userService.getById(this.activatedRoute.snapshot.params.id)).data
    }
    let role: Role
    if (this.user) {
      role = await this.roleService.getByUserId(this.user.id())
      this.userForm.get('firstName').setValue(this.user.firstname)
      this.userForm.get('lastName').setValue(this.user.lastname)
      this.userForm.get('username').setValue(this.user.username)
      this.userForm.get('email')?.setValue(this.user.email)
      this.userForm.get('role')?.setValue(role?.id())
    }
    this.ngxSpinner.hide()
  }

  ngOnDestroy() {
    this.user = null
    this.userForm.reset()
  }

  async getAllRoles(): Promise<Role[]> {
    const result = await this.roleService.getAll()
    if (result.data) {
      return result.data
    }
    else {
      this.toastr.error("Rollen konnten nicht geladen werden!")
    }
  }

  async save(): Promise<void> {
    if (!this.user) {
      this.user = await this.userService.getResource().createMyUser()
    }
    this.user.email = this.userForm.get('email')?.value
    this.user.firstname = this.userForm.get('firstName').value
    this.user.lastname = this.userForm.get('lastName').value
    this.user.username = this.userForm.get('username').value
    this.user.password = this.userForm.get('defaultPassword')?.value
    const result = await this.userService.save(this.user)
    if (result.data) {
      if (this.userForm.get('role')?.value) {
        const result = await this.roleService.setUser(this.user, this.userForm.get('role')?.value)
        if (result.data) {
          this.router.navigate(['/users'])
        }
        else {
          this.toastr.error("Benutzerrolle konnte nicht gespeichert werden")
        }
      }
      this.toastr.success(DialogMessageEnum.SAVE_SUCCESS)
    }
    else {
      this.toastr.error(DialogMessageEnum.SAVE_ERROR)
    }
  }

  async savePassword(): Promise<void> {
    this.user.setPassword(this.changePasswordForm.get('password').value)
    const result = await this.userService.save(this.user)
    if (result.data) {
      this.toastr.success(DialogMessageEnum.SAVE_SUCCESS)
      this.changePasswordForm.reset()
    }
    else {
      this.toastr.error(DialogMessageEnum.SAVE_ERROR)
    }
  }
  protected generatePassword() {
    const dateTime = new Date();
    this.userForm.get('defaultPassword').setValue('Neusta' + dateTime.getMilliseconds() + 'Aerospace')
  }
}
