import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminManageFairComponent } from './admin-manage-fair.component';

describe('AdminManageFairComponent', () => {
  let component: AdminManageFairComponent;
  let fixture: ComponentFixture<AdminManageFairComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminManageFairComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminManageFairComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
