import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MatrixChoiceRadio } from './matrix-choice-radio';

describe('MatrixChoiceRadio', () => {
  let component: MatrixChoiceRadio;
  let fixture: ComponentFixture<MatrixChoiceRadio>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MatrixChoiceRadio]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MatrixChoiceRadio);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
