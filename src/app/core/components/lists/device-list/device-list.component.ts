import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Device } from 'src/app/model/device';
import { DeviceService } from 'src/app/services/device.service';
import { MatDialog } from '@angular/material/dialog';
import { FilterService } from 'src/app/services/filter.service';
import { AuthorizationService } from 'src/app/services/authorization.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { FormGroup } from '@angular/forms';
import { FormvalidatorService } from 'src/app/services/formvalidator.service';

@Component({
  selector: 'app-device-list',
  templateUrl: './device-list.component.html',
  styleUrls: ['./device-list.component.scss']
})
export class DeviceListComponent {
  dataSource: MatTableDataSource<Device>;
  displayedColumns: string[] = ['name', 'type', 'user', 'location', 'details'];
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  isAdmin: boolean
  searchForm: FormGroup

  constructor(
    private deviceService: DeviceService,
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
    this.dataSource = new MatTableDataSource<Device>(await this.getAll())
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort
    if (await this.authorizationService.isAdmin()) {
      this.displayedColumns.splice(4, 0, 'deletedAt');
      this.displayedColumns.push('edit')
    }
    if (sessionStorage.getItem("searchFieldDevice") != "null") {
      this.searchForm.get("searchField").setValue(sessionStorage.getItem("searchFieldDevice"))
      this.applyFilter()
    }
    this.ngxSpinner.hide()
  }

  async getAll(): Promise<Device[]> {
    let queryOption = null

    if (!(await this.authorizationService.isAdmin())) {
      queryOption = this.deviceService.getResource().createQueryOptions()
      queryOption.filters.push(this.filterService.getOnlyAvailableFilter())
      queryOption.filters.push(this.filterService.withoutDeletedEntitiesFilter())
    }
    const result = await this.deviceService.getAll(queryOption)
    if (result.data) {
      return result.data
    }
    else {
      this.toastr.error("Geräte konnten nicht geladen werden!")
    }
  }

  ngOnDestroy() {
    sessionStorage.setItem("searchFieldDevice", this.searchForm.get("searchField").value)
  }

  applyFilter() {
    const filterValue = this.searchForm.get("searchField").value?.trim().toLowerCase()
    this.dataSource.filterPredicate = (data: Device, filter: string) => {
      return data.name?.toLowerCase().includes(filter) ||
        data.user?.name?.toLowerCase().includes(filter) ||
        data.serialNumber?.toLowerCase().includes(filter) ||
        data.airbusNumber?.toLowerCase().includes(filter) ||
        data.user?.name?.toLowerCase().includes(filter) ||
        data.type?.toLowerCase().includes(filter)

    }
    this.dataSource.filter = filterValue
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
