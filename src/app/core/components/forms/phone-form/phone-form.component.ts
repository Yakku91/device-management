import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { DialogMessageEnum } from 'src/app/shared/enums/dialog-messages-enum';
import { Phone } from 'src/app/model/phone';
import { DialogService } from 'src/app/services/dialog.service';
import { FormvalidatorService } from 'src/app/services/formvalidator.service';
import { PhoneService } from 'src/app/services/phone.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-phone-form',
  templateUrl: './phone-form.component.html',
  styleUrls: ['./phone-form.component.scss']
})

export class PhoneFormComponent {
  phone: Phone
  phoneForm: FormGroup
  pageTitle: string = 'Handy hinzufügen'

  constructor(
    private phoneService: PhoneService,
    private dialogService: DialogService,
    private formValidatorService: FormvalidatorService,
    protected activatedRoute: ActivatedRoute,
    private router: Router,
    private ngxSpinner: NgxSpinnerService,
    private toastr: ToastrService
  ) {
    ngxSpinner.show()
  }
  async ngOnInit() {
    this.phoneForm = this.formValidatorService.phoneForm
    if (!this.activatedRoute.snapshot.params.id) {
      this.phone = this.phoneService.getResource().create()
    }
    else {
      this.pageTitle = 'Handydaten ändern'
      const result = await this.phoneService.getById(this.activatedRoute.snapshot.params.id)
      if (result?.data) {
        this.phone = result.data
        this.phoneForm.get('name').setValue(this.phone?.name)
        this.phoneForm.get('tariff').setValue(this.phone?.tariff)
        this.phoneForm.get('contractStart').setValue(this.phone?.contractStart)
        this.phoneForm.get('subsidyEnd')?.setValue(this.phone?.subsidyEnd)
        this.phoneForm.get('phoneNumber')?.setValue(this.phone.phoneNumber)
        this.phoneForm.get('imei')?.setValue(this.phone.imei)
        this.phoneForm.get('simNumber')?.setValue(this.phone.simNumber)
      }
      else {
        this.toastr.error('Kein Handy mit dieser ID wurde gefunden!')
      }
    }
    this.ngxSpinner.hide()
  }

  ngOnDestroy() {
    this.phone = null
    this.phoneForm.reset()
  }

  async save(): Promise<void> {
    this.phone.name = this.phoneForm.get('name').value
    this.phone.tariff = this.phoneForm.get('tariff').value
    this.phone.contractStart = this.phoneForm.get('contractStart').value
    this.phone.subsidyEnd = this.phoneForm.get('subsidyEnd').value
    this.phone.phoneNumber = this.phoneForm.get('phoneNumber').value
    this.phone.imei = this.phoneForm.get('imei').value
    this.phone.simNumber = this.phoneForm.get('simNumber').value
    const result = await this.phoneService.save(this.phone)
    if (result.data) {
      this.toastr.success(DialogMessageEnum.SAVE_SUCCESS)
      this.router.navigate(['/phone/details/' + this.phone?.id()])
    }
    else {
      this.toastr.error(DialogMessageEnum.SAVE_ERROR)
    }
  }

  remove(): void {
    this.dialogService.showConfirmDialog(DialogMessageEnum.DELETE_PHONE_CONFIRM, DialogMessageEnum.CONFIRM_TITLE)
      .afterClosed()
      .subscribe(async response => {
        if (response) {
          const result = await this.phoneService.remove(this.phone)
          if (result?.data) {
            this.toastr.success(DialogMessageEnum.DELETE_SUCCESS)
          }
          else {
            this.toastr.error(DialogMessageEnum.DELETE_ERROR)
          }
        }
      })
  }

  restore(){
    this.dialogService.showConfirmDialog(DialogMessageEnum.RESTORE_PHONE_CONFIRM, DialogMessageEnum.CONFIRM_TITLE)
    .afterClosed()
    .subscribe(async response => {
      if (response) {
        this.phone.deletedAt = null
        const result = await this.phoneService.save(this.phone)
        if (result?.data) {
          this.toastr.success(DialogMessageEnum.DELETE_SUCCESS)
        }
        else {
          this.toastr.error(DialogMessageEnum.DELETE_ERROR)
        }
      }
    })
  }
}
