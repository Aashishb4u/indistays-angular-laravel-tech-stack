import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PriceUiCardsComponent } from './price-ui-cards.component';

describe('PriceUiCardsComponent', () => {
  let component: PriceUiCardsComponent;
  let fixture: ComponentFixture<PriceUiCardsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PriceUiCardsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PriceUiCardsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
