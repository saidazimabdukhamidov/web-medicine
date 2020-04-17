import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DoctorService {
  private url = 'http://localhost:8084/api/v1/patients';
  private historyUrl = 'http://localhost:8084/api/v1/histories';

  constructor(private http: HttpClient) {
  }

  addMedHistory(history: Object): Observable<Object> {
    return this.http.post(`${this.historyUrl}`, history);
  }

  getPatientList(): Observable<any> {
    return this.http.get(`${this.url}`);
  }

  getPatient(id: number): Observable<any> {
    return this.http.get(`${this.url}/${id}`);
  }
}
