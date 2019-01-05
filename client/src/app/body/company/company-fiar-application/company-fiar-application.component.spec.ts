import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanyFiarApplicationComponent } from './company-fiar-application.component';

describe('CompanyFiarApplicationComponent', () => {
  let component: CompanyFiarApplicationComponent;
  let fixture: ComponentFixture<CompanyFiarApplicationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CompanyFiarApplicationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CompanyFiarApplicationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
