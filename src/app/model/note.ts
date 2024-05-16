import { ParseBaseModel, ParseService } from "@pagmf/parse";
import { MyUser } from "./user";
import { Device } from "./device";
import { Phone } from "./phone";

export class Note extends ParseBaseModel<Note> {
  public static MODEL = 'Note'
  constructor(parseService: ParseService, note?: any) {

    super(Note.MODEL, parseService)
    if (note) {
      this.parseObject = note
    } else {
      this.create()
    }
  }
  get title(): string {
    return this.parseObject.get('title')
  }
  set title(title: string) {
    this.parseObject.set('title', title)
  }
  get note(): string {
    return this.parseObject.get('note')
  }
  set note(note: string) {
    this.parseObject.set('note', note)
  }
  get device(): Device {
    return this.parseObject.get('device')
  }
  set device(device: Device) {
    this.parseObject.set('device', device)
  }
  get phone(): Phone {
    return this.parseObject.get('phone')
  }
  set phone(phone: Phone) {
    this.parseObject.set('phone', phone)
  }
  get author(): MyUser {
    return this.parseObject.get('author')
  }
  set author(author: MyUser) {
    this.parseObject.set('author', author)
  }
}
