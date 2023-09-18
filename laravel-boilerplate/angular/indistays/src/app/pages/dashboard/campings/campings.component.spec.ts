import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CampingsComponent } from './campings.component';

describe('CampingsComponent', () => {
  let component: CampingsComponent;
  let fixture: ComponentFixture<CampingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CampingsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CampingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
