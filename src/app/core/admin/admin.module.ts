import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { UserFormComponent } from '../components/forms/user-form/user-form.component';
import { UserListComponent } from '../components/lists/user-list/user-list.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { DeviceFormComponent } from '../components/forms/device-form/device-form.component';
import { PhoneFormComponent } from '../components/forms/phone-form/phone-form.component';
import { ImageDetailComponent } from '../components/details/image-detail/image-detail.component';

const routes = [
  { path: 'users', component: UserListComponent },
  { path: 'user/add', component: UserFormComponent },
  { path: 'user/edit/:id', component: UserFormComponent },
  { path: 'phone/add', component: PhoneFormComponent },
  { path: 'device/add', component: DeviceFormComponent },

]

@NgModule({
  declarations: [
    UserFormComponent,
    UserListComponent,
    ImageDetailComponent
  ],
  imports: [
    CommonModule,
    MatPaginatorModule,
    MatTableModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes),
    MatIconModule,
    MatFormFieldModule, 
    MatButtonModule, 
    MatInputModule,
    MatSelectModule
  ],
  exports: [
    UserListComponent,
    UserFormComponent

  ]
})
export class AdminModule { }
