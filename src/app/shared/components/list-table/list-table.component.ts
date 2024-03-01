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
import { MatTableModule } from '@angular/material/table';
import { AgendasService } from '../../../core/services/agendas/agendas.service';
import { FormSessionComponent } from '../../../modules/form-session/form-session.component';
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
  ],
  templateUrl: './list-table.component.html',
})
export class ListTableComponent {
  displayedColumns: string[] = ['position', 'title', 'action'];

  constructor(
    public dialog: MatDialog,
    private agendasService: AgendasService
  ) {}

  @Input() data: Agenda[] | null = [];
  @Input() isFirstTab = false;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @Output() deleteClickEmitter = new EventEmitter<number>();
  @Output() updateClickEmitter = new EventEmitter<number>();

  openDeleteModal(id: number) {
    const dialogRef = this.dialog.open<ActionDialogComponent, ActionDialogData>(
      ActionDialogComponent,
      {
        data: {
          title: 'Deseja deletar a pauta?',
          content: 'Uma vez removida, essa ação não pode ser desfeita.',
          confirmText: 'Remover',
          cancelText: 'Cancelar',
        },
      }
    );

    dialogRef.afterClosed().subscribe((res) => {
      if (!res) return;
      this.deleteClickEmitter.emit(id);
    });
  }

  openUpdateModal(id: number) {
    const title = 'Editar sessão';
    this.agendasService.getAgendaById(id).subscribe((data) => {
      this.dialog.open(FormSessionComponent, {
        width: '600px',
        data: { title, data },
      });
    });
  }
}
