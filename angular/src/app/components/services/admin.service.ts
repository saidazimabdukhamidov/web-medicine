import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  private docUrl = 'http://localhost:8084/api/v1/doctors';
  private patUrl = 'http://localhost:8084/api/v1/patients';

  constructor(private http: HttpClient) {
  }

  addDoctor(doctor: object): Observable<object> {
    return this.http.post(`${this.docUrl}`, doctor);
  }

  addPatient(patient: object): Observable<object> {
    return this.http.post(`${this.patUrl}`, patient);
  }

  getDoctorList(): Observable<any> {
    return this.http.get(`${this.docUrl}`);
  }

  getPatientList(): Observable<any> {
    return this.http.get(`${this.patUrl}`);
  }

  getDoctor(id: number): Observable<any> {
    return this.http.get(`${this.docUrl}/${id}`);
  }

  updateDoctor(id: number, value: any): Observable<object> {
    return this.http.put(`${this.docUrl}/${id}`, value);
  }

  updatePatient(id: number, value: any): Observable<object> {
    return this.http.put(`${this.patUrl}/${id}`, value);
  }

  deleteDoctor(id: number): Observable<any> {
    return this.http.delete(`${this.docUrl}/${id}`);
  }

  deletePatient(id: number): Observable<any> {
    return this.http.delete(`${this.patUrl}/${id}`);
  }
}
