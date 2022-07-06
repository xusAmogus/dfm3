import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BacklogCreateComponent } from './backlog-create.component';

describe('BacklogCreateComponent', () => {
  let component: BacklogCreateComponent;
  let fixture: ComponentFixture<BacklogCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BacklogCreateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BacklogCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
