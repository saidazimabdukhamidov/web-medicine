import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MedHistoryListComponent } from './med-history-list.component';

describe('MedHistoryListComponent', () => {
  let component: MedHistoryListComponent;
  let fixture: ComponentFixture<MedHistoryListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MedHistoryListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MedHistoryListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
