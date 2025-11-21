import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MonthYear } from './month-year';

describe('MonthYear', () => {
  let component: MonthYear;
  let fixture: ComponentFixture<MonthYear>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MonthYear]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MonthYear);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
