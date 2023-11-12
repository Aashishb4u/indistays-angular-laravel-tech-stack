import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListingUiCardComponent } from './listing-ui-card.component';

describe('ListingUiCardComponent', () => {
  let component: ListingUiCardComponent;
  let fixture: ComponentFixture<ListingUiCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListingUiCardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListingUiCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
