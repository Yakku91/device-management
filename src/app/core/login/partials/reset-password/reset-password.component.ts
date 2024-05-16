import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { EmailService } from 'src/app/services/email.service';
import { FormvalidatorService } from 'src/app/services/formvalidator.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent {
  passwordResetForm: FormGroup
  passwordResetButtonDisabled: boolean = true;
  constructor(
    private emailService: EmailService,
    private formvalidatorService: FormvalidatorService
  ) {
    this.passwordResetForm = this.formvalidatorService.passwordResetForm
  }

  resetPassword(email: string) {
    this.emailService.sendPasswordResetEmail(email);
  }
}
