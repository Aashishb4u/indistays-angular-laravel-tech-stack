import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditAccommodationComponent } from './add-edit-accommodation.component';

describe('AddEditAccommodationComponent', () => {
  let component: AddEditAccommodationComponent;
  let fixture: ComponentFixture<AddEditAccommodationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddEditAccommodationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddEditAccommodationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
