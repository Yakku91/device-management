import { ParseService } from "@pagmf/parse";
import { PhoneDeviceBaseModel } from "./phone-device-base-model";

export class Phone extends PhoneDeviceBaseModel<Phone>{
  public static MODEL = 'Phone'
  constructor(parseService: ParseService, entity?: any) {
    super(parseService, Phone.MODEL, entity)
  }
  
  get tariff(): string {
    return this.parseObject.get('tariff')
  }
  get simNumber(): string {
    return this.parseObject.get('simNumber')
  }
  get contractStart(): Date {
    return this.parseObject.get('contractStart')
  }
  get subsidyEnd(): Date {
    return this.parseObject.get('subsidyEnd')
  }
  get imei(): string {
    return this.parseObject.get('imei')
  }
  get phoneNumber(): string {
    return this.parseObject.get('phoneNumber')
  }
  set tariff(tariff: string) {
    this.parseObject.set('tariff', tariff)
  }
  set simNumber(simNumber: string) {
    this.parseObject.set('simNumber', simNumber)
  }
  set subsidyEnd(subsidyEnd: Date) {
    this.parseObject.set('subsidyEnd', subsidyEnd)
  }
  set imei(imei: string) {
    this.parseObject.set('imei', imei)
  }
  set phoneNumber(phonenumber: string) {
    this.parseObject.set('phoneNumber', phonenumber)
  }
  set contractStart(contractStart: Date) {
    this.parseObject.set('contractStart', contractStart)
  }
}