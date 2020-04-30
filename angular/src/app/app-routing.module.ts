import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {DashboardComponent} from './components/controllers/admin-dashboard/dashboard.component';
import {PatientsComponent} from './components/controllers/doctor/patients/patients.component';
import {HistoryListComponent} from './components/controllers/doctor/history/history-list/history-list.component';
import {MedHistoryListComponent} from './components/controllers/patient/med-history-list/med-history-list.component';

const routes: Routes = [
  {
    path: 'admin',
    component: DashboardComponent
  },
  {
    path: 'doctor',
    component: PatientsComponent
  },
  {
    path: 'history/:id',
    component: HistoryListComponent
  },
  {
    path: 'patient',
    component: MedHistoryListComponent,
    children: [
      {
        path: 'history/:id',
        component: HistoryListComponent
      }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
