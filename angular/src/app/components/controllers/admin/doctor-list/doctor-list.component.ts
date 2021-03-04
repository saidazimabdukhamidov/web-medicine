import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { AdminService } from '../../../services/admin.service';
import { Doctor } from '../../../models/doctor';
import { SelectionModel } from '@angular/cdk/collections';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-doctor-list',
  templateUrl: './doctor-list.component.html',
  styleUrls: ['./doctor-list.component.css']
})
export class DoctorListComponent implements OnInit, AfterViewInit {
  displayedColumns = ['select', 'doctor_id', 'first_name', 'last_name', 'passport_number', 'profession', 'address', 'actions'];
  doctors: Doctor[];
  doctor: Doctor;
  dataSource = new MatTableDataSource<Doctor>();
  selection = new SelectionModel<Doctor>(true, []);
  editProfileForm: FormGroup;

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private adminService: AdminService,
              private modal: MatDialog,
              private router: Router,
              private route: ActivatedRoute,
              private modalService: NgbModal,
              private fb: FormBuilder) {
  }

  ngOnInit() {
    this.getDoctors();
    this.editProfileForm = this.fb.group({
      doctor_id: [''],
      first_name: [''],
      last_name: [''],
      passport_number: [''],
      profession: [''],
      address: ['']
    });
  }

  ngAfterViewInit() {
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

  openModal(targetModal, doctor) {
    this.modalService.open(targetModal, {
      centered: true,
      backdrop: 'static'
    });

    this.editProfileForm.patchValue({
      doctor_id: doctor.doctor_id,
      first_name: doctor.first_name,
      last_name: doctor.last_name,
      passport_number: doctor.passport_number,
      profession: doctor.profession,
      address: doctor.address
    });
  }

  updateDoctor() {
    this.adminService.updateDoctor(this.editProfileForm.getRawValue().doctor_id,
      this.editProfileForm.getRawValue()).subscribe(data => console.log(data),
      error => console.log(error));
    this.doctor = new Doctor();
    this.modalService.dismissAll();
    this.getDoctors();
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
    if (confirm('Are you sure to delete?')) {
      this.adminService.deleteDoctor(id).subscribe(data => {
        this.getDoctors();
      })
    }
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

  close() {
    this.modal.close();
  }
}
