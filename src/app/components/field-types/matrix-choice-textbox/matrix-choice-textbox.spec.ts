import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MatrixChoiceTextbox } from './matrix-choice-textbox';

describe('MatrixChoiceTextbox', () => {
  let component: MatrixChoiceTextbox;
  let fixture: ComponentFixture<MatrixChoiceTextbox>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MatrixChoiceTextbox]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MatrixChoiceTextbox);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
