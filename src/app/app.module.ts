import { ErrorHandler, LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';
import { CoreModule } from './core/core.module';
import { UserService } from './services/user.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ParseBuilder, ParseService } from '@pagmf/parse';
import * as Parse from 'parse';
import { MyUserResource } from './resources/user.resource';
import { AuthenticationService } from './services/authentication.service';
import { AuthorizationService } from './services/authorization.service';
import { PermissionRoleResource } from '@pagmf/security';
import { MatDialog, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { FormsModule } from '@angular/forms';
import { registerLocaleData } from '@angular/common';
import localeDe from '@angular/common/locales/de';
import { NgxSpinnerModule } from 'ngx-spinner';
import { ExcelImportComponent } from './core/template/excel-import/excel-import.component';
import { InjectionToken } from '@angular/core';
import { CustomErrorHandler } from './services/custom-error-handler.service';

export const MAT_MDC_DIALOG_DATA = new InjectionToken<any>('MatMdcDialogData');

registerLocaleData(localeDe);
const myService: ParseService = new ParseBuilder(Parse)
    .setApplicationId(parseServerConnection.applicationId)
    .setJavaScriptKey(parseServerConnection.javaScriptKey)
    .setServerUrl('https://parseapi.back4app.com')
    .build()


@NgModule({
    declarations: [
        AppComponent,
        ExcelImportComponent,
    ],
    providers: [
        { provide: LOCALE_ID, useValue: 'de' },
        { provide: ParseService, useValue: myService },
        { provide: 'ParseInjector', useValue: myService },
        // { provide: ErrorHandler, useValue: CustomErrorHandler },
        { provide: PermissionRoleResource, useClass: PermissionRoleResource, deps: [ParseService] },
        {
            provide: MatDialogRef,
            useValue: {}
        },
        { provide: MAT_MDC_DIALOG_DATA, useValue: {} },
        UserService,
        MyUserResource,
        ToastrService,
        CustomErrorHandler,
        AuthenticationService,
        AuthorizationService,
        MatDialog
    ],
    bootstrap: [AppComponent],
    imports: [
        BrowserModule,
        FormsModule,
        AppRoutingModule,
        RouterModule,
        CoreModule,
        BrowserAnimationsModule,
        MatButtonModule,
        MatDialogModule,
        ToastrModule.forRoot(),
        NgxSpinnerModule

    ]
})
export class AppModule { }
