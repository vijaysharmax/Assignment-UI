import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CityserviceService {

   private apiUrl = 'https://localhost:44378/api/Cities';

  constructor(private http: HttpClient) {}

  getCitiesByState(stateId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/state/${stateId}`);
  }
}
