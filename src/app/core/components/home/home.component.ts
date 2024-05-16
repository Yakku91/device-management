import { Component } from '@angular/core';
import { Device } from 'src/app/model/device';
import { Phone } from 'src/app/model/phone';
import { UserHistory } from 'src/app/model/user-history';
import { DeviceService } from 'src/app/services/device.service';
import { PhoneService } from 'src/app/services/phone.service';
import { UserHistoryService } from 'src/app/services/user-history.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  myDevices: Device[] = []
  myPhones: Phone[]
  userHistories: UserHistory[]

  constructor(
    private phoneService: PhoneService,
    private deviceService: DeviceService,
    private userHistoryService: UserHistoryService,
  ) { }

  async ngOnInit() {
    this.myDevices = (await this.deviceService.getByUserId(sessionStorage.getItem('id'))).data
    this.myPhones = (await this.phoneService.getByUserId(sessionStorage.getItem('id'))).data
    this.userHistories = await this.userHistoryService.getByUserId(sessionStorage.getItem('id'))
  }
}