import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {EmployeeListComponent} from './employee-list/employee-list.component';
import {EmployeeCreateComponent} from './employee-create/employee-create.component';
import {EmployeeUpdateComponent} from './employee-update/employee-update.component';
import {ArchiveListComponent} from './archive-list/archive-list.component';
import {DashboardComponent} from './dashboard/dashboard.component';
import {PatientsComponent} from './components/controllers/doctor/patients/patients.component';
import {HistoryListComponent} from './components/controllers/doctor/history/history-list/history-list.component';
import {AddHistoryComponent} from './components/controllers/doctor/history/add-history/add-history.component';
import {MedHistoryListComponent} from './components/controllers/patient/med-history-list/med-history-list.component';
import {AuthComponent} from './components/controllers/auth/auth.component';
import {DoctorUpdateComponent} from './components/controllers/admin/doctor-list/doctor-update/doctor-update.component';
// import {AuthGuard} from './components/guards/auth.guard';
import {Role} from './components/models/role';
import {PatientUpdateComponent} from './components/controllers/admin/patient-list/patient-update/patient-update.component';

const routes: Routes = [
  {
    path: 'employees',
    component: EmployeeListComponent
  },
  {
    path: 'add',
    component: EmployeeCreateComponent
  },
  {
    path: 'update/:id',
    component: EmployeeUpdateComponent
  },
  {
    path: 'archives',
    component: ArchiveListComponent
  },
  {
    path: 'admin',
    component: DashboardComponent,
    children: [
      {
        path: 'doctor-update/:id',
        component: DoctorUpdateComponent
      },
      {
        path: 'patient-update/:id',
        component: PatientUpdateComponent
      }
    ]
    // canActivate: [AuthGuard],
    // data: {roles: [Role.Admin]},
  },
  {
    path: 'doctor',
    component: PatientsComponent,
    // canActivate: [AuthGuard],
    // data: {roles: [Role.Doctor]},
  },
  // {
  //   path: 'doctor-update/:id',
  //   component: DoctorUpdateComponent
  // },
  {
    path: 'history/:id',
    component: HistoryListComponent
  },
  {
    path: 'add-history',
    component: AddHistoryComponent
  },
  {
    path: 'patient',
    component: MedHistoryListComponent,
    // canActivate: [AuthGuard],
    // data: {roles: [Role.Patient]},
    children: [
      {
        path: 'history/:id',
        component: HistoryListComponent
      }
    ]
  },
  {
    path: 'auth',
    component: AuthComponent
  },
  // {
  //   path: '',
  //   component: DashboardComponent
  // },
  {
    path: 'logout',
    component: AuthComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
