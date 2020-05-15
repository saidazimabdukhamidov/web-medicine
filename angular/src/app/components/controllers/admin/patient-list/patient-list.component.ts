import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {AdminService} from '../../../services/admin.service';
import {SelectionModel} from '@angular/cdk/collections';
import {Patient} from '../../../models/patient';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';
import {ActivatedRoute, Router} from '@angular/router';
import {MatTableDataSource} from '@angular/material/table';
import {MatSort} from '@angular/material/sort';
import {MatPaginator} from '@angular/material/paginator';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {FormBuilder, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-patient-list',
  templateUrl: './patient-list.component.html',
  styleUrls: ['./patient-list.component.css']
})
export class PatientListComponent implements OnInit, AfterViewInit {
  displayedColumns = ['select', 'patient_id', 'first_name', 'last_name', 'father_name',
    'address', 'birth_date', 'phone_number', 'actions'];
  patients: Patient[];
  patient: Patient;
  dataSource = new MatTableDataSource<Patient>();
  selection = new SelectionModel<Patient>(true, []);
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
    this.getPatients();
    this.editProfileForm = this.fb.group({
      patient_id: [''],
      first_name: [''],
      last_name: [''],
      father_name: [''],
      address: [''],
      birth_date: [''],
      phone_number: ['']
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

  checkboxLabel(row?: Patient): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.patient_id + 1}`;
  }

  doFilter(value: string) {
    this.dataSource.filter = value.trim().toLocaleLowerCase();
  }

  openDialog() {
    const modal = this.modal.open(ModalPatient, {
      width: '640px',
    });

    modal.afterClosed().subscribe(result => {
      this.getPatients();
    });
  }

  openModal(targetModal, patient) {
    this.modalService.open(targetModal, {
      centered: true,
      backdrop: 'static'
    });

    this.editProfileForm.patchValue({
      patient_id: patient.patient_id,
      first_name: patient.first_name,
      last_name: patient.last_name,
      father_name: patient.father_name,
      address: patient.address,
      birth_date: patient.birth_date,
      phone_number: patient.phone_number
    });
  }

  getPatients() {
    this.adminService.getPatientList().subscribe(data => {
      this.dataSource.data = data as Patient[];
    });
  }

  updatePatient() {
    this.adminService.updatePatient(this.editProfileForm.getRawValue().patient_id, this.editProfileForm.getRawValue())
      .subscribe(data => console.log(data), error => console.log(error));
    this.patient = new Patient();
    this.modalService.dismissAll();
    this.getPatients();
  }

  deletePatient(id: number) {
    this.adminService.deletePatient(id).subscribe(data => {
      this.getPatients();
    })
  }
}

@Component({
  selector: 'app-modal-add-patient',
  templateUrl: 'modal-add-patient.html',
  styleUrls: ['./patient-list.component.css']
})
export class ModalPatient {
  patients: Patient = new Patient();
  submitted = false;

  constructor(private adminService: AdminService,
              public dialog: MatDialog,
              private router: Router,
              public modal: MatDialogRef<ModalPatient>) {
  }

  save() {
    this.adminService.addPatient(this.patients)
      .subscribe(data => console.log(data));
    this.patients = new Patient();
  }

  create(value: any) {
    this.submitted = true;
    this.save();
  }

  close() {
    this.modal.close();
  }
}
