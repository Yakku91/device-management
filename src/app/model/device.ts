import { ParseService } from "@pagmf/parse";
import { PhoneDeviceBaseModel } from "./phone-device-base-model";

export class Device extends PhoneDeviceBaseModel<Device>{
  public static MODEL = 'Device'
  constructor(parseService: ParseService, entity?: any) {
    super(parseService, Device.MODEL, entity)
  }

  get location(): string {
    return this.parseObject.get('location')
  }
  get type(): string {
    return this.parseObject.get('type')
  }
  get neustaNumber(): string {
    return this.parseObject.get('neustaNumber')
  }
  get serialNumber(): string {
    return this.parseObject.get('serialNumber')
  }
  get airbusNumber(): string {
    return this.parseObject.get('airbusNumber')
  }
  set location(location: string) {
    this.parseObject.set('location', location)
  }
  set type(type: string) {
    this.parseObject.set('type', type)
  }
  set neustaNumber(neustaNumber: string) {
    this.parseObject.set('neustaNumber', neustaNumber)
  }
  set serialNumber(serialNumber: string) {
    this.parseObject.set('serialNumber', serialNumber)
  }
  set airbusNumber(airbusNumber: string) {
    this.parseObject.set('airbusNumber', airbusNumber)
  }
}
