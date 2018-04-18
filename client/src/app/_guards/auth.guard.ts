import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthenticationService } from '../_services/index';

@Injectable()
export class AuthGuard implements CanActivate {

    constructor(private router: Router, private authService: AuthenticationService) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        console.log('state.url:', state.url);
        console.log('isLoggedIn:', this.authService.isLoggedIn);
        if (localStorage.getItem('currentUser') || this.authService.isLoggedIn) {
            // logged in so return true
            console.log('== remember user ==', localStorage.getItem('currentUser'));
            return true;
        }

        // not logged in so redirect to login page with the return url
        this.router.navigate(['login']);
        return false;
    }
}