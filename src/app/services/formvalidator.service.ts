import { Injectable } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class FormvalidatorService {

  constructor() { }

  public editUserForm: FormGroup = new FormGroup({
    email: new FormControl(null, [ Validators.email]),
    username: new FormControl(null, Validators.required),
    firstName: new FormControl(null, Validators.required),
    lastName: new FormControl(null, Validators.required),
    role: new FormControl(null, Validators.required)
  });

  public addUserForm: FormGroup = new FormGroup({
    email: new FormControl(null, [ Validators.required, Validators.email]),
    username: new FormControl(null, Validators.required),
    firstName: new FormControl(null, Validators.required),
    lastName: new FormControl(null, Validators.required),
    role: new FormControl(null, Validators.required),
    defaultPassword: new FormControl(null, [Validators.minLength(8), Validators.required])
  });

  public searchForm: FormGroup = new FormGroup({
    searchField: new FormControl(null)
  })

  public editProfileForm: FormGroup = new FormGroup({
    username: new FormControl(null, Validators.required),
    firstName: new FormControl(null, Validators.required),
    lastName: new FormControl(null, Validators.required),
  })

  public loginForm: FormGroup = new FormGroup({
    email: new FormControl(null, Validators.required),
    password: new FormControl(null, Validators.required),
    remindMeCheckBox: new FormControl(false)
  })

  public static userListForm: FormGroup = new FormGroup({
    userDropBox: new FormControl(0),
    userTextBox: new FormControl('Kein Benutzer')
  })

  public passwordResetForm: FormGroup = new FormGroup({
    email: new FormControl(null, [Validators.required, Validators.email]),
  })

  public changePasswordForm: FormGroup = new FormGroup({
    password: new FormControl(null, [
      Validators.required,
      Validators.pattern('^(?=.*[A-Z])(?=.*[0-9])(?=.*[a-z]).{8,}$'),
      Validators.minLength(8)
    ]),
    confirmPassword: new FormControl(null,
      [Validators.required,
      Validators.pattern('^(?=.*[A-Z])(?=.*[0-9])(?=.*[a-z]).{8,}$'),
      Validators.minLength(8)])
  }, { validators: this.matchPassword() });

  matchPassword(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const password: string = control.get('password').value;
      const confirmPassword: string = control.get('confirmPassword').value;
      if ((password?.length >= 8 && confirmPassword?.length >= 8) && password !== confirmPassword) {
        return { passwordMismatch: true };
      } else {
        return null;
      }
    };
  }

  public deviceForm: FormGroup = new FormGroup({
    name: new FormControl(null, Validators.required),
    deviceType: new FormControl(null, Validators.required),
    serialNumber: new FormControl(null, Validators.required),
    location: new FormControl(null, Validators.required),
    neustaNumber: new FormControl(null, Validators.required),
    airbusNumber: new FormControl(null)
  });

  public phoneForm: FormGroup = new FormGroup({
    name: new FormControl(null, Validators.required),
    tariff: new FormControl(null, Validators.required),
    contractStart: new FormControl(null, Validators.required),
    subsidyEnd: new FormControl(null, Validators.required),
    phoneNumber: new FormControl(null, Validators.required),
    imei: new FormControl(null, Validators.required),
    simNumber: new FormControl(null, Validators.required),
  })

  public noteForm: FormGroup = new FormGroup({
    title: new FormControl(null, Validators.required),
    note: new FormControl(null, Validators.required)
  })
}
