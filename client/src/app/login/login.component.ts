import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { AlertService, AuthenticationService } from '../_services/index';

@Component({
    moduleId: module.id,
    templateUrl: 'login.component.html'
})

export class LoginComponent implements OnInit {
    model: any = {};
    loading = false;
    returnUrl: string;
    rememberMe = false;

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private authenticationService: AuthenticationService,
        private alertService: AlertService) { }

    ngOnInit() {
        // reset login status
        this.authenticationService.logout();

        // get return url from route parameters or default to '/'
        this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
    }

    login() {
        this.loading = true;
        this.authenticationService.login(this.model.username, this.model.password)
            .subscribe(
                data => {
                    console.log('login success:', data);
                    console.log('returnUrl:', this.returnUrl);
                    this.rememberMe = true;
                    if (this.rememberMe) {
                        if (data) {
                            // store user details and jwt token in local storage to keep user logged in between page refreshes
                            localStorage.setItem('currentUser', JSON.stringify(data.data));
                        }
                    }
                    this.router.navigate(['chat']);
                },
                error => {
                    console.log('login error:', error);
                    this.alertService.error(error.error.message);
                    this.loading = false;
                });
    }
}
