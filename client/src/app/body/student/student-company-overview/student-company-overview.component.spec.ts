import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentCompanyOverviewComponent } from './student-company-overview.component';

describe('StudentCompanyOverviewComponent', () => {
  let component: StudentCompanyOverviewComponent;
  let fixture: ComponentFixture<StudentCompanyOverviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StudentCompanyOverviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentCompanyOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
