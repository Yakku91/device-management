import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { Device } from 'src/app/model/device';
import { Note } from 'src/app/model/note';
import { Phone } from 'src/app/model/phone';
import { MyUser } from 'src/app/model/user';
import { DeviceService } from 'src/app/services/device.service';
import { DialogService } from 'src/app/services/dialog.service';
import { NoteService } from 'src/app/services/note.service';
import { PDFService } from 'src/app/services/pdf.service';
import { PhoneService } from 'src/app/services/phone.service';
import { UserHistoryService } from 'src/app/services/user-history.service';
import { DialogMessageEnum } from 'src/app/shared/enums/dialog-messages-enum';
import { UserHistoryComponent } from '../../lists/user-history-list/user-history.component';
import { AuthorizationService } from 'src/app/services/authorization.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { UserService } from 'src/app/services/user.service';
import { FormvalidatorService } from 'src/app/services/formvalidator.service';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { ToastrService } from 'ngx-toastr';
import { ImageUploadComponent } from '../../forms/image-upload-form/image-upload.component';
import { UserHistory } from 'src/app/model/user-history';
import { ParseHttpResponse, ParseHttpResponseList } from '@pagmf/parse';


@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class DetailComponent {

  userListForm: FormGroup
  entity: Device | Phone
  service
  isCurrent: boolean
  notes: Note[]
  isAdmin: boolean
  filteredUsers: any;
  users: any;
  userHistories: UserHistory[]

  constructor(
    private userHistoryService: UserHistoryService,
    private dialogService: DialogService,
    public activatedRoute: ActivatedRoute,
    private router: Router,
    private phoneService: PhoneService,
    private deviceService: DeviceService,
    private noteService: NoteService,
    private pdfService: PDFService,
    public dialog: MatDialog,
    private authorizationService: AuthorizationService,
    private authenticationService: AuthenticationService,
    private ngxSpinner: NgxSpinnerService,
    private userService: UserService,
    private toastr: ToastrService,

  ) {
    if (!this.activatedRoute.snapshot.params.id) {
      this.router.navigate(['/'])
    }
    this.userListForm = FormvalidatorService.userListForm
    this.userListForm.get('userTextBox').setValue(null)
  }

  async ngOnInit() {
    this.ngxSpinner.show()
    this.isAdmin = await this.authorizationService.isAdmin()
    if (this.activatedRoute.snapshot.url[0].path === 'phone') {
      this.service = this.phoneService
      this.entity = await this.getPhoneById(this.activatedRoute.snapshot.params.id)
      this.notes = await this.getNotesByPhoneId(this.entity.getObject().id)
    }
    else if (this.activatedRoute.snapshot.url[0].path === 'device') {
      this.service = this.deviceService
      this.entity = await this.getDeviceById(this.activatedRoute.snapshot.params.id)
      this.notes = await this.getNotesByDeviceId(this.entity.getObject().id)
    }
    else {
      this.router.navigate(['/'])
    }
    this.users = await this.getUsers()
    if (this.entity?.user) {
      this.userListForm.get('userTextBox').setValue(this.entity?.user.name)
      this.isCurrent = sessionStorage.getItem('id') == this.entity?.user.userId
    }
    this.fillUserHistories()
    this.ngxSpinner.hide()
  }

  private async getNotesByDeviceId(deviceId: string) {
    const result: ParseHttpResponseList<Note> = await this.noteService.getByDeviceId(deviceId)
    if (result) {
      return result.data
    }
    else if (result && result.error) {
      this.toastr.error("Anmerkungen konnten nicht geladen werden!")
    }
  }

  private async getNotesByPhoneId(phoneId: string) {
    const result: ParseHttpResponseList<Note> = await this.noteService.getByPhoneId(phoneId)
    if (result) {
      return result.data
    }
    else if (result && result.error) {
      this.toastr.error("Anmerkungen konnten nicht geladen werden!")
    }
  }

  private async getPhoneById(entityId: string) {
    const result: ParseHttpResponse<Phone> = await this.phoneService.getById(entityId)
    if (result) {
      return result.data
    }
    else if (result.error) {
      this.toastr.error(result.message)
      this.router.navigate(['/phones'])
    } else {
      this.toastr.error('Kein Handy mit dieser Id-Nummer wurde gefunden!')
      this.router.navigate(['/phones'])
    }
  }

  private async getDeviceById(entityId: string) {
    const result: ParseHttpResponse<Device> = await this.deviceService.getById(entityId)
    if (result) {
      return result.data
    }
    else if (result.error) {
      this.toastr.error(result.message)
      this.router.navigate(['/devices'])
    }
    else {
      this.toastr.error('Kein Gerät mit dieser Id-Nummer wurde gefunden!')
      this.router.navigate(['/devices'])
    }
  }

  protected async setCurrentUser(): Promise<void> {
    let currentUser = await this.authenticationService.current().getObject()
    let mappedCurrentUser = this.userService.getResource().mapToModel(currentUser)
    this.setUser(mappedCurrentUser)
  }

  async getUsers(): Promise<MyUser[]> {
    const result = await this.userService.getAll()
    if (result.data) {
      return result.data as MyUser[]
    }
    else {
      this.toastr.error("Benutzer konnten nicht geladen werden!")
    }
  }

  async fillUserHistories(): Promise<void> {
    let result: ParseHttpResponseList<UserHistory>
    if (this.entity && this.entity instanceof Device) {
      result = await this.userHistoryService.getByDeviceId(this.entity.id())
    }
    else if (this.entity && this.entity instanceof Phone) {
      result = await this.userHistoryService.getByPhoneId(this.entity.id())
    }
    if (result) {
      this.userHistories = result.data
    }
    else if (result?.error) {
      this.toastr.error(result.message)
    }
  }

  async setUser(user: MyUser): Promise<void> {
    if (this.entity?.user?.userId !== user?.userId) {
      this.ngxSpinner.show()
      this.dialogService.showConfirmDialog(DialogMessageEnum.CONFIRM_MESSAGE, DialogMessageEnum.CONFIRM_TITLE)
        .afterClosed()
        .subscribe(async response => {
          if (response) {
            if (this.entity.user) {
              await this.userHistoryService.closeUserHistory(this.entity)
            }
            this.entity.user = user.getObject()
            const result = await this.userHistoryService.createUserHistory(this.entity)
            if (result) {
              const result = await this.service.save(this.entity)
              if (result.data) {
                if (!(this.entity.user instanceof MyUser)) {
                  this.entity.user = this.userService.getResource().mapToModel(this.entity.user)
                }
                this.userListForm.get('userTextBox').setValue(this.entity?.user.name)
                this.isCurrent = sessionStorage.getItem('id') == this.entity?.user?.userId
                this.fillUserHistories()
                this.toastr.success(DialogMessageEnum.ASSIGNTO_SUCCESS)
              }
              else {
                this.toastr.error(DialogMessageEnum.ASSIGNTO_ERROR)
              }
            }
            else {
              this.toastr.error("Kein User History konnte erstellt werden!")
            }
          }
        })
      this.ngxSpinner.hide()
    }
  }

  async popUser(): Promise<void> {
    if (this.entity.user) {
      this.ngxSpinner.show()
      this.dialogService.showConfirmDialog(DialogMessageEnum.CONFIRM_MESSAGE, DialogMessageEnum.CONFIRM_TITLE)
        .afterClosed()
        .subscribe(async response => {
          if (response) {
            this.entity.user = null
            const result = await this.service.save(this.entity)
            if (result.data) {
              const resultUserHistory = await this.userHistoryService.closeUserHistory(this.entity)
              this.toastr.success(DialogMessageEnum.REVOKE_SUCCESS)
              this.userListForm.get('userTextBox').setValue(null)
              if (!resultUserHistory) {
                this.toastr.error("Es wurde keine aktuelle Benutzerhistorie gefunden. Das kann zu Dateninkonsistenzen führen!")
              }
            }
            else {
              this.toastr.error(DialogMessageEnum.REVOKE_ERROR)
            }
          }
        })
      this.ngxSpinner.hide()
    }
  }

  filter(value: string): void {
    const filterValue = value.toLowerCase();
    this.filteredUsers = this.users.filter(user => user.name.toLowerCase().includes(filterValue));
  }

  generateQRCode(): void {
    this.pdfService.generatePdf(this.entity.id(), this.entity instanceof Device ? 'D' : 'P')
  }

  openHistoryDialog(): void {
    this.dialog.open(UserHistoryComponent, {
      data: this.entity,
      minWidth: '700px',
      height: '500px',
    })
  }

  openUploadDialog(): void {
    const dialogRef = this.dialog.open(ImageUploadComponent, {
      data: this.entity.images,
    });
    dialogRef.afterClosed().subscribe(imgData => {
      if (imgData) {
        this.entity.images = imgData;
        this.entity.user = this.entity.user?.getObject()
        const result = this.entity.save()
        if (result) {
          this.toastr.success(DialogMessageEnum.SAVE_SUCCESS)
        }
        else {
          this.toastr.error(DialogMessageEnum.SAVE_ERROR)
        }
      }
    });
  }
}