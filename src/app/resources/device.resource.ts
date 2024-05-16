import { Inject, Injectable } from '@angular/core';
import { ParseBaseResource, ParseInjector, ParseService } from '@pagmf/parse';
import { Device } from '../model/device';

@Injectable({
  providedIn: 'root'
})
export class DeviceResource extends ParseBaseResource<Device> {

  devices: string[] = [
    'Monitor',
    'Docking Station',
    'Laptop',
    'PC',
    'Portreplikator',
    'Headset',
    'Advanced Ergonomic Mouse',
    'Mouse/wired',
    'Laptop, Netzteil',
    'Netzleitung CEE 7/7 90 Grad',
    'Lifebook E736 / E556',
    'Laptoptasche',
    'Tastatur',
    'Timer',
    'Handyhülle',
    'Adapter',
    'Telefon'
  ]
  mapToModel(parseModel: any): Device {
    return new Device(this.parseService, parseModel);
  }

  constructor(@Inject(ParseService) parseService: ParseInjector) {
    super(Device.MODEL, parseService);
  }
  getDeviceTypes(): string[] {
    return this.devices;
  }

  create(): Device { 
    const device: Device = new Device(this.parseService)
    // device.getACL().setRoleReadAccess('admin', true)
    // device.getACL().setRoleWriteAccess('admin', true)
    device.getACL().setPublicReadAccess(true)
    device.getACL().setPublicWriteAccess(true)
    return device
  }

}
