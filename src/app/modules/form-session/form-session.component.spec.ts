import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogModule,
  MatDialogTitle,
} from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { By } from '@angular/platform-browser';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { of } from 'rxjs';
import { mockAgendaReponse } from '../../core/services/agendas/agenda.mock';
import { AgendasService } from '../../core/services/agendas/agendas.service';
import { mockCategories } from '../../core/services/categories/categories.mock';
import { CategoriesService } from '../../core/services/categories/categories.service';
import { Agenda } from '../../shared/models/agendas.interface';
import { FormSessionComponent } from './form-session.component';

const mockDialogData: { title: string; data?: Agenda } = {
  title: '',
  data: {
    id: '1',
    title: 'title',
    duration: 0,
    approved: false,
    active: false,
    category: {
      id: 'category id',
      title: 'category title',
    },
    open: false,
    yesVotes: 0,
    noVotes: 0,
    startTime: '',
  },
};

describe('FormSessionComponent', () => {
  let component: FormSessionComponent;
  let fixture: ComponentFixture<FormSessionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        FormSessionComponent,
        MatFormFieldModule,
        MatInputModule,
        MatIconModule,
        FormsModule,
        MatSelectModule,
        ReactiveFormsModule,
        MatDialogTitle,
        MatDialogContent,
        MatDialogActions,
        MatDialogClose,
        CommonModule,
        MatDialogModule,
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
            getAllCategories: () => of(mockCategories),
          },
        },
        {
          provide: AgendasService,
          useValue: {
            updateAgenda: () => of(mockAgendaReponse),
            createAgenda: () => of(mockAgendaReponse),
          },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(FormSessionComponent);
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

  it('should display warning', () => {
    component.categories = [];
    fixture.detectChanges();

    const error = fixture.debugElement.query(By.css('.text-red-400'));

    expect(error).toBeTruthy();
  });
});
