import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {MedHistory} from '../../../../models/medHistory';
import {DoctorService} from '../../../../services/doctor.service';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-add-history',
  templateUrl: './add-history.component.html',
  styleUrls: ['./add-history.component.css']
})
export class AddHistoryComponent implements OnInit {
  history: MedHistory = new MedHistory();
  submitted = false;

  constructor(private doctorService: DoctorService,
              private router: Router,
              private modalService: NgbModal) {
  }

  ngOnInit() {
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
}
