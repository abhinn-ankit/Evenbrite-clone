import { Injectable } from '@angular/core';
import { UserAccount } from '../models/userAccount';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Injectable()
export class UserAccountService {
  user: UserAccount;

  constructor(
    private http: HttpClient
  ) {
  }

  url = 'http://localhost:3000/user';

  signUp(user: UserAccount) {
    const body = JSON.stringify(user);
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post(this.url, body, { headers: headers })
      .pipe(map(result => {
        console.log(result);
        return user;
      }), catchError(error => throwError(error.error)));
  }

  signIn(user: UserAccount) {
    const body = JSON.stringify(user);
    const signin = '/signin';
    const headers = new HttpHeaders({'Content-Type': 'application/json'});
    return this.http.post(`${this.url}${signin}`, body, {headers: headers})
      .pipe(catchError(error => throwError(error.error)));
  }

  getCurrentUser() {
    const token = localStorage.getItem('token') ? '?token=' + localStorage.getItem('token') : '';
    return this.http.get<UserResponse>(`${this.url}/getUser` + token)
      .pipe(map(data => {
        localStorage.setItem('user', JSON.stringify(data.obj));
        this.user = data.obj;
        return data.obj;
      }), catchError(error => {
        console.error(error.error);
        return throwError(error.error);
      }));
  }

  logOut() {
    localStorage.clear();
  }

  isLoggedIn() {
    return localStorage.getItem('token') !== null;
  }

}

interface UserResponse {
  message: string;
  obj: UserAccount;
  userId: string;
}
