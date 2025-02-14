import { Component } from '@angular/core';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

  constructor(private authenticationService: AuthenticationService) {}

  isUserLoggedIn(): boolean {
    return this.authenticationService.isAuthenticated();
  }
}
