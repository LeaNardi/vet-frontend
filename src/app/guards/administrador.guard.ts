import { Injectable, inject } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';

@Injectable()
export class PermissionsService {
    constructor(private auth: AuthenticationService) { }

    canActivate(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot,
      ): boolean {
        return this.auth.isAdmin()
    }
}


export const administradorGuard: CanActivateFn = (route, state) => {
    const router = inject(Router);
    if (inject(PermissionsService).canActivate(route, state)){
        return true
    }else{
        return router.parseUrl('/dashboard');
    };
};
