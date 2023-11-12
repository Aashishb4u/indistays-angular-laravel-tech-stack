import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TestimonialCardsComponent } from './testimonial-cards.component';

describe('TestimonialCardsComponent', () => {
  let component: TestimonialCardsComponent;
  let fixture: ComponentFixture<TestimonialCardsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TestimonialCardsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TestimonialCardsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
