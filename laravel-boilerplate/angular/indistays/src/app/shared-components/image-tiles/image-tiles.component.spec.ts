import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImageTilesComponent } from './image-tiles.component';

describe('ImageTilesComponent', () => {
  let component: ImageTilesComponent;
  let fixture: ComponentFixture<ImageTilesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ImageTilesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ImageTilesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
