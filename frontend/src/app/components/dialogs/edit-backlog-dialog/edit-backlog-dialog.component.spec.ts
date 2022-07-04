import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditBacklogDialogComponent } from './edit-backlog-dialog.component';

describe('EditBacklogDialogComponent', () => {
  let component: EditBacklogDialogComponent;
  let fixture: ComponentFixture<EditBacklogDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditBacklogDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditBacklogDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
