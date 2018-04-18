import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map'
import { User } from '../_models';

const baseUrl = 'http://localhost:7777';

@Injectable()
export class AuthenticationService {
    private loggedIn = false;
    private currentUser : User;

    constructor(private http: HttpClient) { }

    get isLoggedIn() {
        return this.loggedIn;
    }

    get getCurrentUser() {
        return this.currentUser;
    }

    login(email: string, password: string) {
        return this.http.post<any>(baseUrl + '/user/login', { email: email, password: password })
            .map(user => {
                console.log('map user:', user);
                this.loggedIn = true;
                this.currentUser = user.data;
                return user;
            });
    }

    logout() {
        // remove user from local storage to log user out
        localStorage.removeItem('currentUser');
    }
}