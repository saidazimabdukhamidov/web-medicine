import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {EmployeeListComponent} from './employee-list/employee-list.component';
import {HttpClientModule} from '@angular/common/http';
import {EmployeeCreateComponent} from './employee-create/employee-create.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatCardModule} from '@angular/material/card';
import {EmployeeUpdateComponent} from './employee-update/employee-update.component';
import {MatListModule} from '@angular/material/list';
import {MatRippleModule} from '@angular/material/core';
import {MatTableModule} from '@angular/material/table';
import {MatIconModule} from '@angular/material/icon';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatSortModule} from '@angular/material/sort';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatMenuModule} from '@angular/material/menu';
import {LayoutModule} from '@angular/cdk/layout';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {FlexLayoutModule} from '@angular/flex-layout';
import {MatSidenavModule} from '@angular/material/sidenav';
import {ArchiveListComponent} from './archive-list/archive-list.component';
import {NavigationComponent} from './navigation/navigation.component';
import {DashboardComponent} from './dashboard/dashboard.component';
import {DoctorListComponent, ModalDoctor,} from './components/controllers/admin/doctor-list/doctor-list.component';
import {PatientListComponent, ModalPatient} from './components/controllers/admin/patient-list/patient-list.component';
import {ModalHistory, PatientsComponent} from './components/controllers/doctor/patients/patients.component';
import {HistoryListComponent} from './components/controllers/doctor/history/history-list/history-list.component';
import {AddHistoryComponent} from './components/controllers/doctor/history/add-history/add-history.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {MatTabsModule} from '@angular/material/tabs';
import {MatDialogModule} from '@angular/material/dialog';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MedHistoryListComponent} from './components/controllers/patient/med-history-list/med-history-list.component';
import {AuthComponent} from './components/controllers/auth/auth.component';
import {DoctorUpdateComponent} from './components/controllers/admin/doctor-list/doctor-update/doctor-update.component';
// import {JwtInterceptor} from './components/guards/jwt.interceptor';
// import {ErrorInterceptor} from './components/guards/error.interceptor';

@NgModule({
  declarations: [
    AppComponent,
    EmployeeListComponent,
    EmployeeCreateComponent,
    EmployeeUpdateComponent,
    ArchiveListComponent,
    NavigationComponent,
    DashboardComponent,
    PatientListComponent,
    DoctorListComponent,
    PatientsComponent,
    HistoryListComponent,
    AddHistoryComponent,
    ModalDoctor,
    ModalPatient,
    ModalHistory,
    MedHistoryListComponent,
    AuthComponent,
    DoctorUpdateComponent,
  ],
  imports: [
    MatDialogModule,
    FlexLayoutModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatCardModule,
    MatListModule,
    MatRippleModule,
    MatTableModule,
    MatIconModule,
    MatPaginatorModule,
    MatSortModule,
    MatGridListModule,
    MatMenuModule,
    LayoutModule,
    MatTooltipModule,
    MatSnackBarModule,
    MatSidenavModule,
    ReactiveFormsModule,
    NgbModule,
    MatTabsModule,
    MatCheckboxModule,
  ],
  exports: [
    MatSortModule,
  ],
  providers: [
    // provide: HTTP_INTERCEPTORS,
    // useClass: ErrorInterceptor,
    // multi: true
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
