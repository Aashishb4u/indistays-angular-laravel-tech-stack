import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomBookingsComponent } from './custom-bookings.component';

describe('CustomBookingsComponent', () => {
  let component: CustomBookingsComponent;
  let fixture: ComponentFixture<CustomBookingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CustomBookingsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CustomBookingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
