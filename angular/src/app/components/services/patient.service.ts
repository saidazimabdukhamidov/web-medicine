import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PatientService {
  private docUrl = 'http://localhost:8084/api/v1/doctors';
  private patUrl = 'http://localhost:8084/api/v1/patients';

  constructor(private http: HttpClient) {
  }

  addDoctor(doctor: Object): Observable<Object> {
    return this.http.post(`${this.docUrl}`, doctor);
  }

  addPatient(patient: Object): Observable<Object> {
    return this.http.post(`${this.patUrl}`, patient);
  }

  getDoctorList(): Observable<any> {
    return this.http.get(`${this.docUrl}`);
  }

  getPatientList(): Observable<any> {
    return this.http.get(`${this.patUrl}`);
  }
}
