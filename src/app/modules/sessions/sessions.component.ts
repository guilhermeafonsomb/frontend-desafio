import { AsyncPipe } from '@angular/common';
import { Component } from '@angular/core';
import { Observable, of, take } from 'rxjs';
import { SessionUpdateService } from '../../core/notifications/sessionUpdate/session-update.service';
import { AgendasService } from '../../core/services/agendas/agendas.service';
import { VoteService } from '../../core/services/vote/vote.service';
import { ListTableComponent } from '../../shared/components/list-table/list-table.component';
import { TabComponent } from '../../shared/components/tab/tab.component';
import { Agenda } from '../../shared/models/agendas.interface';

@Component({
  selector: 'app-sessions',
  standalone: true,
  imports: [TabComponent, ListTableComponent, AsyncPipe],
  templateUrl: './sessions.component.html',
})
export class SessionsComponent {
  displayAgendaFalse: Observable<Agenda[]> = of([]);
  displayAgendaTrue: Observable<Agenda[]> = of([]);
  displayAgendaClose: Observable<Agenda[]> = of([]);

  constructor(
    private agendasService: AgendasService,
    private sessionUpdateService: SessionUpdateService,
    private voteService: VoteService
  ) {
    this.onTabChanged(0);

    this.sessionUpdateService.updates$.subscribe((updateType) => {
      if (updateType) {
        this.onTabChanged(0);
      }
    });
  }

  tabSelected: number = 0;

  onDeleteClick(id: number) {
    this.agendasService.deleteAgenda(id).pipe(take(1)).subscribe();
  }

  onStartSessionClick(id: number) {
    this.voteService.openVotingSession(id).pipe(take(1)).subscribe();
  }

  onTabChanged(index: number) {
    if (index === 0) {
      this.displayAgendaFalse = this.agendasService.getAllAgendas('false');
    }

    if (index === 1) {
      this.displayAgendaTrue = this.agendasService.getAllAgendas('true');
    }

    if (index === 2) {
      this.displayAgendaClose = this.agendasService.getAllAgendas('close');
    }
  }
}
