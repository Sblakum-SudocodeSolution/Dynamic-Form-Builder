import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FieldSetting } from './field-setting';

describe('FieldSetting', () => {
  let component: FieldSetting;
  let fixture: ComponentFixture<FieldSetting>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FieldSetting]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FieldSetting);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
