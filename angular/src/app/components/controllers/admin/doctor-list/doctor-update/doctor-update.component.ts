import {Component, OnInit} from '@angular/core';
import {Doctor} from '../../../../models/doctor';
import {AdminService} from '../../../../services/admin.service';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-doctor-update',
  templateUrl: './doctor-update.component.html',
  styleUrls: ['./doctor-update.component.css']
})
export class DoctorUpdateComponent implements OnInit {
  id: number;
  doctor: Doctor;
  submitted = false;

  constructor(private adminService: AdminService,
              private router: Router,
              private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.doctor = new Doctor();
    this.id = this.route.snapshot.params['id'];
  }

  updateDoctor() {
    this.adminService.updateDoctor(this.id, this.doctor)
      .subscribe(data => console.log(data), error => console.log(error));
    this.doctor = new Doctor();
    this.getList();
  }

  onSubmit(value: any) {
    this.submitted = true;
    this.updateDoctor();
  }

  getList() {
    window.location.replace('/admin');
  }

  cancel() {
    this.router.navigate(['/admin']);
  }
}
