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
import { MatTableModule } from '@angular/material/table';
import { AgendasService } from '../../../core/services/agendas/agendas.service';
import { FormSessionComponent } from '../../../modules/form-session/form-session.component';
import { FormVotationComponent } from '../../../modules/form-votation/form-votation.component';
import { Agenda } from '../../models/agendas.interface';
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
    MatIconModule,
    MatProgressBarModule,
  ],
  templateUrl: './list-table.component.html',
})
export class ListTableComponent {
  displayedColumns: string[] = ['position', 'title', 'action'];
  test = 100;
  passedTime = 0;
  initialDuration = 0;

  constructor(
    public dialog: MatDialog,
    private agendasService: AgendasService
  ) {}

  private _agendas: Agenda[] = [];

  @Input() set agendas(agendas: Agenda[] | null) {
    if (agendas) {
      this.dataSource = agendas;
      this.handleProgressBar();
    }
  }

  get agendas() {
    return this._agendas;
  }
  dataSource: Agenda[] = [];

  @Input() isFirstTab = false;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @Output() deleteClickEmitter = new EventEmitter<number>();
  @Output() startSessionClickEmitter = new EventEmitter<number>();

  @Output() updateClickEmitter = new EventEmitter<number>();

  toggleModalAction(id: number, modalType: string = 'delete') {
    if (modalType === 'delete') {
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
    }

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

    return;
  }

  handleProgressBar() {
    this.dataSource.forEach((agenda) => {
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
            this.dataSource = this.dataSource.filter(
              (item) => item.id !== agenda.id
            );
            clearInterval(interval);
          }
        }, 1000);
      }
    });
  }

  openUpdateModal(id: number) {
    const title = 'Editar sessão';
    this.agendasService.getAgendaById(id).subscribe((data) => {
      if (data.open === null) {
        this.dialog.open(FormSessionComponent, {
          width: '600px',
          data: { title, data },
        });
        return;
      }

      if (data.open) {
        this.dialog.open(FormVotationComponent, {
          width: '600px',
          data: data,
        });
        return;
      }

      if (data.open === false) {
        this.dialog.open(ActionDialogComponent, {
          data: {
            title: 'Detalhes da pauta',
            content: `A pauta teve ${data.yesVotes} votos a favor e ${
              data.noVotes
            } votos contra. E ela foi ${
              data.approved ? 'aprovada' : 'reprovada'
            }.`,
            confirmText: 'Fechar',
          },
        });
        return;
      }
    });
  }
}
