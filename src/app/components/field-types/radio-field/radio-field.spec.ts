import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RadioField } from './radio-field';

describe('RadioField', () => {
  let component: RadioField;
  let fixture: ComponentFixture<RadioField>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RadioField]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RadioField);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
