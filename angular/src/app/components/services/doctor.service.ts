import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

const url = 'http://localhost:8084/api/v1/';

@Injectable({
  providedIn: 'root'
})
export class DoctorService {

  constructor(private http: HttpClient) {
  }

  addMedHistory(data: Object): any {
    return this.http.post(url + 'histories', data);
  }

  getPatientList(): any {
    return this.http.get(url + 'patients');
  }

  getPatient(id: number): any {
    return this.http.get(url + 'patients/' + `${id}`);
  }
}
