import { Injectable, inject } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateFn, RouterStateSnapshot } from '@angular/router';
import { AuthenticationService } from './services/authentication.service';

@Injectable()
export class PermissionsService {
    constructor(private auth: AuthenticationService) { }

    canActivate(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot,
      ): boolean {
        console.log("canActivate: ", this.auth.isAdmin());
        return this.auth.isAdmin()
    }
}


export const administradorGuard: CanActivateFn = (route, state) => {
    return inject(PermissionsService).canActivate(route, state);
};
