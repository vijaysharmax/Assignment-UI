import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../Models/user';

@Injectable({
  providedIn: 'root'
})
export class UserserviceService {

 private apiUrl = 'http://localhost:44378/api/Users';

  constructor(private http: HttpClient) {}

  createUser(user: User): Observable<any> {
    debugger;
    return this.http.post(this.apiUrl, user);
  }

  getUsers(search: string = ''): Observable<any> {
    return this.http.get(`${this.apiUrl}?search=${search}`);
  }
}
