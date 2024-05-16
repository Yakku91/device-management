import { Inject, Injectable } from '@angular/core';
import { ParseBaseResource, ParseInjector, ParseService } from '@pagmf/parse';
import { Note } from '../model/note';

@Injectable({
  providedIn: 'root'
})
export class NoteResource extends ParseBaseResource<Note> {


  mapToModel(parseModel: any): Note {
    return new Note(this.parseService, parseModel);
  }

  constructor(@Inject(ParseService) parseService: ParseInjector) {
    super(Note.MODEL, parseService);
  }

  create(): Note { 
    const note: Note = new Note(this.parseService)
    // note.getACL().setRoleReadAccess('admin', true)
    // note.getACL().setRoleWriteAccess('admin', true)
    note.getACL().setPublicReadAccess(true)
    note.getACL().setPublicWriteAccess(true)
    return note
  }

}
