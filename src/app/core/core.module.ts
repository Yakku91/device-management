import { Component, NgModule, importProvidersFrom } from '@angular/core';
import { AsyncPipe, CommonModule } from '@angular/common';
import { HomeComponent } from './components/home/home.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { SignInComponent } from './login/partials/sign-in/sign-in.component';
import { ResetPasswordComponent } from './login/partials/reset-password/reset-password.component';
import { AdminModule } from './admin/admin.module';
import { MatTabsModule } from '@angular/material/tabs';
import { PhoneListComponent } from './components/lists/phone-list/phone-list.component';
import { DeviceListComponent } from './components/lists/device-list/device-list.component';
import { PhoneDetailsComponent } from './components/details/phone-details/phone-details.component';
import { DeviceDetailsComponent } from './components/details/device-details/device-details.component';
import { MatSortModule } from '@angular/material/sort';
import { MatDialogModule } from '@angular/material/dialog';
import { DeviceFormComponent } from './components/forms/device-form/device-form.component';
import { MatListModule } from '@angular/material/list';
import { PhoneFormComponent } from './components/forms/phone-form/phone-form.component';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { NoteListComponent } from './components/lists/note-list/note-list.component';
import { NoteFormComponent } from './components/forms/note-form/note-form.component';
import { UserMenuComponent } from './template/header/partials/user-menu/user-menu.component';
import { HeaderComponent } from './template/header/header/header.component';
import { MatMenuModule } from '@angular/material/menu';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { UserHistoryComponent } from './components/lists/user-history-list/user-history.component';
import { ConfirmDialogBoxComponent } from '../shared/dialogs/confirm-dialog-box/confirm-dialog-box.component';
import { UserFormComponent } from './components/forms/user-form/user-form.component';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { DetailComponent } from './components/details/detail/detail.component';
import { ImageUploadComponent } from './components/forms/image-upload-form/image-upload.component';
import { ImageListComponent } from './components/lists/image-list/image-list.component';
import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { LazyLoadImageModule } from 'ng-lazyload-image';




const routes = [
  { path: '', component: HomeComponent },
  { path: 'phones', component: PhoneListComponent },
  { path: 'phone/details/:id', component: DetailComponent },
  { path: 'phone/edit/:id', component: PhoneFormComponent },
  { path: 'devices', component: DeviceListComponent },
  { path: 'device/details/:id', component: DetailComponent },
  { path: 'device/edit/:id', component: DeviceFormComponent },
  { path: 'edit', component: UserFormComponent },
  { path: 'device/user-history/:id', component: UserHistoryComponent },
  { path: 'phone/user-history/:id', component: UserHistoryComponent },

]

@NgModule({
  declarations: [
    HomeComponent,
    ConfirmDialogBoxComponent,
    LoginComponent,
    SignInComponent,
    ResetPasswordComponent,
    PhoneListComponent,
    PhoneDetailsComponent,
    DeviceListComponent,
    DeviceDetailsComponent,
    DeviceFormComponent,
    PhoneFormComponent,
    NoteListComponent,
    NoteFormComponent,
    UserMenuComponent,
    HeaderComponent,
    DetailComponent,
    ImageUploadComponent,
    UserHistoryComponent,
    ImageListComponent

  ],

  imports: [
    FormsModule,
    CommonModule,
    AdminModule,
    RouterModule.forChild(routes),
    MatPaginatorModule,
    MatTableModule,
    MatIconModule,
    MatInputModule,
    MatSelectModule,
    MatTabsModule,
    ReactiveFormsModule,
    MatSortModule,
    MatDialogModule,
    MatListModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatMenuModule,
    MatSlideToggleModule,
    MatTooltipModule,
    AsyncPipe,
    MatAutocompleteModule,
    MatCardModule,
    MatGridListModule,
    MatFormFieldModule,
    MatButtonModule,
    MatCheckboxModule,
    LazyLoadImageModule

  ],
  providers: [
    importProvidersFrom([
      LazyLoadImageModule,
    ])
  ],
  exports: [
    HomeComponent,
    LoginComponent,
    HeaderComponent,
  ]
})
export class CoreModule { }
