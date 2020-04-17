import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {MatSnackBar} from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  private url = 'http://localhost:8084/api/v1/employees';

  constructor(private http: HttpClient,
              private snackBar: MatSnackBar) {
  }

  createEmployee(employee: Object): Observable<Object> {
    return this.http.post(`${this.url}`, employee);
  }

  getEmployeesList() {
    return this.http.get(`${this.url}`);
  }

  getEmployee(id: number): Observable<any> {
    return this.http.get(`${this.url}/${id}`);
  }

  updateEmployee(id: number, value: any): Observable<Object> {
    return this.http.put(`${this.url}/${id}`, value);
  }

  deleteEmployee(id: number): Observable<any> {
    return this.http.delete(`${this.url}/${id}`, {responseType: 'text'});
  }

  openSnackBar(message, className) {
    this.snackBar.open(message, null, {
      duration: 800,
      panelClass: [className]
    });
  }
}
