import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditDestinationComponent } from './add-edit-destination.component';

describe('AddEditDestinationComponent', () => {
  let component: AddEditDestinationComponent;
  let fixture: ComponentFixture<AddEditDestinationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddEditDestinationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddEditDestinationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
