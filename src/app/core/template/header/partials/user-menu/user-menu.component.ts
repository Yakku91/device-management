import { Component, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ExcelImportComponent } from 'src/app/core/template/excel-import/excel-import.component';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { AuthorizationService } from 'src/app/services/authorization.service';

@Component({
  selector: 'app-user-menu',
  templateUrl: './user-menu.component.html',
  styleUrls: ['./user-menu.component.scss'],
})
export class UserMenuComponent {

  firstname: string;
  isAdmin = false;
  currentUserId: string;

  constructor(
    public authenticationService: AuthenticationService,
    private authorizationService: AuthorizationService,
    private router: Router,
    public dialog: MatDialog,
  ) { }

  async ngOnInit() {
    this.isAdmin = await this.authorizationService.isAdmin()
    this.firstname = sessionStorage.getItem("firstName")
    this.currentUserId = sessionStorage.getItem("id")
  }

  async logOut(): Promise<void> {
    sessionStorage.clear()
    this.authenticationService.logout();
    this.router.navigate(['/login']);
  }
  showImportDialog(): void {
    this.dialog.open(ExcelImportComponent)
  }
}
