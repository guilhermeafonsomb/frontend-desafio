import { AsyncPipe } from '@angular/common';
import { Component } from '@angular/core';
import { Observable, of, take } from 'rxjs';
import { SessionUpdateService } from '../../core/notifications/session-update.service';
import { AgendasService } from '../../core/services/agendas/agendas.service';
import { CategoriesService } from '../../core/services/categories/categories.service';
import { VoteService } from '../../core/services/vote/vote.service';
import { ListTableComponent } from '../../shared/components/list-table/list-table.component';
import { TabComponent } from '../../shared/components/tab/tab.component';
import { Agenda } from '../../shared/models/agendas.interface';
import { Category } from '../../shared/models/categories.interface';

@Component({
  selector: 'app-sessions',
  standalone: true,
  imports: [TabComponent, ListTableComponent, AsyncPipe],
  templateUrl: './sessions.component.html',
})
export class SessionsComponent {
  displayAgendaFalse$: Observable<Agenda[]> = of([]);
  displayAgendaTrue$: Observable<Agenda[]> = of([]);
  displayAgendaClose$: Observable<Agenda[]> = of([]);
  displayCategories$: Observable<Category[]> = of([]);

  constructor(
    private agendasService: AgendasService,
    private sessionUpdateService: SessionUpdateService,
    private voteService: VoteService,
    private categoryService: CategoriesService
  ) {
    this.displayCategories$ = this.categoryService.getAllCategories();

    this.onTabChanged(0);

    this.sessionUpdateService.updates$.subscribe((updateType) => {
      if (updateType) {
        this.handleTabChangeInfo();
      }
    });
  }

  tabSelected: number = 0;

  onStartSessionClick(id: string) {
    this.voteService.openVotingSession(id).pipe(take(1)).subscribe();
  }

  onTabChanged(index: number) {
    this.tabSelected = index;
    this.handleTabChangeInfo();
  }

  handleTabChangeInfo() {
    if (this.tabSelected === 0) {
      this.displayAgendaFalse$ = this.agendasService.getAllAgendas('false');
    } else if (this.tabSelected === 1) {
      this.displayAgendaTrue$ = this.agendasService.getAllAgendas('true');
    } else if (this.tabSelected === 2) {
      this.displayAgendaClose$ = this.agendasService.getAllAgendas('close');
    } else if (this.tabSelected === 3) {
      this.displayCategories$ = this.categoryService.getAllCategories();
    }
  }

  onDeleteClick(id: string) {
    if (this.tabSelected === 3) {
      this.categoryService.deleteCategory(id).pipe(take(1)).subscribe();
      return;
    }

    this.agendasService.deleteAgenda(id).pipe(take(1)).subscribe();
  }
}
