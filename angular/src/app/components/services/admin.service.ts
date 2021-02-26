import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

const url = 'http://localhost:8084/api/v1/';


@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private http: HttpClient) {
  }

  addDoctor(doctor: object): Observable<object> {
    return this.http.post(url + 'doctors', doctor);
  }

  addPatient(patient: object): Observable<object> {
    return this.http.post(url + 'patients', patient);
  }

  getDoctorList(): Observable<any> {
    return this.http.get(url + 'doctors');
  }

  getPatientList(): Observable<any> {
    return this.http.get(url + 'patients');
  }

  getDoctor(id: number): Observable<any> {
    return this.http.get(url + 'doctors/' + `${id}`);
  }

  updateDoctor(id: number, value: any): Observable<object> {
    return this.http.put(url + 'doctors/' + `${id}`, value);
  }

  updatePatient(id: number, value: any): Observable<object> {
    return this.http.put(url + 'patients/' + `${id}`, value);
  }

  deleteDoctor(id: number): Observable<any> {
    return this.http.delete(url + 'doctors/' + `${id}`);
  }

  deletePatient(id: number): Observable<any> {
    return this.http.delete(url + 'patients/' + `${id}`);
  }
}
