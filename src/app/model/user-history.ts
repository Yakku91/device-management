import { ParseBaseModel, ParseService, QueryOptions } from "@pagmf/parse";
import { MyUser } from "./user";
import { Device } from "./device";
import { Phone } from "./phone";
export class UserHistory extends ParseBaseModel<UserHistory> {
  public static MODEL = 'UserHistory'
  constructor(parseService: ParseService, note?: any) {

    super(UserHistory.MODEL, parseService)
    if (note) {
      this.parseObject = note
    } else {
      this.create()
    }
  }
  get userName(): string{
    return this.parseObject.get('userName')
  }
  set userName(userName: string){
    this.parseObject.set('userName', userName)
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
  get user(): MyUser {
    return this.parseObject.get('user')
  }
  set user(user: MyUser) {
    this.parseObject.set('user', user)
  }
  get start(): Date{
    return this.parseObject.get('start')
  }
  set start(start: Date){
    this.parseObject.set('start', start)
  }
  get end(): Date{
    return this.parseObject.get('end')
  }
  set end(end: Date){
    this.parseObject.set('end', end)
  }
}
