import { Injectable } from '@angular/core';
import * as XLSX from 'xlsx'
import { DeviceService } from './device.service';
import { PhoneService } from './phone.service';
import { UserService } from './user.service';
import { Phone } from '../model/phone';
import { Device } from '../model/device';
import { ToastrService } from 'ngx-toastr';
import { NoteService } from './note.service';
import { Note } from '../model/note';
import { ParseHttpResponse } from '@pagmf/parse';


@Injectable({
  providedIn: 'root'
})
export class ExcelparserService {

  constructor(
    private deviceService: DeviceService,
    private phoneService: PhoneService,
    // private userService: UserService,
    private toastr: ToastrService,
    private noteService: NoteService
  ) { }

  async createItems(event: Event): Promise<void> {
    const target: HTMLInputElement = event.target as HTMLInputElement
    if (target.files !== null) {
      const file: File = target.files[0]
      const fileReader: FileReader = new FileReader()
      fileReader.readAsArrayBuffer(file)

      while (fileReader.readyState !== 2) {
        await new Promise(f => setTimeout(f, 1000))
      }

      const xlsData: XLSX.WorkBook = XLSX.read(fileReader.result)
      const items = Object.keys(xlsData.Sheets).map((name) => ({
        name,
        data: XLSX.utils.sheet_to_json(xlsData.Sheets[name]),
      }))
      for (const obj of items[0].data) {
        // let object: any = obj
        // if (object.Nutzer !== '') {
        //   await this.userService.createUserFromExcel(object.Nutzer)
        // }
        await this.createDeviceFromExcel(obj)
      }
      // for (const obj of items[1].data) {
      //   // let object: any = obj
      //   // if (object.Nutzer !== '') {
      //   //   await this.userService.createUserFromExcel(object.Nutzer)
      //   // }
      //   await this.createDeviceFromExcel(obj)
      // }
      for (const obj of items[2].data) {
        // let object: any = obj
        // if (object.Nutzer !== '') {
        //   await this.userService.createUserFromExcel(object.Nutzer)
        // }
        await this.createDeviceFromExcel2(obj)
      }
      for (const obj of items[4].data) {
        // let object: any = obj
        // if (object.Nutzer !== '') {
        //   await this.userService.createUserFromExcel(object.Nutzer)
        // }
        await this.createPhoneFromExcel(obj)
      }
    }
  }


  async createPhoneFromExcel(obj: any): Promise<void> {
    const phone: Phone = this.phoneService.getResource().create()
    phone.name = obj["Gerät"] ?? ''
    phone.tariff = obj.Tarif ?? ''
    phone.simNumber = obj["SIM-Nr."] ?? ''
    phone.phoneNumber = obj.Rufnummer ?? ''
    phone.imei = obj["IMEI des Geräts"] ?? ''
    // if (obj["Läuft seit"] && typeof obj["Läuft seit"] === 'number') {
      phone.contractStart = this.ExcelDateToJSDate(obj["Läuft seit"])
    // } 
    // if (obj.Subventionsende && typeof obj.Subventionsende === 'number') {
      phone.subsidyEnd = this.ExcelDateToJSDate(obj["Subvention bis"])
    // }
    const responsePhone: ParseHttpResponse<boolean> = await phone.save()
    if (responsePhone) {
      this.toastr.success('Handy wurde hinzugefügt')
      if (obj.Bemerkung) {
        let note: Note = this.noteService.getResource().create()
        note.title = 'Bemerkung'
        note.note = (obj.Bemerkung ?? '') as string
        note.phone = phone.getObject()
        const response: ParseHttpResponse<boolean> = await note.save()
        if (response && response.data) {
          this.toastr.success('Eine Anmerkung wurde hinzugefügt');
        } else if (response && response.error) {
          this.toastr.error(response.message);
          console.log(response.error)
        } else {
          this.toastr.error('Anmerkung konnte nicht gespeichert werden!');
        }
      }
    }
    else if (responsePhone.error) {
      this.toastr.error(responsePhone.message)
      console.log(responsePhone.error)
    }
    else{
      this.toastr.error('Handy konnte nicht gespeichert werden!')
    }
  }

  async createDeviceFromExcel2(obj: any): Promise<void> {
    let device: Device = this.deviceService.getResource().create()
    device.name = obj["Hersteller/Gerät"] ?? ''
    device.type = obj.Typ ?? ''
    device.serialNumber = (obj["Serial No. (S/N)"] ?? '') as string
    device.neustaNumber = (obj["Device No.\r\nneusta"] ?? '') as string
    device.airbusNumber = (obj["Device Airbus No."] ?? '') as string
    device.location = (obj.Ort ?? '') as string
    const responseDevice = await device.save()
    if (responseDevice) {
      this.toastr.success('Ein Gerät wurde hinzugefügt!')
      if (obj.Bemerkung) {
        let note: Note = this.noteService.getResource().create()
        note.title = 'Bemerkung'
        note.note = (obj.Bemerkung ?? '') as string
        note.device = device.getObject()
        console.log(note)
        const response: ParseHttpResponse<boolean> = await note.save()
        if (response && response.data) {
          this.toastr.success('Eine Anmerkung wurde hinzugefügt');
        } else if (response && response.error) {
          this.toastr.error(response.message);
          console.log(response.error)
        } else {
          this.toastr.error('Anmerkung konnte nicht gespeichert werden!');
        }
      }
    }
    else if (responseDevice.error) {
      this.toastr.error(responseDevice.message)
    }
    else {
      this.toastr.error('Gerät konnte nicht gespeichert werden!')
    }
  }

  async createDeviceFromExcel(obj: any): Promise<void> {
    let device: Device = this.deviceService.getResource().create()
    device.name = obj["Gerät"] ?? ''
    device.type = obj.Typ ?? ''
    device.serialNumber = (obj["S/N"] ?? '') as string
    device.neustaNumber = (obj.Neustanummer ?? '') as string
    device.airbusNumber = (obj["Airbus Nummer"] ?? '') as string
    device.location = (obj.Ort ?? '') as string
    const responseDevice = await device.save()
    if (responseDevice) {
      this.toastr.success('Ein Gerät wurde hinzugefügt!')
      if (obj.Bemerkung) {
        let note: Note = this.noteService.getResource().create()
        note.title = 'Bemerkung'
        note.note = (obj.Bemerkung ?? '') as string
        note.device = device.getObject()
        console.log(note)
        const response: ParseHttpResponse<boolean> = await note.save()
        if (response && response.data) {
          this.toastr.success('Eine Anmerkung wurde hinzugefügt');
        } else if (response && response.error) {
          this.toastr.error(response.message);
          console.log(response.error)
        } else {
          this.toastr.error('Anmerkung konnte nicht gespeichert werden!');
        }
      }
    }
    else if (responseDevice.error) {
      this.toastr.error(responseDevice.message)
    }
    else {
      this.toastr.error('Gerät konnte nicht gespeichert werden!')
    }
  }

  ExcelDateToJSDate(excelDateSerial: number): Date {
    const DAYS_DIFFERENCE: number = 25569
    const DAYS_TO_MILLISECONDS: number = 86400000
    const utc_days: number = Math.floor(excelDateSerial - DAYS_DIFFERENCE)
    const utc_value: number = utc_days * DAYS_TO_MILLISECONDS
    return new Date(utc_value)
  }
}
