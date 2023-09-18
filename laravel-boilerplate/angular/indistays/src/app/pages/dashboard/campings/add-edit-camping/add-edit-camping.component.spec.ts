import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditCampingComponent } from './add-edit-camping.component';

describe('AddEditCampingComponent', () => {
  let component: AddEditCampingComponent;
  let fixture: ComponentFixture<AddEditCampingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddEditCampingComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddEditCampingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
