import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {DoctorService} from '../../../../services/doctor.service';
import {MedHistory} from '../../../../models/medHistory';
import {ActivatedRoute, Router} from '@angular/router';
import {MatTableDataSource} from '@angular/material/table';
import {MatSort} from '@angular/material/sort';
import {MatPaginator} from '@angular/material/paginator';
import {Location} from '@angular/common';

@Component({
  selector: 'app-history-list',
  templateUrl: './history-list.component.html',
  styleUrls: ['./history-list.component.css']
})
export class HistoryListComponent implements OnInit, AfterViewInit {
  displayedColumns = ['history', 'created_time', 'created_by'];
  history: MedHistory;
  dataSource = new MatTableDataSource<MedHistory>();
  id: number;

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private doctorService: DoctorService,
              private route: ActivatedRoute,
              private router: Router,
              private location: Location) {
  }

  ngOnInit() {
    this.getHistory();
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  getHistory() {
    this.history = new MedHistory();
    this.id = this.route.snapshot.params['id'];
    this.doctorService.getPatient(this.id)
      .subscribe(data => {
        this.dataSource.data = data as MedHistory[];
      });
  }

  doFilter(value: string) {
    this.dataSource.filter = value.trim().toLocaleLowerCase();
  }

  back() {
    this.location.back();
  }
}
