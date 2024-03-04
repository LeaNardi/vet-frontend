import { Injectable, inject } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';


@Injectable()
export class UserService {
    constructor(private auth: AuthenticationService) { }

    canActivate(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot,
      ): boolean {
        return this.auth.isLoggedIn()
    }
}



export const userGuard: CanActivateFn = (route, state) => {
    const router = inject(Router);
    if (inject(UserService).canActivate(route, state)){
        return true;
    }else{
        return router.parseUrl('/login');
    };
};
