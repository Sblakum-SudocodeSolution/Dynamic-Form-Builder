import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LabelField } from './label-field';

describe('LabelField', () => {
  let component: LabelField;
  let fixture: ComponentFixture<LabelField>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LabelField]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LabelField);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
