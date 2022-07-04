import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteBacklogDialogComponent } from './delete-backlog-dialog.component';

describe('DeleteBacklogDialogComponent', () => {
  let component: DeleteBacklogDialogComponent;
  let fixture: ComponentFixture<DeleteBacklogDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeleteBacklogDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteBacklogDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
