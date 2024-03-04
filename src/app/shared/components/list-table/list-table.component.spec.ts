import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { By } from '@angular/platform-browser';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { of } from 'rxjs';
import {
  mockAgendaReponse,
  mockAgendasReponse,
} from '../../../core/services/agendas/agenda.mock';
import { AgendasService } from '../../../core/services/agendas/agendas.service';
import { mockCategoriesResponse } from '../../../core/services/categories/categories.mock';
import { CategoriesService } from '../../../core/services/categories/categories.service';
import { Agenda } from '../../models/agendas.interface';
import { ActionDialogComponent } from '../action-dialog/action-dialog.component';
import { ListTableComponent } from './list-table.component';

describe('ListTableComponent', () => {
  let component: ListTableComponent;
  let fixture: ComponentFixture<ListTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        ListTableComponent,
        MatTableModule,
        MatPaginatorModule,
        CommonModule,
        MatButtonModule,
        MatMenuModule,
        MatIconModule,
        ActionDialogComponent,
        MatSelectModule,
        MatIconModule,
        MatProgressBarModule,
        NoopAnimationsModule,
      ],
      providers: [
        {
          provide: AgendasService,
          useValue: {
            getAgendaByCategory: of(mockAgendaReponse),
            getAgendaById: of(mockAgendaReponse),
          },
        },
        {
          provide: CategoriesService,
          useValue: {
            getCategoryById: of(mockCategoriesResponse),
          },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ListTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display category filter', () => {
    component.tabSelected = 2;
    fixture.detectChanges();

    const selectElement =
      fixture.debugElement.nativeElement.querySelector('mat-select');
    expect(selectElement).toBeTruthy();
  });

  it('should not display category filter', () => {
    component.tabSelected = 3;
    fixture.detectChanges();

    const selectElement =
      fixture.debugElement.nativeElement.querySelector('mat-select');
    expect(selectElement).toBeFalsy();
  });

  it('should display element data', () => {
    component.dataSource = mockAgendasReponse;
    fixture.detectChanges();

    const tableContent = fixture.debugElement.query(By.css('.truncate'));
    expect(tableContent).toBeTruthy();
  });

  it('should not display element data', () => {
    component.dataSource = [];
    fixture.detectChanges();

    const tableContent =
      fixture.debugElement.nativeElement.querySelector('mat-cell');
    expect(tableContent).toBeFalsy();
  });

  it('should display progress-bar', () => {
    component.dataSource = mockAgendasReponse;
    fixture.detectChanges();

    const progressBar = fixture.debugElement.query(
      By.css("[data-test = 'progresse-bar']")
    );
    expect(progressBar).toBeTruthy();
  });

  it('should not display progress-bar', () => {
    component.dataSource = [];
    fixture.detectChanges();

    const progressBar = fixture.debugElement.query(
      By.css("[data-test = 'progresse-bar']")
    );
    expect(progressBar).toBeFalsy();
  });

  it('should display approve and not approve', () => {
    const mockAgendas: Agenda[] = [
      {
        id: 'idAgenda',
        title: 'title agenda',
        duration: 60000,
        approved: true,
        active: false,
        category: mockCategoriesResponse,
        open: false,
        yesVotes: 1,
        noVotes: 0,
        startTime: '2024-03-04T01:31:09.234Z',
      },
      {
        id: 'idAgenda',
        title: 'title agenda',
        duration: 60000,
        approved: false,
        active: false,
        category: mockCategoriesResponse,
        open: false,
        yesVotes: 0,
        noVotes: 0,
        startTime: '2024-03-04T01:31:09.234Z',
      },
    ];
    component.dataSource = mockAgendas;
    component.tabSelected = 2;

    fixture.detectChanges();

    const approve = fixture.debugElement.query(By.css('.text-green-500'));
    const notApprove = fixture.debugElement.query(By.css('.text-red-500'));

    expect(approve).toBeTruthy();
    expect(notApprove).toBeTruthy();
  });

  it('should not display approve and not approve', () => {
    component.dataSource = [];
    component.tabSelected = 1;

    fixture.detectChanges();

    const approve = fixture.debugElement.query(By.css('.text-green-500'));
    const notApprove = fixture.debugElement.query(By.css('.text-red-500'));

    expect(approve).toBeFalsy();
    expect(notApprove).toBeFalsy();
  });

  it('should display paginator', () => {
    component.dataSource = mockAgendasReponse;
    fixture.detectChanges();

    const paginator = fixture.debugElement.query(
      By.css("[data-test = 'paginator']")
    );

    expect(paginator).toBeTruthy();
  });

  it('should not display paginator', () => {
    component.dataSource = [];
    fixture.detectChanges();

    const paginator = fixture.debugElement.query(By.css('.text-secondary '));

    expect(paginator).toBeTruthy();
  });
});
