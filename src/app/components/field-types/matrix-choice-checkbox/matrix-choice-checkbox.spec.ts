import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MatrixChoiceCheckbox } from './matrix-choice-checkbox';

describe('MatrixChoiceCheckbox', () => {
  let component: MatrixChoiceCheckbox;
  let fixture: ComponentFixture<MatrixChoiceCheckbox>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MatrixChoiceCheckbox]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MatrixChoiceCheckbox);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
