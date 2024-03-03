import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { AddVoteDTO } from '../../../shared/models/vote.interface';
import { NotificationService } from '../../../shared/services/notification.service';
import { SessionUpdateService } from '../../notifications/sessionUpdate/session-update.service';

@Injectable({
  providedIn: 'root',
})
export class VoteService {
  private url = `${environment.api}/vote`;

  constructor(
    private http: HttpClient,
    private notificationService: NotificationService,
    private sessionUpdateService: SessionUpdateService
  ) {}

  openVotingSession(agendaId: number) {
    return this.http.patch(`${this.url}/open/${agendaId}`, {}).pipe(
      tap(() => {
        this.notificationService.showSuccess('Votação iniciada com sucesso.'),
          this.sessionUpdateService.notifyUpdate('patch');
      })
    );
  }

  closeVotingSession(agendaId: number) {
    return this.http.patch(`${this.url}/close/${agendaId}`, {}).pipe(
      tap(() => {
        this.sessionUpdateService.notifyUpdate('patch');
      })
    );
  }

  addVote(payload: AddVoteDTO) {
    return this.http.post(`${this.url}`, payload).pipe(
      tap(() => {
        this.notificationService.showSuccess('Voto realizado com sucesso.');
        this.sessionUpdateService.notifyUpdate('create');
      })
    );
  }
}
