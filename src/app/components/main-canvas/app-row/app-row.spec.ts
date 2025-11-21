import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppRow } from './app-row';

describe('AppRow', () => {
  let component: AppRow;
  let fixture: ComponentFixture<AppRow>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppRow]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AppRow);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
