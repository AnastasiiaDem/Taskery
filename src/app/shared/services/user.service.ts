import {Injectable} from '@angular/core';
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";

@Injectable()
export class UserService {

  usersUrl = 'http://localhost:2200/api/user';

  constructor(private http: HttpClient) {
  }

  getUsers(): Observable<any> {
    return this.http.get(this.usersUrl);
  }

  addUser(body: Object): Observable<any> {
    return this.http.post(`${this.usersUrl}/register`, body);
  }

  deleteUser(userId: number): Observable<any> {
    const url = `${this.usersUrl}/${userId}`;
    return this.http.delete(url);
  }
}
