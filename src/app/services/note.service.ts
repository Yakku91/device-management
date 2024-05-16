import { Injectable } from '@angular/core';
import { NoteResource } from '../resources/note.resource';
import { Note } from '../model/note';
import { BaseService } from './base.service';
import { FilterFactory, ParseHttpResponse, ParseHttpResponseList, QueryOptions } from '@pagmf/parse';
import { FilterService } from './filter.service';

@Injectable({
  providedIn: 'root'
})
export class NoteService extends BaseService<Note, NoteResource> {

  constructor(
    noteResource: NoteResource,
    private filterService: FilterService
  ) {
    super(noteResource)
  }

  async getByPhoneId(phoneId: string){
    const options: QueryOptions = this.resource.createQueryOptions()
    options.filters.push(this.filterService.getEqualToPointerFilter('Phone', 'phone', phoneId))
    const result: ParseHttpResponseList<Note> = await this.getAll(options)
    return result
  }

  async getByDeviceId(deviceId: string){
    const options: QueryOptions = this.resource.createQueryOptions()
    options.filters.push(this.filterService.getEqualToPointerFilter('Device', 'device', deviceId))
    const result: ParseHttpResponseList<Note> = await this.getAll(options)
    return result
  }

  // override async save(note: Note): Promise<ParseHttpResponse<boolean>> {
  //   let entity: Device | Phone
  //   if (note.device) {
  //     entity = note.device.getObject()
  //   }
  //   else if (note.phone) {
  //     entity = note.phone.getObject()
  //   }

  //   note.device?.fetch()
  //   note.phone?.fetch()
  //   const resultNote = await note.save({ cascadeSave: false } as QueryOptions)
  //   if (resultNote.data)
  //   {
  //     return entity
  //   }
  // }

  // async loadNotes(entity: Device | Phone): Promise<Note[]> {
  //   let mappedNotes: Note[] = []
  //   console.log(entity)
  //   if (entity) {
  //     try {
  //       const notes = await entity.loadNotes()
  //       if (notes) {
  //         mappedNotes = notes.map(note => this.resource.mapToModel(note))
  //       }
  //       if (notes.error) {
  //         this.toastr.error(notes.message)
  //       }
  //     } catch (error) {
  //       console.error('Error loading notes:', error)
  //     }
  //   } else {
  //     this.toastr.error('Notes cannot be loaded! Entity is null!')
  //   }
  //   return mappedNotes
  // }
}
