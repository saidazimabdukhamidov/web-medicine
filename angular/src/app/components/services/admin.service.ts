import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

const url = 'http://localhost:8084/api/v1/';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private http: HttpClient) {
  }

  addDoctor(data: object): any {
    return this.http.post(url + 'doctors', data);
  }

  addPatient(data: object): any {
    return this.http.post(url + 'patients', data);
  }

  getDoctorList(): any {
    return this.http.get(url + 'doctors');
  }

  getPatientList(): any {
    return this.http.get(url + 'patients');
  }

  getDoctor(id: number): any {
    return this.http.get(url + 'doctors/' + `${id}`);
  }

  updateDoctor(id: number, data: any): any {
    return this.http.put(url + 'doctors/' + `${id}`, data);
  }

  updatePatient(id: number, data: any): any {
    return this.http.put(url + 'patients/' + `${id}`, data);
  }

  deleteDoctor(id: number): any {
    return this.http.delete(url + 'doctors/' + `${id}`);
  }

  deletePatient(id: number): any {
    return this.http.delete(url + 'patients/' + `${id}`);
  }
}
