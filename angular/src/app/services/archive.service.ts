import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {MatSnackBar} from '@angular/material/snack-bar';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ArchiveService {
  private url = 'http://localhost:8084/api/v1/archives';

  constructor(private http: HttpClient,
              private snackBar: MatSnackBar) {
  }

  getArchivesList(): Observable<any> {
    return this.http.get(`${this.url}`);
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
