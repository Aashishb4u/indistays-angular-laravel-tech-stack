import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CampingDetailsComponent } from './camping-details.component';

describe('CampingDetailsComponent', () => {
  let component: CampingDetailsComponent;
  let fixture: ComponentFixture<CampingDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CampingDetailsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CampingDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
