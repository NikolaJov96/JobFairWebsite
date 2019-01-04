import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanyNewConcourseComponent } from './company-new-concourse.component';

describe('CompanyNewConcourseComponent', () => {
  let component: CompanyNewConcourseComponent;
  let fixture: ComponentFixture<CompanyNewConcourseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CompanyNewConcourseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CompanyNewConcourseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
