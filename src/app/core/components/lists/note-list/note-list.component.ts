import { Component, Input } from '@angular/core';
import { NoteFormComponent } from '../../forms/note-form/note-form.component';
import { MatDialog } from '@angular/material/dialog';
import { Note } from 'src/app/model/note';
import { Device } from 'src/app/model/device';
import isEqual from 'lodash/isEqual';
import { Phone } from 'src/app/model/phone';
import { MyUser } from 'src/app/model/user';
import { DialogService } from 'src/app/services/dialog.service';
import { NoteService } from 'src/app/services/note.service';
import { DialogMessageEnum } from 'src/app/shared/enums/dialog-messages-enum';
import { UserService } from 'src/app/services/user.service';
import { AuthorizationService } from 'src/app/services/authorization.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-note-list',
  templateUrl: './note-list.component.html',
  styleUrls: ['./note-list.component.scss']
})
export class NoteListComponent {
  @Input() notes: any[]
  @Input() entity: Device | Phone
  isAdmin: boolean = false
  isCurrentUserDeviceOwner: boolean = false

  constructor(
    private noteService: NoteService,
    public dialog: MatDialog,
    private dialogService: DialogService,
    private userService: UserService,
    private authorizationService: AuthorizationService,
    private toastr: ToastrService
  ) {  }

  async ngOnInit() {
    this.isAdmin = await this.authorizationService.isAdmin()
    if (this.entity?.user) {
      this.isCurrentUserDeviceOwner = isEqual(this.entity.user.id, sessionStorage.getItem("id"))
    }
  }

  mapToModel(user: MyUser): MyUser {
    return this.userService.getResource().mapToModel(user)
  }

  isCurrentEqualTheAuthor(authorId: string): boolean{
    return sessionStorage.getItem('id') == authorId
  }

  remove(note: Note): void {
    this.dialogService.showConfirmDialog(DialogMessageEnum.DELETE_MESSAGE_CONFIRM, DialogMessageEnum.CONFIRM_TITLE)
      .afterClosed()
      .subscribe(async response => {
        if (response) {
          const result = await this.noteService.remove(note)
          if (result.data) {
            this.notes.splice(this.notes.indexOf(note), 1)
            this.toastr.success(DialogMessageEnum.DELETE_SUCCESS)
          }
          else {
            this.toastr.error(DialogMessageEnum.DELETE_ERROR)
          }
        }
      })
  }

  openDialog(selectedNote?: Note) {
    this.dialog.open(NoteFormComponent, {
      data: [
        selectedNote,
        this.entity
      ],
      minWidth: '700px',
      minHeight: '350px',
    })
      .afterClosed()
      .subscribe(result => {
        if (!selectedNote && result instanceof Note) {
          this.notes.unshift(result)
        }
      })
  }
}
