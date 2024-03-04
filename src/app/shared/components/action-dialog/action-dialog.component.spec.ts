import { CommonModule } from '@angular/common';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { By } from '@angular/platform-browser';
import { ActionDialogComponent } from './action-dialog.component';
import { ActionDialogData } from './action-dialog.type';

const mockDialogData: ActionDialogData = {
  title: 'title',
  content: 'content',
  confirmText: 'confirm',
  cancelText: 'cancel',
};

describe('ActionDialogComponent', () => {
  let component: ActionDialogComponent;
  let fixture: ComponentFixture<ActionDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        ActionDialogComponent,
        CommonModule,
        MatDialogModule,
        MatButtonModule,
      ],
      providers: [
        {
          provide: MAT_DIALOG_DATA,
          useValue: mockDialogData,
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ActionDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have title', () => {
    const title = fixture.debugElement.query(By.css("[data-test = 'title']"));
    expect(title).toBeTruthy();
  });

  it('should have content', () => {
    const title = fixture.debugElement.query(By.css("[data-test = 'content']"));
    expect(title).toBeTruthy();
  });

  it('should have cancel', () => {
    const title = fixture.debugElement.query(By.css("[data-test = 'cancel']"));
    expect(title).toBeTruthy();
  });

  it('should have confirm', () => {
    const title = fixture.debugElement.query(By.css("[data-test = 'confirm']"));
    expect(title).toBeTruthy();
  });
});
