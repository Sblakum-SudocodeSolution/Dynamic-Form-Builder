import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MatrixChoiceDropdown } from './matrix-choice-dropdown';

describe('MatrixChoiceDropdown', () => {
  let component: MatrixChoiceDropdown;
  let fixture: ComponentFixture<MatrixChoiceDropdown>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MatrixChoiceDropdown]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MatrixChoiceDropdown);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
