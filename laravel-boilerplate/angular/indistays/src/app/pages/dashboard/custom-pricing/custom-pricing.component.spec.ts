import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomPricingComponent } from './custom-pricing.component';

describe('CustomPricingComponent', () => {
  let component: CustomPricingComponent;
  let fixture: ComponentFixture<CustomPricingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CustomPricingComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CustomPricingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
