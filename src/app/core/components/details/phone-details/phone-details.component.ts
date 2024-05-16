import { Component, Input } from '@angular/core';
import { Phone } from 'src/app/model/phone';

@Component({
  selector: 'app-phone-details',
  templateUrl: './phone-details.component.html',
  styleUrls: ['./phone-details.component.scss']
})
export class PhoneDetailsComponent {
  @Input() phone: Phone
}