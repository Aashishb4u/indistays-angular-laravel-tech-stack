import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StickerContentCardsComponent } from './sticker-content-cards.component';

describe('StickerContentCardsComponent', () => {
  let component: StickerContentCardsComponent;
  let fixture: ComponentFixture<StickerContentCardsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StickerContentCardsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StickerContentCardsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
