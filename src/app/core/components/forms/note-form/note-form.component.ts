import { Component, Inject } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { Device } from 'src/app/model/device';
import { Note } from 'src/app/model/note';
import { Phone } from 'src/app/model/phone';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { FormvalidatorService } from 'src/app/services/formvalidator.service';
import { NoteService } from 'src/app/services/note.service';
import { DialogMessageEnum } from 'src/app/shared/enums/dialog-messages-enum';

@Component({
  selector: 'app-note-form',
  templateUrl: './note-form.component.html',
  styleUrls: ['./note-form.component.scss']
})
export class NoteFormComponent {
  note: Note
  pageTitle: string = "Anmerkung hinzufügen"
  noteForm: FormGroup

  constructor(
    public dialogRef: MatDialogRef<NoteFormComponent>,
    @Inject(MAT_DIALOG_DATA) private data: Phone | Device | Note,
    private noteService: NoteService,
    private formService: FormvalidatorService,
    private authenticationService: AuthenticationService,
    private toastr: ToastrService,

  ) {
    this.noteForm = this.formService.noteForm
  }

  async ngOnInit() {
    if (!this.data[0]) {
      this.note = this.noteService.getResource().create()
    }
    else {
      this.note = this.data[0]
      this.pageTitle = "Anmerkung ändern"
      this.noteForm.get("title").setValue(this.note.title)
      this.noteForm.get("note").setValue(this.note.note)
    }
  }

  async save(): Promise<void> {
    let entity = this.data[1]
    entity instanceof Device ? this.note.device = entity.getObject() : this.note.phone = entity.getObject()
    this.note.author = await this.authenticationService.current().getObject()
    this.note.title = this.noteForm.get("title").value
    this.note.note = this.noteForm.get("note").value
    const response = (await this.noteService.save(this.note))
    if (response) {
      this.toastr.success(DialogMessageEnum.SAVE_SUCCESS)
    }
    else {
      this.toastr.error(DialogMessageEnum.SAVE_ERROR)
      this.toastr.error(response.message)
    }
    this.noteForm.reset()
    this.dialogRef.close(this.note)
  }

  onNoClick(): void {
    this.note = null
    this.dialogRef.close()
  }

}