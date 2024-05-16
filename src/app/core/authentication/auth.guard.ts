import { Injectable, inject } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { AuthenticationService } from "src/app/services/authentication.service";
import { AuthorizationService } from "src/app/services/authorization.service";

@Injectable({
  providedIn: 'root'
})
export class AuthGuard {

  constructor(
    private authenticationService: AuthenticationService,
    private authorizationService: AuthorizationService,
    private router: Router
  ) { }

  async isAuthenticated(): Promise<boolean | UrlTree> {
    if (!this.authenticationService.isAuthenticated()) {
      this.router.navigate(['/login']);
      return this.router.createUrlTree(['/notauth']);
    } else {
      return true;
    }
  }
  async isAdmin(): Promise<boolean | UrlTree> {
    if (!(await this.authorizationService.isAdmin())) {
      return this.router.createUrlTree(['..']);
    } else {
      return true;
    }
  }
};

export const isAuthenticated: CanActivateFn = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
  return inject(AuthGuard).isAuthenticated();
};

export const isAdmin: CanActivateFn = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
  return inject(AuthGuard).isAdmin();
};