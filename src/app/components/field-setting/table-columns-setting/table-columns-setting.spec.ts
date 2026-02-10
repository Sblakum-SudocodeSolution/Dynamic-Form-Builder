import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableColumnsSetting } from './table-columns-setting';

describe('TableColumnsSetting', () => {
  let component: TableColumnsSetting;
  let fixture: ComponentFixture<TableColumnsSetting>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TableColumnsSetting]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TableColumnsSetting);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
