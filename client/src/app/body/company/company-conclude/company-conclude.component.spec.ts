import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanyConcludeComponent } from './company-conclude.component';

describe('CompanyConcludeComponent', () => {
  let component: CompanyConcludeComponent;
  let fixture: ComponentFixture<CompanyConcludeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CompanyConcludeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CompanyConcludeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
