import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { AlertService, UserService } from '../_services/index';

@Component({
    moduleId: module.id,
    templateUrl: 'changepwd.html'
})

export class ChangePwdComponent {
    model: any = {};
    loading = false;
    public barLabel: string = "Password strength:";
    public myColors = ['#DD2C00', '#FF6D00', '#FFD600', '#AEEA00', '#00C853'];

    constructor(
        private router: Router,
        private userService: UserService,
        private alertService: AlertService) { }

    changepwd() {
        this.loading = true;
        this.userService.changepwd(this.model.opassword, this.model.password)
            .subscribe(
                data => {
                    this.alertService.success('Password changed successfully', true);
                    this.router.navigate(['login']);
                },
                error => {
                    console.log('register error:', error);
                    this.alertService.error(error.error.error);
                    this.loading = false;
                });
    }
}
