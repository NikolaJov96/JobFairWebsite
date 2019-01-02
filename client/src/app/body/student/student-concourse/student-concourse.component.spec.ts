import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentConcourseComponent } from './student-concourse.component';

describe('StudentConcourseComponent', () => {
  let component: StudentConcourseComponent;
  let fixture: ComponentFixture<StudentConcourseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StudentConcourseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentConcourseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
