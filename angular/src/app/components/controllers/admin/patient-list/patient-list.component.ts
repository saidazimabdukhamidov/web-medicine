import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {AdminService} from '../../../services/admin.service';
import {SelectionModel} from '@angular/cdk/collections';
import {Patient} from '../../../models/patient';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';
import {ActivatedRoute, Router} from '@angular/router';
import {MatTableDataSource} from '@angular/material/table';
import {MatSort} from '@angular/material/sort';
import {MatPaginator} from '@angular/material/paginator';

@Component({
  selector: 'app-patient-list',
  templateUrl: './patient-list.component.html',
  styleUrls: ['./patient-list.component.css']
})
export class PatientListComponent implements OnInit, AfterViewInit {
  displayedColumns = ['select', 'patient_id', 'first_name', 'last_name', 'father_name',
    'address', 'birth_date', 'phone_number', 'actions'];
  patients: Patient[];
  dataSource = new MatTableDataSource<Patient>();
  selection = new SelectionModel<Patient>(true, []);

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private adminService: AdminService,
              private modal: MatDialog,
              private router: Router,
              private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.getPatients();
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

  getPatients() {
    this.adminService.getPatientList().subscribe(data => {
      this.dataSource.data = data as Patient[];
    });
  }

  updatePatient(id: number) {
    this.router.navigate(['patient-update', id], {relativeTo: this.route});
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

  onNoClick() {
    this.modal.close();
  }
}
