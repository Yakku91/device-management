import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Phone } from 'src/app/model/phone';
import { PhoneService } from 'src/app/services/phone.service';
import { MatDialog } from '@angular/material/dialog';
import { FilterService } from 'src/app/services/filter.service';
import { AuthorizationService } from 'src/app/services/authorization.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { FormGroup } from '@angular/forms';
import { FormvalidatorService } from 'src/app/services/formvalidator.service';

@Component({
  selector: 'app-phone-list',
  templateUrl: './phone-list.component.html',
  styleUrls: ['./phone-list.component.scss']
})
export class PhoneListComponent {
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  dataSource: MatTableDataSource<Phone>;
  displayedColumns: string[] = ['name', 'tariff', 'user', 'details'];
  isAdmin: boolean
  searchForm: FormGroup

  constructor(
    private phoneService: PhoneService,
    public dialog: MatDialog,
    private filterService: FilterService,
    private authorizationService: AuthorizationService,
    private ngxSpinner: NgxSpinnerService,
    private toastr: ToastrService,
    private formValidatorService: FormvalidatorService
  ) {
    this.searchForm = this.formValidatorService.searchForm
  }

  async ngOnInit() {
    this.ngxSpinner.show()
    this.dataSource = new MatTableDataSource<Phone>(await this.getAll())
    this.dataSource.paginator = this.paginator
    this.dataSource.sort = this.sort
    if (await this.authorizationService.isAdmin()) {
      this.displayedColumns.splice(3, 0, 'deletedAt');
      this.displayedColumns.push('edit')
    }
    if (sessionStorage.getItem("searchFieldPhone") != "null") {
      this.searchForm.get("searchField").setValue(sessionStorage.getItem("searchFieldPhone"))
      this.applyFilter()
    }
    this.ngxSpinner.hide()
  }

  async getAll(): Promise<Phone[]> {
    let queryOption = null
    if (!await this.authorizationService.isAdmin()) {
      queryOption = this.phoneService.getResource().createQueryOptions()
      queryOption.filters.push(this.filterService.getOnlyAvailableFilter())
      queryOption.filters.push(this.filterService.withoutDeletedEntitiesFilter())
    }
    const result = (await this.phoneService.getAll(queryOption))
    if (result.data) {
      return result.data
    }
    else {
      this.toastr.error("Handys konnten nicht geladen werden!")
    }
  }

  ngOnDestroy() {
    sessionStorage.setItem("searchFieldPhone", this.searchForm.get("searchField").value)
  }

  applyFilter() {
    const filterValue = this.searchForm.get("searchField").value?.trim().toLowerCase()
    this.dataSource.filterPredicate = (data: Phone, filter: string) => {
      return data.name.toLowerCase().includes(filter) ||
        data.user?.name?.toLowerCase().includes(filter) ||
        data.user?.username?.toLowerCase().includes(filter) ||
        data.imei.toLocaleLowerCase().includes(filter) ||
        data.phoneNumber.toLocaleLowerCase().includes(filter)
    }
    this.dataSource.filter = filterValue
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
