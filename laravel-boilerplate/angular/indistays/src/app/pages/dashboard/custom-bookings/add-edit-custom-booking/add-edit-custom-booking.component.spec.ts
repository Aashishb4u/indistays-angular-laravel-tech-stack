import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditCustomBookingComponent } from './add-edit-custom-booking.component';

describe('AddEditCustomBookingComponent', () => {
  let component: AddEditCustomBookingComponent;
  let fixture: ComponentFixture<AddEditCustomBookingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddEditCustomBookingComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddEditCustomBookingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
