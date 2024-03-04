import { CommonModule } from '@angular/common';
import {
  Component,
  EventEmitter,
  Input,
  Output,
  ViewChild,
} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { AgendasService } from '../../../core/services/agendas/agendas.service';
import { CategoriesService } from '../../../core/services/categories/categories.service';
import { FormCategoriesComponent } from '../../../modules/form-categories/form-categories.component';
import { FormSessionComponent } from '../../../modules/form-session/form-session.component';
import { FormVotationComponent } from '../../../modules/form-votation/form-votation.component';
import { Agenda } from '../../models/agendas.interface';
import { Category } from '../../models/categories.interface';
import { ActionDialogComponent } from '../action-dialog/action-dialog.component';
import { ActionDialogData } from '../action-dialog/action-dialog.type';

@Component({
  selector: 'app-list-table',
  standalone: true,
  imports: [
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
  ],
  templateUrl: './list-table.component.html',
})
export class ListTableComponent {
  displayedColumns: string[] = ['position', 'title', 'category', 'action'];
  dataSource: Agenda[] | Category[] = [];
  dataSourceAgendas: Agenda[] = [];
  dataSourceCategories: Category[] = [];

  @Input() isFirstTab = false;
  @Input() tabSelected = 0;

  constructor(
    public dialog: MatDialog,
    private agendasService: AgendasService,
    private categoriesService: CategoriesService
  ) {}

  private _agendas: Agenda[] = [];
  private _categories: Category[] = [];

  @Input() set categories(categories: Category[] | null) {
    if (categories) {
      this.dataSourceCategories = categories;
      this.dataSource = this.dataSourceCategories;
    }
  }

  @Input() set agendas(agendas: Agenda[] | null) {
    if (agendas) {
      this.dataSourceAgendas = agendas;
      this.dataSource = this.dataSourceAgendas;
      this.handleProgressBar();
    }
  }

  get agendas() {
    return this._agendas;
  }
  get categories() {
    return this._categories;
  }

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @Output() deleteClickEmitter = new EventEmitter<string>();
  @Output() startSessionClickEmitter = new EventEmitter<string>();

  @Output() updateClickEmitter = new EventEmitter<string>();

  filterCategory(categorySelected: Category) {
    this.agendasService
      .getAgendaByCategory(categorySelected.id)
      .subscribe((category) => {
        this.dataSource = category;
      });
  }

  toggleModalStartSession(id: string) {
    const dialogRef = this.dialog.open<ActionDialogComponent, ActionDialogData>(
      ActionDialogComponent,
      {
        data: {
          title: 'Deseja iniciar a pauta?',
          content: 'Uma vez iniciada, essa ação não pode ser desfeita.',
          confirmText: 'Iniciar',
          cancelText: 'Cancelar',
        },
      }
    );

    dialogRef.afterClosed().subscribe((res) => {
      if (!res) return;
      this.startSessionClickEmitter.emit(id);
    });
  }

  toggleModalDelete(id: string, modalType: number = 0) {
    if (modalType === 0) {
      const dialogRef = this.dialog.open<
        ActionDialogComponent,
        ActionDialogData
      >(ActionDialogComponent, {
        data: {
          title: 'Deseja deletar a pauta?',
          content: 'Uma vez removida, essa ação não pode ser desfeita.',
          confirmText: 'Remover',
          cancelText: 'Cancelar',
        },
      });

      dialogRef.afterClosed().subscribe((res) => {
        if (!res) return;
        this.deleteClickEmitter.emit(id);
      });

      return;
    } else if (modalType === 3) {
      const dialogRef = this.dialog.open<
        ActionDialogComponent,
        ActionDialogData
      >(ActionDialogComponent, {
        data: {
          title: 'Deseja deletar a categoria?',
          content: 'Uma vez removida, essa ação não pode ser desfeita.',
          confirmText: 'Remover',
          cancelText: 'Cancelar',
        },
      });

      dialogRef.afterClosed().subscribe((res) => {
        if (!res) return;
        this.deleteClickEmitter.emit(id);
      });

      return;
    }
  }

  handleProgressBar() {
    this.dataSourceAgendas.forEach((agenda) => {
      if (agenda.open) {
        const passedTime =
          new Date().getTime() - new Date(agenda.startTime).getTime();

        const restDuration = agenda.duration - passedTime;

        const percentage = (1000 / agenda.duration) * 100;

        agenda.duration = (restDuration / agenda.duration) * 100;

        const interval = setInterval(() => {
          if (agenda.duration > 0) {
            agenda.duration -= percentage;
          } else {
            this.dataSource = this.dataSourceAgendas.filter(
              (item) => item.id !== agenda.id
            );

            clearInterval(interval);
          }
        }, 1000);
      }
    });
  }

  openUpdateModal(id: string, modalType: number = 0) {
    const title = modalType === 0 ? 'Editar sessão' : 'Editar categoria';

    this.agendasService.getAgendaById(id).subscribe((data) => {
      if (modalType === 0) {
        if (data.open === null) {
          this.dialog.open(FormSessionComponent, {
            width: '600px',
            data: { title, data },
          });
          return;
        }
      } else if (modalType === 1) {
        this.dialog.open(FormVotationComponent, {
          width: '600px',
          data: data,
        });
        return;
      } else if (modalType === 2) {
        this.dialog.open(ActionDialogComponent, {
          data: {
            title: 'Detalhes da pauta',
            content: `<p>Teve um total de ${
              data.yesVotes + data.noVotes
            } voto(s).</p> 
            A pauta teve ${data.yesVotes} voto(s) a favor e ${
              data.noVotes
            } voto(s) contra. E ela foi <b>${
              data.approved ? 'aprovada' : 'reprovada'
            }</b>.`,
            confirmText: 'Fechar',
          },
        });
        return;
      }
    });

    if (modalType === 3) {
      this.categoriesService.getCategoryById(id).subscribe((data) => {
        this.dialog.open(FormCategoriesComponent, {
          width: '600px',
          data: { title, data },
        });
      });
    }
  }
}
