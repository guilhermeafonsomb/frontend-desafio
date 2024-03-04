import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogTitle,
} from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { By } from '@angular/platform-browser';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { mockCategoriesResponse } from '../../core/services/categories/categories.mock';
import { CategoriesService } from '../../core/services/categories/categories.service';
import { Category } from '../../shared/models/categories.interface';
import { FormCategoriesComponent } from './form-categories.component';

const mockDialogData: { title: string; data?: Category } = {
  title: '',
  data: {
    id: '1',
    title: 'title',
  },
};

describe('FormCategoriesComponent', () => {
  let component: FormCategoriesComponent;
  let fixture: ComponentFixture<FormCategoriesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        FormCategoriesComponent,
        MatFormFieldModule,
        MatInputModule,
        MatIconModule,
        FormsModule,
        ReactiveFormsModule,
        MatDialogTitle,
        MatDialogContent,
        MatDialogActions,
        MatDialogClose,
        NoopAnimationsModule,
      ],
      providers: [
        {
          provide: MAT_DIALOG_DATA,
          useValue: mockDialogData,
        },
        {
          provide: CategoriesService,
          useValue: {
            createCategory: () => {
              mockCategoriesResponse;
            },
            updateCategory: () => {
              mockCategoriesResponse;
            },
          },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(FormCategoriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should form  be defined', () => {
    expect(component.form).toBeDefined();
  });

  it('should have title', () => {
    const title = fixture.debugElement.query(By.css("[data-test = 'title']"));
    expect(title).toBeTruthy();
  });
});
