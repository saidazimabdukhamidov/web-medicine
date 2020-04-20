import {Component, OnInit} from '@angular/core';
import {MedHistory} from '../../../models/medHistory';
import {DoctorService} from '../../../services/doctor.service';
import {ActivatedRoute, Router} from '@angular/router';
import {MatTableDataSource} from '@angular/material/table';

@Component({
  selector: 'app-med-history-list',
  templateUrl: './med-history-list.component.html',
  styleUrls: ['./med-history-list.component.css']
})
export class MedHistoryListComponent implements OnInit {
  displayedColumns = ['history', 'created_time', 'created_by'];
  history: MedHistory;
  dataSource = new MatTableDataSource<MedHistory>();
  id: number;

  constructor(private patientService: DoctorService,
              private route: ActivatedRoute,
              private router: Router) {
  }

  ngOnInit() {
    this.getHistory();
  }

  find(id: number) {
    this.router.navigate(['history', id], {relativeTo: this.route});
  }

  getHistory() {
    this.history = new MedHistory();
  }
}
