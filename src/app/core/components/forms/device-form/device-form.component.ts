import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { DialogMessageEnum } from 'src/app/shared/enums/dialog-messages-enum';
import { Device } from 'src/app/model/device';
import { DeviceService } from 'src/app/services/device.service';
import { DialogService } from 'src/app/services/dialog.service';
import { FormvalidatorService } from 'src/app/services/formvalidator.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-device-form',
  templateUrl: './device-form.component.html',
  styleUrls: ['./device-form.component.scss'],

})

export class DeviceFormComponent {

  pageTitle: string = 'Gerät hinzufügen'
  deviceTypes: string[]
  deviceForm: FormGroup
  device: Device;

  constructor(
    private deviceService: DeviceService,
    private formValidatorService: FormvalidatorService,
    private router: Router,
    protected activatedRoute: ActivatedRoute,
    private dialogService: DialogService,
    private ngxSpinner: NgxSpinnerService,
    private toastr: ToastrService
  ) { }

  async ngOnInit() {
    this.ngxSpinner.show()
    this.deviceTypes = this.deviceService.getDeviceTypes()
    this.deviceForm = this.formValidatorService.deviceForm
    if (!this.activatedRoute.snapshot.params.id) {
      this.device = this.deviceService.getResource().create()
    }
    else {
      this.pageTitle = 'Gerätedaten ändern'
      const result = await this.deviceService.getById(this.activatedRoute.snapshot.params.id)
      if (result.error) {
        this.toastr.error("Kein Gerät mit dieser ID wurde gefunden!")
        this.router.navigate(['/devices'])
      }
      else if (result.data) {
        this.device = result.data
        this.deviceForm.get('name').setValue(this.device?.name)
        this.deviceForm.get('deviceType').setValue(this.device?.type)
        this.deviceForm.get('location').setValue(this.device?.location)
        this.deviceForm.get('neustaNumber').setValue(this.device?.neustaNumber)
        this.deviceForm.get('serialNumber').setValue(this.device?.serialNumber)
        this.deviceForm.get('airbusNumber').setValue(this.device?.airbusNumber)
      }
    }
    this.ngxSpinner.hide()
  }
  ngOnDestroy() {
    this.device = null
    this.deviceForm.reset()
  }

  async save(): Promise<void> {
    this.device.name = this.deviceForm.get('name').value
    this.device.type = this.deviceForm.get('deviceType').value
    this.device.location = this.deviceForm.get('location').value
    this.device.neustaNumber = this.deviceForm.get('neustaNumber').value
    this.device.serialNumber = this.deviceForm.get('serialNumber').value
    this.device.airbusNumber = this.deviceForm.get('airbusNumber').value
    const result = await this.deviceService.save(this.device)
    if (result) {
      this.toastr.success(DialogMessageEnum.SAVE_SUCCESS)
      this.router.navigate(['/device/details/' + this.device?.id()])
    }
    else {
      this.toastr.error(DialogMessageEnum.SAVE_ERROR)
    }
  }

  remove(): void {
    this.dialogService.showConfirmDialog(DialogMessageEnum.DELETE_DEVICE_CONFIRM, DialogMessageEnum.CONFIRM_TITLE)
      .afterClosed()
      .subscribe(async response => {
        if (response) {
          const result = await this.deviceService.remove(this.device)
          if (result) {
            this.toastr.success(DialogMessageEnum.DELETE_SUCCESS)
          }
          else {
            this.toastr.error(DialogMessageEnum.DELETE_ERROR)
          }
        }
      })
  }

  restore(){
    this.dialogService.showConfirmDialog(DialogMessageEnum.RESTORE_DEVICE_CONFIRM, DialogMessageEnum.CONFIRM_TITLE)
    .afterClosed()
    .subscribe(async response => {
      if (response) {
        this.device.deletedAt = null
        const result = await this.deviceService.save(this.device)
        if (result?.data) {
          this.toastr.success(DialogMessageEnum.RESTORE_SUCCESS)
        }
        else {
          this.toastr.error(DialogMessageEnum.RESTORE_ERROR)
        }
      }
    })
  }

}
