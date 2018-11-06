import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tokenNotExpired } from 'angular2-jwt';
import { Observable, of } from 'rxjs';

import { BaseHttpService } from './../baseHttpService.service';

@Injectable()
export class AuthService extends BaseHttpService {
  constructor(httpClient: HttpClient) {
    super(httpClient);
  }

  loggedIn() {
    return tokenNotExpired();
  }

  register(data): Observable<any> {
    return this.httpClient.post(this.origin + "register", data);
  }

  login(username, password) {
    return this.httpClient.post(this.origin + "login", { username, password });
  }

  logout(): Observable<any> {
    localStorage.clear();
    return of(!localStorage.getItem("token"));
  }

  getToken() {
    return localStorage.getItem("token") || "";
  }

  storeToken(token) {
    localStorage.setItem("token", token);
  }
}
