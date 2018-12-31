import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GuestResetPassComponent } from './guest-reset-pass.component';

describe('GuestResetPassComponent', () => {
  let component: GuestResetPassComponent;
  let fixture: ComponentFixture<GuestResetPassComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GuestResetPassComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GuestResetPassComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
