import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { User } from '../_models/index';
const baseUrl = 'http://localhost:7777';

@Injectable()
export class UserService {
    constructor(private http: HttpClient) { }

    getAll() {
        return this.http.get<User[]>(baseUrl + '/api/users');
    }

    getById(id: number) {
        return this.http.get(baseUrl + '/api/users/' + id);
    }

    create(user: User) {
        console.log('create user:', user);
        return this.http.post(baseUrl + '/user/register', user);
    }

    changepwd(oldpwd: string, newpwd: string) {
        console.log('change pwd model:', JSON.stringify({oldpwd, newpwd}));
        return this.http.post('http://192.168.0.27:8080/changepwd', JSON.stringify({oldpwd, newpwd}));
    }

    update(user: User) {
        return this.http.put(baseUrl + '/api/users/' + user.id, user);
    }

    delete(id: number) {
        return this.http.delete(baseUrl + '/api/users/' + id);
    }
}