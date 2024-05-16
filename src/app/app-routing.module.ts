import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './core/login/login.component';
import { isAdmin, isAuthenticated } from './core/authentication/auth.guard';
import { UserFormComponent } from './core/components/forms/user-form/user-form.component';

const routes: Routes = [
  { path: '', canActivate: [isAuthenticated] , 
  loadChildren: () => import("./core/core.module").then(m => m.CoreModule) },
  { path: 'profile/edit/:id', component: UserFormComponent },
  { path: 'login', component: LoginComponent },
  { path: 'admin', canActivate: [isAuthenticated, isAdmin] , 
   loadChildren: () => import("./core/admin/admin.module").then(m => m.AdminModule)},
  
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
