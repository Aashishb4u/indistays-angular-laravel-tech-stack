import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditAssetComponent } from './add-edit-asset.component';

describe('AddEditAssetComponent', () => {
  let component: AddEditAssetComponent;
  let fixture: ComponentFixture<AddEditAssetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddEditAssetComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddEditAssetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
