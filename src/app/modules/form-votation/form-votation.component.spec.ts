import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogTitle,
} from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { By } from '@angular/platform-browser';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { mockCategoriesResponse } from '../../core/services/categories/categories.mock';
import { mockAddVoteDTO } from '../../core/services/vote/vote.mock';
import { VoteService } from '../../core/services/vote/vote.service';
import { Agenda } from '../../shared/models/agendas.interface';
import { FormVotationComponent } from './form-votation.component';

const mockDialogData: Agenda = {
  id: 'agenda id',
  title: 'title',
  duration: 0,
  approved: false,
  active: false,
  category: mockCategoriesResponse,
  open: null,
  yesVotes: 0,
  noVotes: 0,
  startTime: '',
};
describe('FormVotationComponent', () => {
  let component: FormVotationComponent;
  let fixture: ComponentFixture<FormVotationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        FormVotationComponent,
        MatInputModule,
        MatIconModule,
        FormsModule,
        ReactiveFormsModule,
        MatDialogTitle,
        MatDialogContent,
        MatDialogActions,
        MatDialogClose,
        MatIconModule,
        MatRadioModule,
        NoopAnimationsModule,
      ],
      providers: [
        {
          provide: MAT_DIALOG_DATA,
          useValue: mockDialogData,
        },
        {
          provide: VoteService,
          useValue: {
            addVote: () => {
              mockAddVoteDTO;
            },
          },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(FormVotationComponent);
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

  it('should have yesVotes', () => {
    const yesVotes = fixture.debugElement.query(
      By.css("[data-test = 'yesVotes']")
    );
    expect(yesVotes).toBeTruthy();
  });

  it('should have noVotes', () => {
    const noVotes = fixture.debugElement.query(
      By.css("[data-test = 'noVotes']")
    );
    expect(noVotes).toBeTruthy();
  });
});
