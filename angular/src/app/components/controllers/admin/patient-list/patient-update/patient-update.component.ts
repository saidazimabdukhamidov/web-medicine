import {Component, OnInit} from '@angular/core';
import {Patient} from '../../../../models/patient';
import {AdminService} from '../../../../services/admin.service';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-patient-update',
  templateUrl: './patient-update.component.html',
  styleUrls: ['./patient-update.component.css']
})
export class PatientUpdateComponent implements OnInit {
  id: number;
  patient: Patient;
  submitted = false;

  constructor(private adminService: AdminService,
              private router: Router,
              private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.patient = new Patient();
    this.id = this.route.snapshot.params['id'];
  }

  updatePatient() {
    this.adminService.updatePatient(this.id, this.patient)
      .subscribe(data => console.log(data), error => console.log(error));
    this.patient = new Patient();
    this.getList();
  }

  onSubmit(value: any) {
    this.submitted = true;
    this.updatePatient();
  }

  getList() {
    window.location.replace('/admin');
  }

  cancel() {
    this.router.navigate(['/admin']);
  }
}
