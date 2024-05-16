import { Component, ViewChild } from '@angular/core';
import { DialogMessageEnum } from 'src/app/shared/enums/dialog-messages-enum';
import { MyUser } from 'src/app/model/user';
import { DialogService } from 'src/app/services/dialog.service';
import { UserService } from 'src/app/services/user.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { User } from "@pagmf/security"


@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})

export class UserListComponent {
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  dataSource: MatTableDataSource<MyUser>;
  displayedColumns: string[] = ['name', 'userName', 'edit', 'delete'];
  users: MyUser[]
  
  constructor(
    private userService: UserService,
    private dialogService: DialogService,
    private ngxSpinner: NgxSpinnerService,
    private toastr: ToastrService
  ) { }
  async ngOnInit() {
    this.ngxSpinner.show()
    this.users = await this.getUsers()
    this.fillTable(this.users)
    this.ngxSpinner.hide()
  }

  async getUsers(): Promise<MyUser[]> {
    return (await this.userService.getAll()).data
  }

  fillTable(users: MyUser[]): void {
    this.dataSource = new MatTableDataSource<MyUser>(users)
  }

  remove(user: MyUser): void {
    this.dialogService.showConfirmDialog(DialogMessageEnum.DELETE_USER_CONFIRM, DialogMessageEnum.CONFIRM_TITLE)
      .afterClosed()
      .subscribe(async response => {
        if (response) {
          const result = await this.userService.remove(user)
          if(result?.data){
             this.users.splice(this.users.indexOf(user), 1)
            this.fillTable(this.users)
            this.toastr.success(DialogMessageEnum.DELETE_SUCCESS)
          }
        }
      })
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value.trim().toLowerCase()
    this.dataSource.filterPredicate = (data: MyUser, filter: string) => {
      return data.name.toLowerCase().includes(filter);
    }
    this.dataSource.filter = filterValue
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
