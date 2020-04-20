import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DoctorUpdateComponent } from './doctor-update.component';

describe('DoctorUpdateComponent', () => {
  let component: DoctorUpdateComponent;
  let fixture: ComponentFixture<DoctorUpdateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DoctorUpdateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DoctorUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
