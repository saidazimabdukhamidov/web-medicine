import {Component, OnInit} from '@angular/core';
import {Employee} from '../employee';
import {Router} from '@angular/router';
import {EmployeeService} from '../services/employee.service';

@Component({
  selector: 'app-employee-create',
  templateUrl: './employee-create.component.html',
  styleUrls: ['./employee-create.component.css']
})
export class EmployeeCreateComponent implements OnInit {
  employee: Employee = new Employee();
  submitted = false;

  constructor(private employeeService: EmployeeService,
              private router: Router) {
  }

  ngOnInit() {
  }

  save() {
    this.employeeService.createEmployee(this.employee)
      .subscribe(data => console.log(data),
        error => console.log(error));
    this.employee = new Employee();
    this.gotoList();
  }

  create(value: any) {
    this.submitted = true;
    this.save();
  }

  openSnack(message, className) {
    this.employeeService.openSnackBar(message, className)
  }

  gotoList() {
    this.router.navigate(['/employees']);
  }
}
