import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {Observable} from 'rxjs';
import {Employee} from '../employee';
import {EmployeeService} from '../services/employee.service';
import {Router} from '@angular/router';
import {DataSource, SelectionModel} from '@angular/cdk/collections';
import {MatTableDataSource} from '@angular/material/table';
import {MatSort} from '@angular/material/sort';
import {MatPaginator} from '@angular/material/paginator';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css']
})
export class EmployeeListComponent implements OnInit, AfterViewInit {
  displayedColumns = ['select', 'employeeId', 'firstName', 'lastName', 'emailId', 'salary', 'actions'];
  employees: Employee[];
  dataSource = new MatTableDataSource<Employee>();
  selection = new SelectionModel<Employee>(true, []);

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private employeeService: EmployeeService,
              private router: Router) {
  }

  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  masterToggle() {
    this.isAllSelected() ?
      this.selection.clear() :
      this.dataSource.data.forEach(row => this.selection.select(row));
  }

  checkboxLabel(row?: Employee): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.employeeId + 1}`;
  }

  doFilter(value: string) {
    this.dataSource.filter = value.trim().toLocaleLowerCase();
  }

  ngOnInit() {
    this.getEmployees();
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  public getEmployees() {
    this.employeeService.getEmployeesList()
      .subscribe(res => {
        this.dataSource.data = res as Employee[];
      })
  }

  updateEmployee(id: number) {
    this.router.navigate(['update', id]);
  }

  deleteEmployee(id: number) {
    this.employeeService.deleteEmployee(id)
      .subscribe(
        data => {
          console.log(data);
          this.getEmployees();
        },
        error => console.log(error));
  }
}

//
// export class EmployeeDataSource extends DataSource<any> {
//   constructor(private employeeService: EmployeeService) {
//     super();
//   }
//
//   connect(): Observable<Employee[]> {
//     return this.employeeService.getEmployeesList();
//   }
//
//   disconnect() {
//   }
// }
