import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {AdminService} from '../../../services/admin.service';
import {Doctor} from '../../../models/doctor';
import {SelectionModel} from '@angular/cdk/collections';
import {MatTableDataSource} from '@angular/material/table';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';
import {ActivatedRoute, Router} from '@angular/router';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';

@Component({
  selector: 'app-doctor-list',
  templateUrl: './doctor-list.component.html',
  styleUrls: ['./doctor-list.component.css']
})
export class DoctorListComponent implements OnInit, AfterViewInit {
  displayedColumns = ['select', 'doctor_id', 'first_name', 'last_name', 'passport_number', 'profession', 'address', 'actions'];
  doctors: Doctor[];
  dataSource = new MatTableDataSource<Doctor>();
  selection = new SelectionModel<Doctor>(true, []);

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private adminService: AdminService,
              private modal: MatDialog,
              private router: Router) {
  }

  ngOnInit() {
    this.getDoctors();
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
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

  checkboxLabel(row?: Doctor): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.doctor_id + 1}`;
  }

  doFilter(value: string) {
    this.dataSource.filter = value.trim().toLocaleLowerCase();
  }

  openDialog() {
    const modal = this.modal.open(ModalDoctor, {
      width: '640px',
    });

    modal.afterClosed().subscribe(result => {
      this.getDoctors();
    });
  }

  getDoctors() {
    this.adminService.getDoctorList().subscribe(data => {
      this.dataSource.data = data as Doctor[];
    });
  }

  getDoctor(id: number) {
    this.adminService.getDoctor(id).subscribe(data => {
      console.log(data)
    })
  }

  deleteDoctor(id: number) {
    this.adminService.deleteDoctor(id).subscribe(data => {
      this.getDoctors();
    })
  }

  updateDoctor(id: number) {
    this.router.navigate(['doctor-update', id]);
  }
}

@Component({
  selector: 'app-modal-add-doctor',
  templateUrl: 'modal-add-doctor.html',
  styleUrls: ['./doctor-list.component.css']
})
export class ModalDoctor {
  doctors: Doctor = new Doctor();
  submitted = false;

  constructor(private adminService: AdminService,
              private modal: MatDialogRef<ModalDoctor>) {
  }

  create(value: any) {
    this.submitted = true;

    this.adminService.addDoctor(this.doctors)
      .subscribe(data => console.log(data),
        error => console.log(error));
    this.doctors = new Doctor();
  }

  onNoClick() {
    this.modal.close();
  }
}

// @Component({
//   selector: 'app-modal-update-doctor',
//   templateUrl: 'modal-update-doctor.html',
//   styleUrls: ['./doctor-list.component.css']
// })
// export class ModalUpdateDoctor implements OnInit {
//   id: number;
//   doctor: Doctor;
//   submitted = false;
//
//   constructor(private adminService: AdminService,
//               private route: ActivatedRoute,
//               private modal: MatDialogRef<ModalUpdateDoctor>) {
//   }
//
//   ngOnInit() {
//     this.doctor = new Doctor();
//     this.id = this.route.snapshot.params['id'];
//     this.adminService.getDoctor(this.id)
//       .subscribe(data => {
//         console.log(data);
//         this.doctor = data;
//       }, error => console.log(error));
//   }
//
//   updateEmployee(value: any) {
//     this.submitted = true;
//     this.adminService.updateDoctor(this.id, this.doctor)
//       .subscribe(data => console.log(data), error => console.log(error));
//     this.doctor = new Doctor();
//   }
//
//   getDoctor(id: number) {
//     this.adminService.getDoctor(id).subscribe(data => {
//       console.log(data)
//     })
//   }
//
//   onNoClick() {
//     this.modal.close();
//   }
// }
