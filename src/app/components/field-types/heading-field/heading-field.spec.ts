import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeadingField } from './heading-field';

describe('HeadingField', () => {
  let component: HeadingField;
  let fixture: ComponentFixture<HeadingField>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HeadingField]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HeadingField);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
