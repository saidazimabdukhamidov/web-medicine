import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {Employee} from '../employee';
import {EmployeeService} from '../services/employee.service';
import {Router} from '@angular/router';
// import {EmployeeDataSource} from '../employee-list/employee-list.component';
import {DataSource} from '@angular/cdk/collections';
import {ArchiveService} from '../services/archive.service';

@Component({
  selector: 'app-archive-list',
  templateUrl: './archive-list.component.html',
  styleUrls: ['./archive-list.component.css']
})
export class ArchiveListComponent implements OnInit {
  displayedColumns = ['First Name', 'Last Name', 'Email', 'Salary', 'Actions'];
  archives: Observable<Employee[]>;
  dataSource = new ArchiveDataSource(this.archiveService);

  constructor(private archiveService: ArchiveService,
              private router: Router) {
  }

  ngOnInit() {
    this.reloadData();
  }

  reloadData() {
    this.archives = null;
    this.archiveService.getArchivesList()
      .subscribe(data => {
        this.archives = data;
      });
  }

  deleteEmployee(id: number) {
    this.archiveService.deleteEmployee(id)
      .subscribe(
        data => {
          console.log(data);
          this.reloadData();
        },
        error => console.log(error));
  }

  openSnack(message, className) {
    this.archiveService.openSnackBar(message, className);
  }
}

export class ArchiveDataSource extends DataSource<any> {
  constructor(private archiveService: ArchiveService) {
    super();
  }

  connect(): Observable<Employee[]> {
    return this.archiveService.getArchivesList();
  }

  disconnect() {
  }
}

