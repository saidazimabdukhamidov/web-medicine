import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {Patient} from '../../../models/patient';
import {SelectionModel} from '@angular/cdk/collections';
import {DoctorService} from '../../../services/doctor.service';
import {Router} from '@angular/router';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';
import {MedHistory} from '../../../models/medHistory';
import {MatTableDataSource} from '@angular/material/table';
import {MatSort} from '@angular/material/sort';
import {MatPaginator} from '@angular/material/paginator';

@Component({
  selector: 'app-patients',
  templateUrl: './patients.component.html',
  styleUrls: ['./patients.component.css']
})
export class PatientsComponent implements OnInit, AfterViewInit {
  closeResult = '';
  patients: Patient;
  displayedColumns = ['select', 'patient_id', 'first_name', 'last_name', 'father_name', 'address', 'birth_date', 'phone_number', 'actions'];
  dataSource = new MatTableDataSource<Patient>();
  selection = new SelectionModel<Patient>(true, []);

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private doctorService: DoctorService,
              private router: Router,
              public dialog: MatDialog,) {
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
    const dialogRef = this.dialog.open(ModalHistory, {
      width: '640px',
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  ngOnInit() {
    this.getPatients();
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  getPatients() {
    this.doctorService.getPatientList()
      .subscribe(data => {
        this.dataSource.data = data as Patient[];
      });
  }

  medHistory(id: number) {
    this.router.navigate(['history', id]);
  }
}

@Component({
  selector: 'app-modal-add-history',
  templateUrl: 'modal-add-history.html',
  styleUrls: ['./patients.component.css']
})
export class ModalHistory {
  history: MedHistory = new MedHistory();
  submitted = false;

  constructor(private doctorService: DoctorService,
              public dialog: MatDialog,
              private router: Router,
              public dialogRef: MatDialogRef<ModalHistory>) {
  }

  save() {
    this.doctorService.addMedHistory(this.history)
      .subscribe(data => console.log(data),
        error => console.log(error));
    this.history = new MedHistory();
    this.gotoList();
  }

  create(value: any) {
    this.submitted = true;
    this.save();
  }

  gotoList() {
    this.router.navigate(['/doctor']);
  }

  onNoClick() {
    this.dialogRef.close();
  }
}

