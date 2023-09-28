import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditCustomPricingComponent } from './add-edit-custom-pricing.component';

describe('AddEditCustomPricingComponent', () => {
  let component: AddEditCustomPricingComponent;
  let fixture: ComponentFixture<AddEditCustomPricingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddEditCustomPricingComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddEditCustomPricingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
