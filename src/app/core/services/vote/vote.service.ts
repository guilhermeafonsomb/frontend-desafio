import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { AddVoteDTO } from '../../../shared/models/vote.interface';
import { NotificationService } from '../../../shared/services/notification.service';
import { DataUpdateService } from '../../notifications/data-update.service';

@Injectable({
  providedIn: 'root',
})
export class VoteService {
  private url = `${environment.api}/vote`;

  constructor(
    private http: HttpClient,
    private notificationService: NotificationService,
    private dataUpdateService: DataUpdateService
  ) {}

  openVotingSession(agendaId: string) {
    return this.http.patch(`${this.url}/open/${agendaId}`, {}).pipe(
      tap(() => {
        this.notificationService.showSuccess('Votação iniciada com sucesso.'),
          this.dataUpdateService.notifyData('patch');
      })
    );
  }

  closeVotingSession(agendaId: string) {
    return this.http.patch(`${this.url}/close/${agendaId}`, {}).pipe(
      tap(() => {
        this.dataUpdateService.notifyData('patch');
      })
    );
  }

  addVote(payload: AddVoteDTO) {
    return this.http.post(`${this.url}`, payload).pipe(
      tap(() => {
        this.notificationService.showSuccess('Voto realizado com sucesso.');
        this.dataUpdateService.notifyData('create');
      })
    );
  }
}
