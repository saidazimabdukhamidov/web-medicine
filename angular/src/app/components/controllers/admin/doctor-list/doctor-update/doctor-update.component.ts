import {Component, OnInit} from '@angular/core';
import {Doctor} from '../../../../models/doctor';
import {AdminService} from '../../../../services/admin.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Location} from '@angular/common';

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
              private route: ActivatedRoute,
              private location: Location) {
  }

  ngOnInit() {
    this.doctor = new Doctor();
    this.id = this.route.snapshot.params['id'];
    this.getDoctor(this.id);
  }

  getDoctor(id: number) {
    this.adminService.getDoctor(id).subscribe(data => {
      console.log(data)
    })
  }

  updateDoctor() {
    this.adminService.updateDoctor(this.id, this.doctor)
      .subscribe(data => console.log(data), error => console.log(error));
    this.doctor = new Doctor();
    // this.cancel();
  }

  onSubmit(value: any) {
    this.submitted = true;
    this.updateDoctor();
    // this.cancel();
  }

  // getList() {
  //   window.location.replace('/admin');
  // }


  cancel() {
    this.router.navigate(['/admin']);
  }
}
